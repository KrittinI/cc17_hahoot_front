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
import Button from "./Button";
import Input from "./Input";
import Logo from "../icons/Logo";

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
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  const [roomAnswerCount, setRoomAnswerCount] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  useEffect(() => {
    //Reset state when component mounts or reload page
    localStorage.clear();
    sessionStorage.clear();
    resetState();
  }, []);

  useEffect(() => {
    // เชื่อมต่อกับ Socket.IO โดยใช้ hostname ของเครื่องที่รัน Vite server
    socket = io(`http://${window.location.hostname}:4000`);
    //socket = io("http://localhost:4000");
    // const newSocket = io('http://localhost:4000'); // หรือ URL ของเซิร์ฟเวอร์จริง
    setNewSocket(socket);

    socket.on("RoomAnswerCount", (counts) => {
      //set something in state
      setRoomAnswerCount(counts);
      console.log("RoomAnswerCounter is working");
    });

    socket.on("answerCount", (count) => {
      console.log("answerCount =>", count);
      setAnswerCount(count);
    });
    socket.on("gameOver", () => {
      setIsGameOver(true);
    });

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
      setClientAnswerResult(null);
      setCurrentQuestion(questionData);
      setTimeLeft(20);

      console.log("newQuestion has received =>", questionData);
      //alert("newQuestion has received");
    });

    socket.on("showAnswer", () => {
      //setShowAnswer เป็นstateที่เซ็ทเมื่อผู้เล่นทุกคนกดคำตอบทุกคนแล้วจะโชว์คำตอบที่จอ Owner
      setLoading(false);
      setShowAnswer(true);
    });
    socket.on("answerResult", ({ correct, score }) => {
      //setShowAnswer(true);
      //alert("answerResult received");
      //alert(correct);
      //setScore(score); //100 from server

      // socket นี้จะทำงานเมื่อผู้เล่นทุกคนกดตอบจะshowในส่วนหน้าClient

      if (correct) setScore((prevScore) => prevScore + 1);

      //setLoading(true);
      setClientAnswerResult(correct);
      // setLoading(false);

      //handleCheck();
      // setTimeout(() => {
      //   setShowAnswer(false);
      //   setSelectedAnswer(null);
      // }, 3000);
    });
    socket.on("gameOver", () => {
      setCurrentQuestion("over");
    });
    socket.on("roomNotFound", () => {
      alert("Room ID not found");
    });
    socket.on("joinedRoom", () => {
      setHasJoined(true);
    });

    socket.on("ownerDisconnected", () => {
      //alert("The owner has disconnected. The game will restart.");
      window.location.reload(true);
      //resetState();
    });

    socket.on("updateScores", (players) => {
      setPlayerInfo(players);
    });

    socket.on("nextQuestion", () => {
      setNextQuestion(true); //Dummy state
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
      socket.off("ShowScoreboard");
      socket.off("answerCount");
      socket.off("RoomAnswerCount");
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      if (timeLeft && timeLeft > 0 && !showAnswer) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        socket.emit("submitAnswer", { roomId, answer: false, isTimeout: true });
        setShowAnswer(true);
        //set Client ans -> (false)
        //socket.emit("",false)
        //setClientAnswerResult(false);
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
    setNewSocket(null);
    setNewRoomId("");
    setIsGameOver(false);
    setAnswerCount(0);
    setRoomAnswerCount({
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    });

    //alert("Reset State");
  };

  const handleCreateRoom = () => {
    if (!name) alert("type nickname for creating room");
    if (name.trim()) {
      socket.emit("createRoom", name);
    }
  };

  const handleJoinRoom = (event) => {
    event.preventDefault();
    if (!name) alert("Please Enter nickname");
    if (!roomId) alert("Please Enter PIN");
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
    // แสดงหน้า Loading ตอนที่ player กดคำตอบ

    socket.emit("submitAnswer", { roomId, answer: option, isTimeout: false });
    setSelectedAnswer(null); //reset SelectedAnswer for next Question
    setLoading(true);
    console.log("submitAnswer is Working in Frontend");
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

  const indexToLetter = (index) => {
    return ["A", "B", "C", "D"][index];
  };

  //const { question, options, answer, image } = currentQuestion;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-full gap-12 transition-all duration-300 ease-in-out transform">
        {loading ? (
          <Loading />
        ) : !hasJoined ? (
          <div className="bg-white w-72 shadow-xl rounded-lg p-5 flex justify-center items-center flex-col gap-3 relative">
            <h2 className="text-center mb-2 font-bold text-black text-3xl">
              <Logo />
            </h2>
            <div role="button" className="absolute top-1 right-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter nickname"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mb-4 mt-4 text-center"
            />
            <Button width="full" bg="black" onClick={handleCreateRoom}>
              Create Room
            </Button>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Game PIN"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mb-4 mt-4 text-center"
              />
              <Button width="full" bg="black">
                Enter
              </Button>
            </form>
          </div>
        ) : !isStarted ? (
          <div className="bg-white w-3/4 h-5/6 rounded-lg shadow-xl gap-3 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">PIN Code: {roomId}</h2>
            <h3 className="text-xl mb-4">Players:</h3>
            <ul className="mb-4 bg-transparent rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {players.map((player, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border-b last:border-b-0 ${
                    index % 2 === 0 ? "bg-darkblueDarker" : "bg-darkredDarker"
                  }`}
                >
                  <span className="text-2xl font-semibold text-white">
                    {player}
                  </span>
                </li>
              ))}
            </ul>
            {isOwner && (
              <Button width="60" bg="green" onClick={handleStartGame}>
                Start Game!
              </Button>
            )}
          </div>
        ) : isOwner && showScoreboard ? (
          <ScoreboardMultiplayer
            players={playerInfo}
            newSocket={newSocket}
            newRoomId={newRoomId}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
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
              {!showAnswer ? (
                <img
                  className={`w-[420px] h-[250px] rounded-lg ${
                    showAnswer ? "invisible" : ""
                  }`}
                  src={currentQuestion.questionPicture}
                  alt="Quiz Image"
                />
              ) : (
                <div className="flex flex-row gap-2 mt-4">
                  <div className="flex flex-col items-center justify-center bg-darkredDarker p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                      {roomAnswerCount.A}
                    </div>
                    <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                      ▲
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-darkblueDarker p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                      {roomAnswerCount.B}
                    </div>
                    <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                      ◆
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-darkyellowDarker p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                      {roomAnswerCount.C}
                    </div>
                    <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                      ●
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-darkgreenDarker p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-center w-20 h-20 bg-transparent text-white text-4xl font-bold rounded-full">
                      {roomAnswerCount.D}
                    </div>
                    <div className="mt-2 bg-transparent px-4 py-2 rounded-full text-white text-lg font-semibold">
                      ■
                    </div>
                  </div>
                </div>
              )}
              {showAnswer ? (
                <button
                  className={`rounded-lg w-32 h-12 shadow-lg text-lg font-bold bg-white text-black animate-bounce transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl`}
                  onClick={handleShowScoreboard}
                  disabled={!showAnswer}
                >
                  Next
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center bg-transparent p-4 rounded-lg">
                  <div className="flex items-center justify-center w-20 h-20 bg-timeLeft text-white text-4xl font-bold rounded-full">
                    {answerCount}
                  </div>
                  <div className="mt-2 bg-timeLeft px-4 py-2 rounded-full text-white text-lg font-semibold">
                    Answers
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              {[
                currentQuestion.choice1,
                currentQuestion.choice2,
                currentQuestion.choice3,
                currentQuestion.choice4,
              ].map((option, index) => (
                <button
                  key={option}
                  className={`px-10 py-10 text-white text-font-title text-start animate-pop ${
                    showAnswer
                      ? indexToLetter(index) === currentQuestion.answer
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
                      {indexToLetter(index) === currentQuestion.answer ? (
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
            <div className="bg-timeLeft text-white text-center p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4 text-darkgreen">Correct</div>
              <div className="text-5xl mb-4 text-darkgreen">✅</div>
              {/* <div className="mt-2 text-2xl text-white">score:{score}</div> */}
            </div>
          ) : (
            <div className="bg-timeLeft text-white text-center p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4 text-darkred">Incorrect</div>
              <div className="text-5xl mb-4 text-darkred">❌</div>
              {/* <div className="mt-2 text-2xl text-white">score:{score}</div> */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-full">
                  {[
                    currentQuestion.choice1,
                    currentQuestion.choice2,
                    currentQuestion.choice3,
                    currentQuestion.choice4,
                  ].map((option, index) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      className={`w-full sm:w-[220px] md:w-[320px] lg:w-[400px] xl:w-[473px] h-[120px] sm:h-[160px] md:h-[200px] lg:h-[250px] xl:h-[294px] px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 text-white animate-pop ${buttonColors[index]} ${hoverColors[index]} flex justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-105`}
                    >
                      {iconsCustom[index]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-4xl">Oops! something wrong!</div>
        )}
      </div>
    </div>
  );
};

export default MultiPlayer;
