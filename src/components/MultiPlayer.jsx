/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  CheckTrue,
  CheckFalse,
  Square,
  Circle,
  Dimond,
  Triangle,
} from "../icons/kahoot";

const socket = io("http://localhost:4000");
const icons = [<Triangle />, <Dimond />, <Circle />, <Square />];
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
  const [timeLeft, setTimeLeft] = useState(15);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    socket.on("isOwner", () => setIsOwner(true));
    socket.on("roomCreated", (roomId) => {
      setRoomId(roomId);
      setHasJoined(true);
    });
    socket.on("updatePlayers", (players) => setPlayers(players));
    socket.on("gameStarted", () => {
      setIsStarted(true);
      setTotalTimeLeft(players.length * 20);
    });
    socket.on("newQuestion", (questionData) => {
      setCurrentQuestion(questionData);
      setTimeLeft(20);
      console.log("questionData = ", questionData);
    });
    socket.on("answerResult", ({ correct, answer }) => {
      setShowAnswer(true);
      if (correct) setScore((prevScore) => prevScore + 1);
      setTimeout(() => {
        setShowAnswer(false);
        setSelectedAnswer(null);
      }, 3000);
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

    return () => {
      socket.off("isOwner");
      socket.off("roomCreated");
      socket.off("updatePlayers");
      socket.off("gameStarted");
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
      socket.off("roomNotFound");
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setTotalTimeLeft((prevTotalTime) => prevTotalTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowAnswer(true);
      setTimeout(() => setShowAnswer(false), 3000);
    }
  }, [timeLeft, showAnswer]);

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
    socket.emit("submitAnswer", { roomId, answer: option });
  };

  //const { question, options, answer, image } = currentQuestion;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!hasJoined ? (
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
      ) : isOwner ? (
        <p>YES isOwner</p>
      ) : currentQuestion ? (
        <>
          {
            //console.log("currentQuestion = ", currentQuestion)}}}
          }
          <div className="w-[80vw] h-[80vh] bg-transparent">
            <div className="grid grid-cols-2 gap-2 w-full h-full">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option}
                  onClick={() => alert("Clicked")}
                  className={`px-10 py-10 text-white animate-pop ${buttonColors[index]} ${hoverColors[index]} flex justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-105`}
                >
                  {icons[index]}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        "Loading Questions ..."
      )}
    </div>
  );
};

export default MultiPlayer;
