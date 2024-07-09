import { CheckFalse, CheckTrue, Circle, Dimond, Square, Triangle } from "../../../icons/kahoot";
const iconsDefault = {
    0: <Triangle />,
    1: <Dimond />,
    2: <Circle />,
    3: <Square />,
}
const buttonColors = [
    "bg-darkred hover:bg-darkredDarker",
    "bg-darkblue hover:bg-darkblueDarker",
    "bg-darkyellow hover:bg-darkyellowDarker",
    "bg-darkgreen hover:bg-darkgreenDarker",
];
const answerChoice = ["A", "B", "C", "D"]

export default function OwnerChoice({ answer, choice, showAnswer }) {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            {choice.map((option, index) => (
                <button
                    key={option}
                    className={`px-10 py-10 text-white text-font-title text-start animate-pop ${showAnswer
                        ? answerChoice[index] === answer
                            ? "bg-darkgreen"
                            : "bg-red opacity-80"
                        : `${buttonColors[index]}`
                        } flex justify-between items-center transition-all duration-500 ease-in-out transform hover:scale-105`}
                    disabled={showAnswer}
                >
                    <div className="flex items-center">
                        {iconsDefault[index]}&nbsp;&nbsp;{option}
                    </div>
                    {showAnswer && (
                        <div className="ml-2">
                            {answerChoice[index] === answer ? (
                                <CheckTrue />
                            ) : (
                                <CheckFalse />
                            )}
                        </div>
                    )}
                </button>
            ))}
        </div>
    )
}
