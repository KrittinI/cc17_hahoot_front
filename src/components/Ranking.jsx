import React from "react";

const Ranking = ({ ranking, onNextQuestion }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Ranking</h2>
      <ul className="mb-4">
        {ranking.map((player, index) => (
          <li key={index}>
            {index + 1}. {player.name} - {player.score} points
          </li>
        ))}
      </ul>
      <button
        onClick={onNextQuestion}
        className="bg-blue text-white px-4 py-2 rounded"
      >
        Next Question
      </button>
    </div>
  );
};

export default Ranking;
