/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Loading from "../../../components/Loading";
//import ClientAnswerResult from "./ClientAnswerResult";
import ScoreboardMultiplayer from "./ScoreboardMultiplayer";
import useAuth from "../../../hooks/useAuth";
import useQuestion from "../../../hooks/useQuestion";
import JoinRoomForm from "./JoinRoomForm";
import WaitingRoom from "./WaitingRoom";
import PlayerChoice from "./PlayerChoice";
import ShowResultBox from "./ShowResultBox";
import ShowQuestion from "./ShowQuestion";
import useEvent from "../../../hooks/useEvent";
import PlayerGameOver from "./PlayerGameOver";
import playApi from "../../../api/play";
import { useSearchParams } from "react-router-dom";

const MultiPlayer = () => {
  const { authUser } = useAuth();
  const { playQuestion } = useQuestion();
  const { eventId } = useEvent();
  const [searchParams, setSearchParams] = useSearchParams();
  const pincode = searchParams.get('pincode')


  //WTF 20 States
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientAnswerResult, setClientAnswerResult] = useState(null);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newRoomId, setNewRoomId] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  const [changeBG, setChangeBG] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [roomAnswerCount, setRoomAnswerCount] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  useEffect(() => {
    resetState();
    if (pincode) {
      setRoomId(pincode)
    }
  }, []);

  let socketIo;

  useEffect(() => {
    // เชื่อมต่อกับ Socket.IO โดยใช้ hostname ของเครื่องที่รัน Vite server
    socketIo = io(`http://${window.location.hostname}:8008`, {
      pingInterval: 10000, // ส่ง ping ทุกๆ 10 วินาที
      pingTimeout: 5000, // รอการตอบสนองจาก ping 5 วินาที
    });

    socketIo.on("connection", (id) => {
      setPlayerId(id);
    });

    //socket = io("http://localhost:4000");
    // const newSocket = io('http://localhost:4000'); // หรือ URL ของเซิร์ฟเวอร์จริง
    setSocket(socketIo);
    if (authUser && playQuestion?.length) {
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
    });

    socketIo.on("answerCount", (count) => {
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
      // alert(playersList);
      //alert("updatePlayers=>", playersList);
      //alert("updatePlayers Event is Working");
    });

    socketIo.on("gameStarted", () => {
      setIsStarted(true);
      //setTotalTimeLeft(players.length * 20);
    });

    socketIo.on("newQuestion", (questionData) => {
      setHasAnswer(false);
      //setCurrentQuestion(null);
      setShowAnswer(false);
      setChangeBG(false);
      setShowScoreboard(false);
      setClientAnswerResult(null);
      setCurrentQuestion(questionData);
      setTimeLeft(questionData.timeLimit);
      //alert("newQuestion has received");
    });

    socketIo.on("showAnswer", () => {
      //setShowAnswer เป็นstateที่เซ็ทเมื่อผู้เล่นทุกคนกดคำตอบทุกคนแล้วจะโชว์คำตอบที่จอ Owner
      setLoading(false);
      setShowAnswer(true);
      setChangeBG(true);
    });
    //playerId: player.id,

    socketIo.on(
      "answerResult",
      ({ playerIdBackend, correct, scoreBackend }) => {

        setScore(scoreBackend);
        //setScore((prevScore) => prevScore);
        setClientAnswerResult(correct);
        //console.log("Condition check playerId passed");
        console.log("Condition answerResult check passed");
      }
    );
    socketIo.on("gameOver", () => {
      setCurrentQuestion("over");
    });
    socketIo.on("roomNotFound", () => {
      alert("Room ID not found");
    });
    socketIo.on("joinedRoom", ({ id }) => {
      setPlayerId(id);
      setHasJoined(true);
    });

    socketIo.on("ownerDisconnected", () => {
      //alert("The owner has disconnected. The game will restart.");
      window.location.reload(true);
      //resetState();
    });

    socketIo.on("updateScores", (updatedPlayers) => {
      setPlayerInfo(updatedPlayers);
    });

    socketIo.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });

    socketIo.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    return () => {
      //17 sockets bro..
      socketIo.off("isOwner");
      socketIo.off("roomCreated");
      socketIo.off("updatePlayers");
      socketIo.off("gameStarted");
      socketIo.off("newQuestion");
      socketIo.off("showAnswer");
      socketIo.off("gameOver");
      socketIo.off("roomNotFound");
      socketIo.off("joinedRoom");
      socketIo.off("ownerDisconnected");
      socketIo.off("updateScores");
      socketIo.off("ShowScoreboard");
      socketIo.off("answerCount");
      socketIo.off("RoomAnswerCount");
      socketIo.off("connect_error");
      socketIo.off("reconnect_attempt");
      socketIo.off("connection");
      // เอามาไว้ disconnect ออก หากกด ออก
      //socketIo.off("disconnect");
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      if (timeLeft && timeLeft > 0 && showAnswer === false) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        console.log("hasAns=", hasAnswer);
        if (!hasAnswer && !isOwner) {
          socket.emit("submitAnswer", {
            roomId,
            answer: null,
            timeLeft: 0,
            isTimeout: true,
            playerId,
            questionId: currentQuestion.id,
          });
        }
        console.log("submitTimeout=> Passed!");
      }
    }
  }, [timeLeft]);

  const resetState = () => {
    setName("");
    setRoomId("");
    setIsOwner(false);
    setIsStarted(false);
    setPlayers([]);
    setPlayerId("");
    setCurrentQuestion(null);
    setShowAnswer(false);
    setScore(0);
    setTimeLeft(null);
    setHasJoined(false);
    setLoading(false);
    setClientAnswerResult(null);
    setShowScoreboard(false);
    setPlayerInfo([]);
    setSocket(null);
    setNewRoomId("");
    setIsGameOver(false);
    setAnswerCount(0);
    setChangeBG(false);
    setHasAnswer(false);
    setRoomAnswerCount({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    });
  };

  const handleAnswerClick = (option) => {
    // แสดงหน้า Loading ตอนที่ player กดคำตอบ
    setHasAnswer((prev) => !prev);
    if (playerId === socket.id) {
      socket.emit("submitAnswer", {
        roomId,
        answer: option,
        timeLeft,
        playerId,
        questionId: currentQuestion.id,
      });
    }
    setLoading(true);
  };

  const handleShowScoreboard = () => {
    setShowAnswer(false);
    setChangeBG(false);
    setCurrentQuestion(null);
    //setSelectedAnswer(null); it not works
    setTimeLeft(null);
    //check to send roomId to Event->ShowScoreboard
    socket.emit("ShowScoreboard", roomId);
    setShowScoreboard(true);
  };

  const handleSendMail = async (email) => {
    playerInfo.shift();
    await playApi.sendmailMultiplayer({
      email: email,
      data: playerInfo,
    });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${changeBG ? "bg-black opacity-90" : ""
        }`}
    >
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-full gap-12 transition-all duration-300 ease-in-out transform">
        {loading ? (
          <Loading />
        ) : !hasJoined ? (
          // Form to Join Game Room
          <JoinRoomForm
            roomId={roomId}
            setRoomId={setRoomId}
            socket={socket}
            name={name}
            setName={setName}
          />
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
            playerId={playerId}
            handleSendMail={handleSendMail}
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
          <PlayerGameOver score={score} handleSendMail={handleSendMail} />
        ) : clientAnswerResult !== null ? (
          <ShowResultBox clientAnswerResult={clientAnswerResult} />
        ) : !isOwner && currentQuestion ? (
          // role === Player
          <PlayerChoice
            choice3={currentQuestion?.choice3}
            choice4={currentQuestion?.choice4}
            handleAnswerClick={handleAnswerClick}
          />
        ) : (
          <div className="text-4xl">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default MultiPlayer;
