import { CheckFalse, CheckTrue } from "../../../icons/kahoot";

const buttonColors = {
    A: "bg-darkred hover:bg-darkredDarker",
    B: "bg-darkblue hover:bg-darkblueDarker",
    C: "bg-darkyellow hover:bg-darkyellowDarker",
    D: "bg-darkgreen hover:bg-darkgreenDarker",
};
export default function OwnerChoiceButton({ children, answer, showAnswer, choice }) {
    return (
        <button
            className={`px-10 py-10 text-white text-font-title text-start animate-pop ${showAnswer
                ? choice === answer
                    ? "bg-darkgreen"
                    : "bg-red opacity-80"
                : `${buttonColors[choice]}`
                } flex justify-between items-center transition-all duration-500 ease-in-out transform hover:scale-105`}
            disabled={showAnswer}
        >
            {children}
            {showAnswer && (
                <div className="ml-2">
                    {choice === answer ? (
                        <CheckTrue />
                    ) : (
                        <CheckFalse />
                    )}
                </div>
            )}
        </button>
    )
}