import OwnerChoice from "./OwnerChoice";
import RoomAnswerCount from "./RoomAnswerCount";

export default function ShowQuestion({ currentQuestion, showAnswer, roomAnswerCount, onClick, timeLeft, answerCount }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-[75%] gap-12 transition-all duration-300 ease-in-out transform">
            <div className="bg-white shadow-lg rounded-lg p-12 w-full transition-transform duration-500 ease-in-out transform hover:scale-105">
                <h2 className="text-font-title text-center animate-none">
                    {currentQuestion?.question}
                </h2>
            </div>
            <div className="flex flex-row justify-between items-center my-4 gap-60 animate-fade-in">
                <span
                    className={`flex items-center justify-center text-6xl text-white font-bold bg-timeLeft shadow-lg rounded-full w-32 h-32 ${showAnswer ? "invisible" : ""
                        }`}
                    style={{ minWidth: "40px" }}
                >
                    {timeLeft}
                </span>
                {!showAnswer ? (
                    <img
                        className={`w-[420px] h-[250px] rounded-lg ${showAnswer ? "invisible" : ""
                            }`}
                        src={currentQuestion?.questionPicture}
                        alt="Quiz Image"
                    />
                ) : (
                    <RoomAnswerCount roomAnswerCount={roomAnswerCount} />
                )}
                {showAnswer ? (
                    <button
                        className={`rounded-lg w-32 h-12 shadow-lg text-lg font-bold bg-white text-black animate-bounce transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl`}
                        onClick={onClick}
                    >
                        Next
                    </button>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-transparent p-4 rounded-lg">
                        <div className="flex items-center justify-center w-20 h-20 bg-timeLeft text-white text-4xl font-bold rounded-full">
                            {answerCount}
                        </div>
                        <div className="mt-2 bg-timeLeft px-4 py-2 rounded-full text-white text-lg font-semibold">
                            Answers
                        </div>
                    </div>
                )}
            </div>
            <OwnerChoice answer={currentQuestion?.answer} showAnswer={showAnswer} choice={[
                currentQuestion?.choice1,
                currentQuestion?.choice2,
                currentQuestion?.choice3,
                currentQuestion?.choice4,
            ]} />
        </div>
    )
}
