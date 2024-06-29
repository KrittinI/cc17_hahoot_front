/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Quiz = () => {
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
      setTotalTimeLeft(players.length * 15);
    });
    socket.on("newQuestion", (questionData) => {
      setCurrentQuestion(questionData);
      setTimeLeft(15);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!hasJoined ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What's your name?"
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button
            onClick={handleCreateRoom}
            className="bg-blue text-white px-4 py-2 rounded"
          >
            Create Room
          </button>
          <form onSubmit={handleJoinRoom} className="w-full">
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
      ) : currentQuestion ? (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">
            {currentQuestion.question}
          </h2>
          <div className="relative w-full h-4 bg-grey rounded-full mb-6">
            <div
              className="absolute top-0 left-0 h-4 bg-green rounded-full"
              style={{
                width: `${(totalTimeLeft / (players.length * 15)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                className={`px-4 py-2 rounded-lg text-white ${
                  option === selectedAnswer
                    ? option === currentQuestion.answer
                      ? "bg-green"
                      : "bg-red"
                    : "bg-blue hover:bg-darkblue"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="relative w-full h-4 bg-grey rounded-full mb-6 mt-6">
            <div
              className="absolute top-0 left-0 h-4 bg-red rounded-full"
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            ></div>
          </div>
          {showAnswer && currentQuestion && currentQuestion.answer && (
            <div className="mt-8 text-red-500 font-bold">
              คำตอบที่ถูกต้องคือ: {currentQuestion.answer}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold mb-4">
            {name} ได้คะแนน {score} / {players.length}
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue text-white px-4 py-2 rounded"
          >
            เล่นอีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
