import { useEffect, useState } from "react";
//import io from "socket.io-client";

const ScoreboardMultiplayer = ({ players }) => {
  //const [scores, setScores] = useState([]);
  //console.log("socket = ", socket);
  // useEffect(() => {
  //   setScores(players);
  // }, [players]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
      {/* {console.log("Scores => ", scores)} */}
      <ul>
        {players.map((p) => (
          <li key={p.id} className="flex justify-between border-b py-2">
            <span>{p.name}</span>
            <span>{p.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreboardMultiplayer;
