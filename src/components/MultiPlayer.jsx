/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Loading from "./Loading";
// import ClientAnswerResult from "./ClientAnswerResult";
import ScoreboardMultiplayer from "./ScoreboardMultiplayer";
import {
  Square,
  Circle,
  Dimond,
  Triangle,
  CheckTrue,
  CheckFalse,
} from "../icons/kahoot";

//const socket = io("http://localhost:4000");
let socket;

const iconsDefault = [<Triangle />, <Dimond />, <Circle />, <Square />];
const iconsCustom = [
  <Triangle size="24vmin" />,
  <Dimond size="24vmin" />,
  <Circle size="24vmin" />,
  <Square size="24vmin" />,
];
const buttonColors = [
  "bg-darkred",
  "bg-darkblue",
  "bg-darkyellow",
  "bg-darkgreen",
];
const hoverColors = [
  "hover:bg-darkredDarker",
  "hover:bg-darkblueDarker",
  "hover:bg-darkyellowDarker",
  "hover:bg-darkgreenDarker",
];

const MultiPlayer = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
  const [newSocket, setNewSocket] = useState(null);
  const [newRoomId, setNewRoomId] = useState("");

  useEffect(() => {
    //Reset state when component mounts or reload page
    resetState();
  }, []);

  useEffect(() => {
    socket = io("http://localhost:4000");
    // const newSocket = io('http://localhost:4000'); // หรือ URL ของเซิร์ฟเวอร์จริง
    setNewSocket(socket);

    socket.on("isOwner", () => setIsOwner(true));
    socket.on("roomCreated", (roomId) => {
      setRoomId(roomId);
      setNewRoomId(roomId);
      setHasJoined(true);
    });
    socket.on("updatePlayers", (players) => setPlayers(players));
    socket.on("gameStarted", () => {
      setIsStarted(true);
      //setTotalTimeLeft(players.length * 20);
    });
    socket.on("newQuestion", (questionData) => {
      //setCurrentQuestion(null);
      setShowScoreboard(false);
      setCurrentQuestion(questionData);
      setTimeLeft(20);
      setClientAnswerResult(null);

      console.log("newQuestion has received =>", questionData);
      alert("newQuestion has received");
    });

    socket.on("showAnswer", () => {
      //setShowAnswer เป็นstateที่เซ็ทเมื่อผู้เล่นทุกคนกดคำตอบทุกคนแล้วจะโชว์คำตอบที่จอ Owner
      setShowAnswer(true);
      setLoading(false);
    });
    socket.on("answerResult", ({ correct, score }) => {
      //setShowAnswer(true);
      //alert("answerResult received");
      //alert(correct);
      //setScore(score); //100 from server
      if (correct) setScore((prevScore) => prevScore + 1);

      setLoading(true);
      setClientAnswerResult(correct);
      // setLoading(false);

      //handleCheck();
      // setTimeout(() => {
      //   setShowAnswer(false);
      //   setSelectedAnswer(null);
      // }, 3000);
    });
    socket.on("gameOver", () => {
      setCurrentQuestion(null);
    });
    socket.on("roomNotFound", () => {
      alert("Room ID not found");
    });
    socket.on("joinedRoom", () => {
      setHasJoined(true);
    });

    socket.on("ownerDisconnected", () => {
      //alert("The owner has disconnected. The game will restart.");
      window.location.reload();
      //resetState();
    });

    socket.on("updateScores", (players) => {
      setPlayerInfo(players);
    });

    socket.on("nextQuestion", () => {
      setNextQuestion(true);
    });

    return () => {
      socket.off("isOwner");
      socket.off("roomCreated");
      socket.off("updatePlayers");
      socket.off("gameStarted");
      socket.off("newQuestion");
      socket.off("show");
      socket.off("showAnswer");
      socket.off("gameOver");
      socket.off("roomNotFound");
      socket.off("joinedRoom");
      socket.off("ownerDisconnected");
      socket.off("updateScores");
      socket.off("nextQuestion");
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      if (timeLeft > 0 && !showAnswer) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setShowAnswer(true);
        //set Client ans -> (false)
        setClientAnswerResult(false);
      }
    }
  }, [timeLeft, showAnswer, isStarted]);

  const resetState = () => {
    setName("");
    setRoomId("");
    setIsOwner(false);
    setIsStarted(false);
    setPlayers([]);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setTimeLeft(null);
    setTotalTimeLeft(0);
    setHasJoined(false);
    setLoading(false);
    setClientAnswerResult(null);
    setShowScoreboard(false);
    setNextQuestion(false);
    setNextQuestion(false);
    setNewSocket(null);
    setNewRoomId("");

    //alert("Reset State");
  };

  const handleCreateRoom = () => {
    if (name.trim()) {
      socket.emit("createRoom", name);
    }
  };

  const handleJoinRoom = (event) => {
    event.preventDefault();
    if (name.trim() && roomId.trim()) {
      socket.emit("joinRoom", { roomId, name });
    }
  };

  const handleStartGame = () => {
    socket.emit("startGame", roomId);
  };

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    //setShowAnswer(false);
    // แสดงหน้า Loading
    setLoading(true);

    socket.emit("submitAnswer", { roomId, answer: option });
    console.log("submitAnswer is Working in Frontend");
  };
  const handleShowScoreboard = () => {
    setShowScoreboard(true);
    setCurrentQuestion(null);
  };

  const handleNextQuestion = () => {
    socket.emit("nextQuestion");
    console.log("This is handleNextQuestion");
  };

  //const { question, options, answer, image } = currentQuestion;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-full gap-12 transition-all duration-300 ease-in-out transform">
        {loading ? (
          <Loading />
        ) : !hasJoined ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl">Hahoot!</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Nickname"
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              onClick={handleCreateRoom}
              className="bg-blue text-white px-4 py-2 rounded"
            >
              Create Room
            </button>
            <form onSubmit={handleJoinRoom} className="w-full flex flex-col">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Room ID"
                className="w-full px-4 py-2 border rounded mb-4 mt-4"
              />
              <button
                type="submit"
                className="bg-blue text-white px-4 py-2 rounded"
              >
                Join Room
              </button>
            </form>
          </div>
        ) : !isStarted ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Room ID: {roomId}</h2>
            <h3 className="text-xl mb-4">Players:</h3>
            <ul className="mb-4">
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
            {isOwner && (
              <button
                onClick={handleStartGame}
                className="bg-green text-white px-4 py-2 rounded"
              >
                Start Game
              </button>
            )}
          </div>
        ) : showScoreboard ? (
          <ScoreboardMultiplayer
            players={playerInfo}
            newSocket={newSocket}
            newRoomId={newRoomId}
          />
        ) : isOwner && currentQuestion ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-[75%] gap-12 transition-all duration-300 ease-in-out transform">
            <div className="bg-white shadow-lg rounded-lg p-12 w-full transition-transform duration-500 ease-in-out transform hover:scale-105">
              <h2 className="text-font-title text-center animate-none">
                {currentQuestion.question}
              </h2>
            </div>
            <div className="flex flex-row justify-between items-center my-4 gap-60 animate-fade-in">
              <span
                className={`flex items-center justify-center text-6xl text-white font-bold bg-timeLeft shadow-lg rounded-full w-32 h-32 ${
                  showAnswer ? "invisible" : ""
                }`}
                style={{ minWidth: "40px" }}
              >
                {timeLeft}
              </span>
              <img
                className={`w-[420px] h-[250px] rounded-lg ${
                  showAnswer ? "invisible" : ""
                }`}
                src={currentQuestion.image}
                alt="Quiz Image"
              />
              {console.log("SRC = ", currentQuestion.image)}
              <button
                className={`rounded-lg w-32 h-12 shadow-lg text-lg font-bold ${
                  showAnswer
                    ? "bg-white text-black animate-bounce"
                    : "bg-grey text-white invisible"
                } transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl`}
                onClick={handleShowScoreboard}
                disabled={!showAnswer}
              >
                Next
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  className={`px-10 py-10 text-white text-font-title text-start animate-pop ${
                    showAnswer
                      ? option === currentQuestion.answer
                        ? "bg-darkgreen"
                        : "bg-red opacity-80"
                      : `${buttonColors[index]} ${hoverColors[index]}`
                  } flex justify-between items-center transition-all duration-500 ease-in-out transform hover:scale-105`}
                  disabled={showAnswer}
                >
                  <div className="flex items-center">
                    {iconsDefault[index]}&nbsp;&nbsp;{option}
                  </div>
                  {showAnswer && (
                    <div className="ml-2">
                      {option === currentQuestion.answer ? (
                        <CheckTrue />
                      ) : (
                        <CheckFalse />
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : clientAnswerResult !== null ? (
          clientAnswerResult ? (
            <div>
              <div>Client Answer Result is True</div>
              <div>You score: {score}</div>
            </div>
          ) : (
            <div>
              <div>Client Answer Result is False</div>
              <div>You score: {score}</div>
            </div>
          )
        ) : !isOwner && currentQuestion ? (
          <>
            {
              //console.log("currentQuestion = ", currentQuestion)
              //alert("This render Component for Clients")
            }
            <div className="h-screen w-screen bg-transparent flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      className={`w-[473px] h-[294px] px-10 py-10 text-white animate-pop ${buttonColors[index]} ${hoverColors[index]} flex justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-105`}
                    >
                      {iconsCustom[index]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MultiPlayer;
