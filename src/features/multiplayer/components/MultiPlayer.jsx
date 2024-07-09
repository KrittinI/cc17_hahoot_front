/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Loading from "../../../components/Loading";
// import ClientAnswerResult from "./ClientAnswerResult";
import ScoreboardMultiplayer from "./ScoreboardMultiplayer";
import useAuth from "../../../hooks/useAuth";
import useQuestion from "../../../hooks/useQuestion";
import JoinRoomForm from "./JoinRoomForm";
import WaitingRoom from "./WaitingRoom";
import PlayerChoice from "./PlayerChoice";
import ShowResultBox from "./ShowResultBox";
import ShowQuestion from "./ShowQuestion";
import useEvent from "../../../hooks/useEvent";
import Button from "../../../components/Button";

const MultiPlayer = () => {
  const { authUser } = useAuth();
  const { playQuestion } = useQuestion();
  const { eventId } = useEvent();
  const [roomId, setRoomId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientAnswerResult, setClientAnswerResult] = useState(null);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [socket, setSocket] = useState(null);
  const [newRoomId, setNewRoomId] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  const [roomAnswerCount, setRoomAnswerCount] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });
  useEffect(() => {
    resetState();
  }, []);

  useEffect(() => {
    // เชื่อมต่อกับ Socket.IO โดยใช้ hostname ของเครื่องที่รัน Vite server
    const socketIo = io(`http://${window.location.hostname}:8008`, {
      pingInterval: 10000, // ส่ง ping ทุกๆ 10 วินาที
      pingTimeout: 5000, // รอการตอบสนองจาก ping 5 วินาที
    });
    //socket = io("http://localhost:4000");
    // const newSocket = io('http://localhost:4000'); // หรือ URL ของเซิร์ฟเวอร์จริง
    setSocket(socketIo);
    if (authUser && playQuestion.length) {
      socketIo.emit("createRoom", {
        name: authUser?.username,
        questions: playQuestion,
        eventId,
      });
    }
    // count room answer
    socketIo.on("RoomAnswerCount", (counts) => {
      //set something in state
      setRoomAnswerCount(counts);
      console.log("RoomAnswerCounter is working");
    });

    socketIo.on("answerCount", (count) => {
      console.log("answerCount =>", count);
      setAnswerCount(count);
    });

    socketIo.on("gameOver", () => {
      setIsGameOver(true);
    });

    socketIo.on("isOwner", () => setIsOwner(true));

    socketIo.on("roomCreated", (roomId) => {
      setRoomId(roomId);
      setNewRoomId(roomId);
      setHasJoined(true);
    });

    socketIo.on("updatePlayers", (playersList) => {
      setPlayers(playersList);
      alert(playersList);
      //alert("updatePlayers=>", playersList);
      //alert("updatePlayers Event is Working");
    });

    socketIo.on("gameStarted", () => {
      setIsStarted(true);
      //setTotalTimeLeft(players.length * 20);
    });

    socketIo.on("newQuestion", (questionData) => {
      //setCurrentQuestion(null);
      setShowAnswer(false);
      console.log(questionData);
      setShowScoreboard(false);
      setClientAnswerResult(null);
      setCurrentQuestion(questionData);
      setTimeLeft(questionData.timeLimit);
      console.log("newQuestion has received =>", questionData);
      //alert("newQuestion has received");
    });

    socketIo.on("showAnswer", () => {
      //setShowAnswer เป็นstateที่เซ็ทเมื่อผู้เล่นทุกคนกดคำตอบทุกคนแล้วจะโชว์คำตอบที่จอ Owner
      setLoading(false);
      setShowAnswer(true);
    });

    socketIo.on("answerResult", ({ correct, scoreBackend }) => {
      setScore(scoreBackend);
      //setScore((prevScore) => prevScore);
      setClientAnswerResult(correct);
    });
    socketIo.on("gameOver", () => {
      setCurrentQuestion("over");
    });
    socketIo.on("roomNotFound", () => {
      alert("Room ID not found");
    });
    socketIo.on("joinedRoom", () => {
      setHasJoined(true);
    });

    socketIo.on("ownerDisconnected", () => {
      //alert("The owner has disconnected. The game will restart.");
      window.location.reload(true);
      //resetState();
    });

    socketIo.on("updateScores", (players) => {
      setPlayerInfo(players);
    });

    socketIo.on("nextQuestion", () => {
      setNextQuestion(true); //Dummy state
    });

    socketIo.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });

    socketIo.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    return () => {
      socketIo.off("isOwner");
      socketIo.off("roomCreated");
      socketIo.off("updatePlayers");
      socketIo.off("gameStarted");
      socketIo.off("newQuestion");
      socketIo.off("show");
      socketIo.off("showAnswer");
      socketIo.off("gameOver");
      socketIo.off("roomNotFound");
      socketIo.off("joinedRoom");
      socketIo.off("ownerDisconnected");
      socketIo.off("updateScores");
      socketIo.off("nextQuestion");
      socketIo.off("ShowScoreboard");
      socketIo.off("answerCount");
      socketIo.off("RoomAnswerCount");
      socketIo.off("connect_error");
      socketIo.off("reconnect_attempt");
      // เอามาไว้ disconnect ออก หากกด ออก
      //socketIo.off("disconnect");
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      if (timeLeft && timeLeft > 0 && !showAnswer) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [timeLeft, showAnswer, isStarted]);

  useEffect(() => {
    if (timeLeft === 0) {
      socket.emit("submitAnswer", {
        roomId,
        answer: null,
        timeLeft: 0,
        isTimeout: true,
      });
    }
  }, [timeLeft]);

  const resetState = () => {
    setRoomId("");
    setIsOwner(false);
    setIsStarted(false);
    setPlayers([]);
    setCurrentQuestion(null);
    setShowAnswer(false);
    setScore(0);
    setTimeLeft(null);
    setTotalTimeLeft(0);
    setHasJoined(false);
    setLoading(false);
    setClientAnswerResult(null);
    setShowScoreboard(false);
    setNextQuestion(false);
    setSocket(null);
    setNewRoomId("");
    setIsGameOver(false);
    setAnswerCount(0);
    setRoomAnswerCount({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    });
  };

  const handleAnswerClick = (option) => {
    // แสดงหน้า Loading ตอนที่ player กดคำตอบ
    console.log(option, timeLeft);
    socket.emit("submitAnswer", {
      roomId,
      answer: option,
      timeLeft,
      isTimeout: false,
    });
    setLoading(true);
  };

  const handleShowScoreboard = () => {
    setShowAnswer(false);
    setCurrentQuestion(null);
    //setSelectedAnswer(null); it not works
    setTimeLeft(null);
    //check to send roomId to Event->ShowScoreboard
    socket.emit("ShowScoreboard", roomId);
    setShowScoreboard(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-full gap-12 transition-all duration-300 ease-in-out transform">
        {loading ? (
          <Loading />
        ) : !hasJoined ? (
          // Form to Join Game Room
          <JoinRoomForm roomId={roomId} setRoomId={setRoomId} socket={socket} />
        ) : !isStarted ? (
          // Waiting Room to Start
          <WaitingRoom
            socket={socket}
            players={players}
            roomId={roomId}
            isOwner={isOwner}
          />
        ) : isOwner && showScoreboard ? (
          <ScoreboardMultiplayer
            players={playerInfo}
            socket={socket}
            newRoomId={newRoomId}
            isGameOver={isGameOver}
          />
        ) : isOwner && currentQuestion ? (
          <ShowQuestion
            currentQuestion={currentQuestion}
            showAnswer={showAnswer}
            roomAnswerCount={roomAnswerCount}
            onClick={handleShowScoreboard}
            timeLeft={timeLeft}
            answerCount={answerCount}
          />
        ) : isGameOver ? (
          <div className="flex flex-col items-center justify-center h-auto bg-gray-500 text-white rounded-lg">
            <div className="bg-gray-900 p-8 rounded-lg shadow-md text-center">
              <h1 className="text-4xl font-bold mb-4">The Game is Over</h1>
              <p className="text-2xl mb-4">Your Score: {score}</p>
              <div className="flex flex-col items-center justify-center gap-6">
                <Button bg="red" width="60">
                  Send to your E-mail
                </Button>
                <Button
                  bg="blue"
                  width="60"
                  onClick={() => window.location.reload(true)}
                >
                  Play again
                </Button>
              </div>
            </div>
          </div>
        ) : clientAnswerResult !== null ? (
          <ShowResultBox clientAnswerResult={clientAnswerResult} />
        ) : !isOwner && currentQuestion ? (
          // role === Player
          <PlayerChoice
            choice={[
              currentQuestion.choice1,
              currentQuestion.choice2,
              currentQuestion.choice3,
              currentQuestion.choice4,
            ]}
            handleAnswerClick={handleAnswerClick}
          />
        ) : (
          <div className="text-4xl">Oops! something wrong!</div>
        )}
      </div>
    </div>
  );
};

export default MultiPlayer;
