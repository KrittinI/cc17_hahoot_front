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
                sm:w-[220px]
                md:w-[320px]
                lg:w-[400px]
                xl:w-[473px]
                h-[120px]
                sm:h-[160px]
                md:h-[200px]
                lg:h-[250px]
                xl:h-[294px]
                px-4
                py-4
                sm:px-6
                sm:py-6
                md:px-8
                md:py-8
                lg:px-10
                lg:py-10
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
