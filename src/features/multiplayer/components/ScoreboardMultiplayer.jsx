import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import confetti from "canvas-confetti";

//import io from "socket.io-client";

const ScoreboardMultiplayer = ({
  players,
  newSocket,
  newRoomId,
  isGameOver,
  setIsGameOver,
}) => {
  useEffect(() => {
    if (isGameOver) {
      confetti({
        particleCount: 600,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
    // newSocket.on("aa",()=>{
    //   //
    // })
  }, [isGameOver]);

  const handleNextQuestion = () => {
    newSocket.emit("nextQuestion", newRoomId);
    //alert("handleNextQuestion is working");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)] animate-fade-in">
      <div className="grid grid-1 gap-8 text-center w-auto h-auto bg-white rounded-lg p-6 shadow-lg animate-pop">
        <h1 className="text-font-title">Scoreboard</h1>

        <ul>
          {players.map((p) => (
            <li key={p.id} className="flex justify-between border-b py-2">
              <span>{p.name}</span>
              <span>{p.score}</span>
            </li>
          ))}
        </ul>

        <div className="w-full grid grid-col gap-2 justify-center items-center">
          {isGameOver ? (
            <>
              <Button bg="black" width="60">
                Send to your E-mail
              </Button>
              <Button
                bg="blue"
                width="60"
                onClick={() => window.location.reload(true)}
              >
                Play again
              </Button>
            </>
          ) : (
            <Button bg="blue" width="60" onClick={handleNextQuestion}>
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreboardMultiplayer;
