import {
    CheckTrue,
    CheckFalse,
    Square,
    Circle,
    Dimond,
    Triangle,
} from "../../../icons/kahoot";
const buttonColors = {
    A: "bg-red hover:bg-darkred",
    B: "bg-blue hover:bg-darkblue",
    C: "bg-yellow hover:bg-darkyellow",
    D: "bg-green hover:bg-darkgreen",
}

const icons = {
    A: <Triangle />,
    B: <Dimond />,
    C: <Circle />,
    D: <Square />
};
export default function QuizButton({ onClick, correctAnswer, selectedAnswer, choice, index }) {
    return (
        <>
            <button
                onClick={onClick}
                className={`px-5 py-10 text-white text-font-title text-start animate-pop ${selectedAnswer
                    ? correctAnswer
                        ? "bg-darkgreen"
                        : selectedAnswer === index
                            ? "bg-darkred"
                            : "bg-red opacity-80"
                    : `${buttonColors[index]}`
                    } flex justify-between items-center transition-all duration-500 ease-in-out transform hover:scale-105`}
                disabled={selectedAnswer}
            >
                <div className="flex items-center">
                    {icons[index]}&nbsp;&nbsp;{choice}
                </div>
                {selectedAnswer && (
                    <div className="">
                        {correctAnswer ? (
                            <CheckTrue />
                        ) : (
                            <CheckFalse />
                        )}
                    </div>
                )}
            </button>
        </>
    )
}
