import Hero from "../../../assets/hh-hero.png"
import QuizButton from "./QuizButton";

export default function Quiz({ question, handleShowScoreboard, handleAnswerClick, selectedAnswer, timeLeft }) {
  return (
    <div
      className={`w-full items-center min-h-screen ${selectedAnswer ? "bg-opacity-80 bg-black" : ""
        }`}
    >
      <div className="w-[90%] mx-auto h-screen flex flex-col items-center justify-center gap-12 transition-all duration-300 ease-in-out transform">
        <div className="bg-white shadow-lg rounded-lg p-12 w-full transition-transform duration-500 ease-in-out transform hover:scale-105">
          <h2 className="text-font-title text-center animate-none">
            {question?.question}
          </h2>
        </div>
        <div className="flex justify-between items-center animate-fade-in w-full">
          <span
            className={`flex items-center justify-center text-6xl text-white font-bold bg-timeLeft shadow-lg rounded-full w-[100px] h-[100px] ${selectedAnswer ? "invisible" : ""
              }`}
            style={{ minWidth: "40px" }}
          >
            {timeLeft}
          </span>
          <img
            className={`max-w-[420px] max-h-[250px] rounded-lg ${selectedAnswer ? "invisible" : ""
              }`}
            src={question?.questionPicture || Hero}
            alt="Quiz Image"
          />
          <button
            className={`rounded-lg w-32 h-12 shadow-lg text-lg font-bold ${selectedAnswer
              ? "bg-white text-black animate-bounce"
              : "invisible"
              } transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl`}
            onClick={handleShowScoreboard}
            disabled={!selectedAnswer}
          >
            Next
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full">
          <QuizButton
            index={"A"}
            onClick={() => handleAnswerClick("A")}
            choice={question?.choice1}
            correctAnswer={"A" === question?.answer}
            selectedAnswer={selectedAnswer}
          />
          <QuizButton
            index={"B"}
            onClick={() => handleAnswerClick("B")}
            choice={question?.choice2}
            correctAnswer={"B" === question?.answer}
            selectedAnswer={selectedAnswer}
          />
          {question?.choice3 && <QuizButton
            index={"C"}
            onClick={() => handleAnswerClick("C")}
            choice={question?.choice3}
            correctAnswer={"C" === question?.answer}
            selectedAnswer={selectedAnswer}
          />}
          {question?.choice4 && <QuizButton
            index={"D"}
            onClick={() => handleAnswerClick("D")}
            choice={question?.choice4}
            correctAnswer={"D" === question?.answer}
            selectedAnswer={selectedAnswer}
          />}
        </div>
      </div>
    </div>
  );
}
