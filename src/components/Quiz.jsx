/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Button from "./Button";
// import LeftArrowIcon from "../icons/left-arrow";
// import RightArrowIcon from "../icons/right-arrow";
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
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setSelectedAnswer(null);
      setShowAnswer(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSelectedAnswer(null);
      setShowAnswer(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(20);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setTimeLeft(20);
  };

  console.log("Current Question Index:", currentQuestionIndex);
  console.log("Quiz Data Length:", quizData.length);

  if (currentQuestionIndex >= quizData.length) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="grid grid-1 gap-8 text-center w-[400px] h-[266px] bg-white rounded-lg p-6">
          <h1 className="text-font-title">Your score</h1>
          <h1 className="text-font-header text-blue">{score}</h1>
          <div className="w-full grid grid-col gap-2 justify-center items-center">
            <Button bg="black" width="60">
              Send to your E-mail
            </Button>
            <Button bg="blue" width="60" onClick={resetQuiz}>
              Play again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { question, options, answer, image } = quizData[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-[75%] gap-12">
      <div className="bg-white shadow-lg rounded-lg p-12 w-full">
        <h2 className="text-font-title text-center">{question}</h2>
      </div>

      <div className="flex justify-around items-center my-4 gap-60">
        <img
          className="w-[420px] h-[250px] rounded-lg"
          src={image}
          alt="Quiz Image"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            className={`px-10 py-10 text-white text-font-title text-start ${
              showAnswer
                ? option === quizData[currentQuestionIndex].answer
                  ? "bg-darkgreen"
                  : selectedAnswer === option
                  ? "bg-darkred"
                  : "bg-red opacity-80"
                : `${buttonColors[index]} ${hoverColors[index]}`
            } flex justify-between items-center`}
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
      {/* {showAnswer && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleNextQuestion} bg="blue" width="60">
            Next
          </Button>
        </div>
      )} */}
    </div>
  );
}
