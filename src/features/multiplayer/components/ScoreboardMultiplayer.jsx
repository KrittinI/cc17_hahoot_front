import { useEffect } from "react";
import Button from "../../../components/Button";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const ScoreboardMultiplayer = ({
  players,
  socket,
  newRoomId,
  isGameOver,
  playerId,
  handleSendMail,
}) => {
  const [isSendMail, setIsSendMail] = useState(false);
  const { authUser } = useAuth();

  const navigate = useNavigate();
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
  const ownerId = socket.id; // Example way to get ownerId, adapt as needed
  // Find the highest score
  const highestScore = Math.max(...players.map((p) => p.score));

  console.log("socket=>", socket);
  console.log("newRoomId=>", newRoomId);
  console.log("players=>", players);

  const sendMail = async () => {
    setIsSendMail(true);
    handleSendMail(authUser?.email);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)] animate-fade-in">
      <div className="grid grid-1 gap-8 text-center w-auto h-auto bg-white rounded-lg p-6 shadow-lg animate-pop">
        <h1 className="text-font-title">Scoreboard</h1>
        <ul>
          {players
            .filter((p) => p.id !== ownerId)
            .sort((a, b) => b.score - a.score)
            .map((p) => (
              <li
                key={p.id}
                className={`flex justify-between rounded-lg px-4 py-2 ${p.score === highestScore ? "bg-gray-200" : ""
                  }`}
              >
                <span>{p.name}</span>
                <span>{p.score}</span>
              </li>
            ))}
        </ul>
        <div className="w-full grid grid-col gap-2 justify-center items-center">
          {isGameOver ? (
            <>
              {isSendMail ? null : (
                <Button bg="black" width="60" onClick={sendMail}>
                  Send to your E-mail
                </Button>
              )}
              <Button bg="blue" width="60" onClick={() => navigate(-1)}>
                Back to Event
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
