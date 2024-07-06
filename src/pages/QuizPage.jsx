import { useState } from "react";
import Quiz from "../features/quiz/components/Quiz";
import useQuestion from "../hooks/useQuestion";
import Scoreboard from "../features/quiz/components/Scoreboard";
import { useEffect } from "react";

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const { playQuestion } = useQuestion()

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setSelectedAnswer(true);
    }
  }, [timeLeft, selectedAnswer]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    if (answer === playQuestion[currentQuestionIndex]?.answer) {
      setScore(score + timeLeft * 75);
    }
  };
  const handleNextQuestion = () => {
    if (showScoreboard && currentQuestionIndex < playQuestion.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
      setShowScoreboard(false);
    }
  };
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(20);
    setShowScoreboard(false);
  };
  const handleShowScoreboard = () => {
    setShowScoreboard(true);
    //alert("Show ScoreBoard");
  };
  return (
    <>
      {showScoreboard
        ? <Scoreboard
          score={score}
          isLastQuestion={currentQuestionIndex >= playQuestion.length - 1}
          handleNextQuestion={handleNextQuestion}
          resetQuiz={resetQuiz}
        />
        : <Quiz
          question={playQuestion[currentQuestionIndex]}
          handleShowScoreboard={handleShowScoreboard}
          handleAnswerClick={handleAnswerClick}
          selectedAnswer={selectedAnswer}
          timeLeft={timeLeft}
        />
      }
    </>
  );
}
