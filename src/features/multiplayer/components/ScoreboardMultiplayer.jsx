import { useEffect } from "react";
import Button from "../../../components/Button";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const ScoreboardMultiplayer = ({
  players,
  socket,
  newRoomId,
  isGameOver,
  playerId
}) => {
  console.log(players);
  const navigate = useNavigate()
  useEffect(() => {
    if (isGameOver) {
      confetti({
        particleCount: 600,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [isGameOver]);

  const handleNextQuestion = () => {
    socket.emit("nextQuestion", newRoomId);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)] animate-fade-in">
      <div className="grid grid-1 gap-8 text-center w-auto h-auto bg-white rounded-lg p-6 shadow-lg animate-pop">
        <h1 className="text-font-title">Scoreboard</h1>
        <ul>
          {players.sort((a, b) => b.score - a.score).map((p) => (
            <li key={p.id} className={`flex justify-between border-b py-2 ${p.id === playerId && "bg-green"}`}>
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
                onClick={() => navigate('/')}
              >
                Back Home
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
