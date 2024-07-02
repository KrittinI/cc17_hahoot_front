/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
// import Button from "./Button";
import { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import {
  CheckTrue,
  CheckFalse,
  Square,
  Circle,
  Dimond,
  Triangle,
} from "../icons/kahoot";

const quizData = [
  {
    question: "1 + 1 เท่ากับเท่าไหร่?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    image: "src/assets/hh-hero.png",
  },
  {
    question: "A B C D E F?",
    options: ["G", "H", "I", "J"],
    answer: "G",
    image: "src/assets/c4.jpeg",
  },
  // (ใส่คำถามอื่นๆ ที่ยากในนี้)
];

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

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowAnswer(true);
    }
  }, [timeLeft, showAnswer]);

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    setShowAnswer(true);

    if (option === quizData[currentQuestionIndex].answer) {
      setScore(score + timeLeft * 75);
    }
  };

  const handleNextQuestion = () => {
    if (showScoreboard && currentQuestionIndex < quizData.length - 1) {
      setSelectedAnswer(null);
      setShowAnswer(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
      setShowScoreboard(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setTimeLeft(20);
    setShowScoreboard(false);
  };

  const handleShowScoreboard = () => {
    setShowScoreboard(true);
    //alert("Show ScoreBoard");
  };
  if (showScoreboard) {
    return (
      <Scoreboard
        score={score}
        totalQuestions={quizData.length}
        resetQuiz={resetQuiz}
        isLastQuestion={currentQuestionIndex >= quizData.length - 1}
        handleNextQuestion={handleNextQuestion}
      />
    );
  }

  const { question, options, answer, image } = quizData[currentQuestionIndex];

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        selectedAnswer || showAnswer ? "bg-opacity-80 bg-black" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-[75%] gap-12 transition-all duration-300 ease-in-out transform">
        <div className="bg-white shadow-lg rounded-lg p-12 w-full transition-transform duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-font-title text-center animate-none">
            {question}
          </h2>
        </div>
        <div className="flex flex-row justify-between items-center my-4 gap-60 animate-fade-in">
          <span
            className={`flex items-center justify-center text-6xl text-white font-bold bg-timeLeft shadow-lg rounded-full w-32 h-32 ${
              selectedAnswer || showAnswer ? "invisible" : ""
            }`}
            style={{ minWidth: "40px" }}
          >
            {timeLeft}
          </span>
          <img
            className={`w-[420px] h-[250px] rounded-lg ${
              selectedAnswer || showAnswer ? "invisible" : ""
            }`}
            src={image}
            alt="Quiz Image"
          />
          <button
            className={`rounded-lg w-32 h-12 shadow-lg text-lg font-bold ${
              selectedAnswer || showAnswer
                ? "bg-white text-black animate-bounce"
                : "bg-grey text-white invisible"
            } transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl`}
            onClick={handleShowScoreboard}
            disabled={!selectedAnswer && !showAnswer}
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleAnswerClick(option)}
              className={`px-10 py-10 text-white text-font-title text-start animate-pop ${
                showAnswer
                  ? option === quizData[currentQuestionIndex].answer
                    ? "bg-darkgreen"
                    : selectedAnswer === option
                    ? "bg-darkred"
                    : "bg-red opacity-80"
                  : `${buttonColors[index]} ${hoverColors[index]}`
              } flex justify-between items-center transition-all duration-500 ease-in-out transform hover:scale-105`}
              disabled={showAnswer || selectedAnswer}
            >
              <div className="flex items-center">
                {icons[index]}&nbsp;&nbsp;{option}
              </div>
              {showAnswer && (
                <div className="ml-2">
                  {option === quizData[currentQuestionIndex].answer ? (
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
    </div>
  );
}
