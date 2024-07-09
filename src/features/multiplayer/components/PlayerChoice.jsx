import {
    Square,
    Circle,
    Dimond,
    Triangle,
} from "../../../icons/kahoot";
const iconsCustom = {
    0: <Triangle size="20vmin" />,
    1: <Dimond size="20vmin" />,
    2: <Circle size="20vmin" />,
    3: <Square size="20vmin" />,
}
const buttonColors = [
    "bg-darkred hover:bg-darkredDarker",
    "bg-darkblue hover:bg-darkblueDarker",
    "bg-darkyellow hover:bg-darkyellowDarker",
    "bg-darkgreen hover:bg-darkgreenDarker",
];

const answerChoice = ["A", "B", "C", "D"]

export default function PlayerChoice({ handleAnswerClick, choice }) {
    console.log(choice);
    return (
        <div className="h-screen w-screen bg-transparent flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-full">
                    {choice.map((option, index) => (
                        <button
                            key={option}
                            onClick={() => handleAnswerClick(answerChoice[index])}
                            className={`w-full sm:w-[220px] md:w-[320px] lg:w-[400px] xl:w-[473px] h-[120px] sm:h-[160px] md:h-[200px] lg:h-[250px] xl:h-[294px] px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 text-white animate-pop ${buttonColors[index]} flex justify-center items-center transition-all duration-300 ease-in-out transform hover:scale-105`}
                        >
                            {iconsCustom[index]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
