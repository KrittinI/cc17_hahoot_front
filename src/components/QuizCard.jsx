import { useState, useEffect } from "react";
import Button from "./Button";
import LeftArrowIcon from "../icons/left-arrow";
import RightArrowIcon from "../icons/right-arrow";

const quizData = [
  {
    question: "1 + 1 เท่ากับเท่าไหร่ ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    image: "src/assets/hh-hero.png",
  },
  {
    question: "A B C D E F ?",
    options: ["G", "H", "I", "J"],
    answer: "G",
    image: "src/assets/c4.jpeg",
  },

  // (ใส่คำถามอื่นๆ ที่ยากในนี้)
];

export default function QuizCard() {
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
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeLeft(20);
  };

  const handlePrevioQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setTimeLeft(20);
  };

  if (currentQuestionIndex >= quizData.length) {
    return (
      // Result your score
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="grid grid-1 gap-8 text-center w-[400px] h-[266px] bg-white rounded-lg p-6 ">
          <h1 className="text-font-title">Your score</h1>
          <h1 className="text-font-header text-blue">
            {score}
            {/* / {quizData.length} */}
          </h1>
          <div className="w-full grid grid-col gap-2 justify-center items-center ">
            <Button
              bg="black"
              width="60"
              // onClick={() => window.location.reload()}
            >
              Send to your E-mail
            </Button>
            <Button
              bg="blue"
              width="60"
              onClick={() => window.location.reload()}
            >
              Play again
            </Button>
          </div>
        </div>
      </div>
      // Result your score
    );
  }

  const { question, options, answer, image } = quizData[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
      <div className="w-[60%]">
        {/* Quiz */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full">
          <h2 className="text-font-title text-center">{question}</h2>
        </div>
        {/* Quiz */}

        {/* Timer bar */}
        <div className="relative h-8 rounded-full my-4 w-full bg-grey ">
          <div
            className="absolute top-0 left-0 h-8 bg-red rounded-full w-full "
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          ></div>
        </div>
        {/* Timer bar */}

        {/* Quiz Cover */}
        <div className="flex justify-around items-center my-4">
          <div
            className="flex justify-center items-center bg-yellow w-[80px] h-[80px] rounded-full invisiable"
            onClick={handlePrevioQuestion}
          >
            <LeftArrowIcon />
          </div>
          <img className=" w-[420px] h-[250px] rounded-lg" src={image} />
          <div
            className="flex justify-center items-center bg-red w-[80px] h-[80px] rounded-full invisiable"
            onClick={handleNextQuestion}
          >
            <RightArrowIcon />
          </div>
        </div>
        {/* Quiz Cover */}

        {/* Answer Option */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {options.map((option) => (
            <>
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                className={`px-8 py-8 rounded-lg text-white text-font-title text-start ${
                  option === selectedAnswer
                    ? option === answer
                      ? "bg-green"
                      : "bg-red"
                    : "bg-blue hover:bg-darkblue"
                }`}
              >
                {option}
              </button>
            </>
          ))}
        </div>
        {/* Answer Option */}
        {showAnswer && selectedAnswer !== answer && (
          <div className="mt-4 p-4 text-red text-2xl bg-white rounded-lg w-full text-center">
            เป็นคำตอบที่ผิด! คำตอบที่ถูกต้องคือ: {answer}
          </div>
        )}
        {showAnswer && selectedAnswer === answer && (
          <div className="mt-4 p-4 text-green text-2xl bg-white rounded-lg w-full text-center">
            {answer} : เป็นคำตอบที่ถูกต้อง
          </div>
        )}
      </div>
    </div>
  );
}
