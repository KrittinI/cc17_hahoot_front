import Button from "../../../components/Button";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

export default function Scoreboard({
  score,
  resetQuiz,
  isLastQuestion,
  handleNextQuestion,
  handleSendMail,
  isSendmail,
}) {
  useEffect(() => {
    if (isLastQuestion) {
      confetti({
        particleCount: 600,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [isLastQuestion]);
  const navigate = useNavigate();


  return (
    <div className="flex items-center justify-center h-[calc(100vh-12rem)] animate-fade-in">
      <div className="grid grid-1 gap-8 text-center w-[400px] h-[320px] bg-white rounded-lg p-6 shadow-lg animate-pop">
        <h1 className="text-font-title">Your score</h1>
        <h1 className="text-font-header text-blue">{score}</h1>
        <p>points</p>
        <div className="w-full grid grid-col gap-2 justify-center items-center">
          {isLastQuestion ? (
            <>
              <Button bg="blue" width="60" onClick={resetQuiz}>
                Play again
              </Button>
              {isSendmail ? null : (
                <Button bg="black" width="60" onClick={handleSendMail}>
                  Send to your E-mail
                </Button>
              )}
              <Button bg="blue" width="60" onClick={() => navigate("/")}>
                Back to Home
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
}
