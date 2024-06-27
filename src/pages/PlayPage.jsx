import { useState, useEffect } from "react";
import image from "../assets/hh-hero.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const quizData = [
  {
    question: "1 + 1 เท่ากับเท่าไหร่ ?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    image: image,
  },
];

export default function PlayPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  //   const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const navigate = useNavigate();

    const handleOnClickBackToHome = () => {
      navigate("/");
    };

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
  };

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
          <img className=" w-[420px] h-[250px] rounded-lg" src={image} />
        </div>

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
        <div className="flex justify-end mt-4">
          <Button bg={"black"}  onClick={handleOnClickBackToHome}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
