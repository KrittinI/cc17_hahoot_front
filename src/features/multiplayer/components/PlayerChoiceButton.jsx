const buttonColors = {
    A: "bg-darkred hover:bg-darkredDarker",
    B: "bg-darkblue hover:bg-darkblueDarker",
    C: "bg-darkyellow hover:bg-darkyellowDarker",
    D: "bg-darkgreen hover:bg-darkgreenDarker",
};
export default function PlayerChoiceButton({ children, onClick, choice }) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full 
                h-full
                p-4
                text-white
                animate-pop
                ${buttonColors[choice]} 
                flex
                justify-center
                items-center
                transition-all
                duration-300
                ease-in-out
                transform
                hover:scale-105`}
        >
            {children}
        </button>
    )
}
