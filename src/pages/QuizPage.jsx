import { useState } from "react";
import Quiz from "../features/quiz/components/Quiz";
import useQuestion from "../hooks/useQuestion";
import Scoreboard from "../features/quiz/components/Scoreboard";
import { useEffect } from "react";
import playApi from "../api/play";

export default function QuizPage() {
  const { playQuestion } = useQuestion();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(playQuestion[0]?.timeLimit || 20);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [data, setData] = useState([]);
  // const [yourAnswer, setYourAnswer] = useState(null);

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
      setScore(score + timeLeft * 50);
    }
    const correctAnswer = playQuestion[currentQuestionIndex]?.answer;
    const questionScore = answer === correctAnswer ? timeLeft * 50 : 0;
    const result = answer === correctAnswer;

    if (answer === "A") {
      answer = playQuestion[currentQuestionIndex]?.choice1;
    } else if (answer === "B") {
      answer = playQuestion[currentQuestionIndex]?.choice2;
    } else if (answer === "C") {
      answer = playQuestion[currentQuestionIndex]?.choice3;
    } else {
      answer = playQuestion[currentQuestionIndex]?.choice4;
    }

    setData((pre) => [
      ...pre,
      {
        question: playQuestion[currentQuestionIndex]?.question,
        yourAnswer: answer,
        result: result,
        score: questionScore,
        sum: score + questionScore,
      },
    ]);
  };

  const handleSendMail = async () => {
    await playApi.sendmail(data);
  };

  const handleNextQuestion = () => {
    if (showScoreboard && currentQuestionIndex < playQuestion.length - 1) {
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(playQuestion[currentQuestionIndex + 1]?.timeLimit || 20);
      setShowScoreboard(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(playQuestion[0]?.timeLimit || 20);
    setShowScoreboard(false);
  };
  const handleShowScoreboard = () => {
    setShowScoreboard(true);
    //alert("Show ScoreBoard");
  };

  return (
    <>
      {showScoreboard ? (
        <Scoreboard
          score={score}
          isLastQuestion={currentQuestionIndex >= playQuestion.length - 1}
          handleNextQuestion={handleNextQuestion}
          resetQuiz={resetQuiz}
          handleSendMail={handleSendMail}
        />
      ) : (
        <Quiz
          question={playQuestion[currentQuestionIndex]}
          handleShowScoreboard={handleShowScoreboard}
          handleAnswerClick={handleAnswerClick}
          selectedAnswer={selectedAnswer}
          timeLeft={timeLeft}
        />
      )}
    </>
  );
}
