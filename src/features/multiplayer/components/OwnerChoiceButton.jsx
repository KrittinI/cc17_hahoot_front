import { CheckFalse, CheckTrue } from "../../../icons/kahoot";

const buttonColors = {
    A: "bg-darkred",
    B: "bg-darkblue ",
    C: "bg-darkyellow ",
    D: "bg-darkgreen",
};
export default function OwnerChoiceButton({ children, answer, showAnswer, choice }) {
    return (
        <button
            className={`px-10 py-10 text-white text-font-title text-start animate-pop ${showAnswer
                ? choice === answer
                    ? "bg-darkgreen"
                    : "bg-red opacity-80"
                : `${buttonColors[choice]}`
                } flex justify-between items-center transition-all duration-500 ease-in-out transform`}
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