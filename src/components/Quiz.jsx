import { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import useQuestion from "../hooks/useQuestion";
import Hero from "../assets/hh-hero.png"
import QuizButton from "../features/quiz/components/QuizButton";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const { playQuestion } = useQuestion()

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowAnswer(true);
    }
  }, [timeLeft, showAnswer]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);

    if (answer === playQuestion[currentQuestionIndex]?.answer) {
      setScore(score + timeLeft * 75);
    }
  };

  const handleNextQuestion = () => {
    if (showScoreboard && currentQuestionIndex < playQuestion.length - 1) {
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
        totalQuestions={playQuestion.length}
        resetQuiz={resetQuiz}
        isLastQuestion={currentQuestionIndex >= playQuestion.length - 1}
        handleNextQuestion={handleNextQuestion}
      />
    );
  }

  return (
    <div
      className={`w-full items-center min-h-screen ${showAnswer ? "bg-opacity-80 bg-black" : ""
        }`}
    >
      <div className="w-[90%] mx-auto h-screen flex flex-col items-center justify-center gap-12 transition-all duration-300 ease-in-out transform">
        <div className="bg-white shadow-lg rounded-lg p-12 w-full transition-transform duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-font-title text-center animate-none">
            {playQuestion[currentQuestionIndex]?.question}
          </h2>
        </div>
        <div className="flex justify-between items-center animate-fade-in w-full">
          <span
            className={`flex items-center justify-center text-6xl text-white font-bold bg-timeLeft shadow-lg rounded-full w-[100px] h-[100px] ${selectedAnswer || showAnswer ? "invisible" : ""
              }`}
            style={{ minWidth: "40px" }}
          >
            {timeLeft}
          </span>
          <img
            className={`max-w-[420px] max-h-[250px] rounded-lg ${selectedAnswer || showAnswer ? "invisible" : ""
              }`}
            src={playQuestion[currentQuestionIndex]?.questionPicture || Hero}
            alt="Quiz Image"
          />
          <button
            className={`rounded-lg w-32 h-12 shadow-lg text-lg font-bold ${selectedAnswer || showAnswer
              ? "bg-white text-black animate-bounce"
              : "invisible"
              } transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl`}
            onClick={handleShowScoreboard}
            disabled={!selectedAnswer && !showAnswer}
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full">
          <QuizButton
            index={"A"}
            onClick={() => handleAnswerClick("A")}
            showAnswer={showAnswer}
            answer={playQuestion[currentQuestionIndex]?.answer}
            choice={playQuestion[currentQuestionIndex]?.choice1}
            selectedAnswer={selectedAnswer}
          />
          <QuizButton
            index={"B"}
            onClick={() => handleAnswerClick("B")}
            showAnswer={showAnswer}
            answer={playQuestion[currentQuestionIndex]?.answer}
            choice={playQuestion[currentQuestionIndex]?.choice2}
            selectedAnswer={selectedAnswer}
          />
          <QuizButton
            index={"C"}
            onClick={() => handleAnswerClick("C")}
            showAnswer={showAnswer}
            answer={playQuestion[currentQuestionIndex]?.answer}
            choice={playQuestion[currentQuestionIndex]?.choice3}
            selectedAnswer={selectedAnswer}
          />
          <QuizButton
            index={"D"}
            onClick={() => handleAnswerClick("D")}
            showAnswer={showAnswer}
            answer={playQuestion[currentQuestionIndex]?.answer}
            choice={playQuestion[currentQuestionIndex]?.choice4}
            selectedAnswer={selectedAnswer}
          />
        </div>
      </div>
    </div>
  );
}
