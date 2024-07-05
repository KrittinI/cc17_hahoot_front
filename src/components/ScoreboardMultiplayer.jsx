import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;
const ScoreboardMultiplayer = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.on("updateScores", (players) => {
      setScores(players);
    });

    return () => {
      socket.off("updateScores");
    };
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
      <ul>
        {scores.map((player) => (
          <li key={player.id} className="flex justify-between border-b py-2">
            <span>{player.name}</span>
            <span>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreboardMultiplayer;
