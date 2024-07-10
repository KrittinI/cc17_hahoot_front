import { Circle, Dimond, Square, Triangle } from "../../../icons/kahoot";
import OwnerChoiceButton from "./OwnerChoiceButton";
const iconsDefault = {
    A: <Triangle />,
    B: <Dimond />,
    C: <Circle />,
    D: <Square />,
}

export default function OwnerChoice({ currentQuestion, showAnswer }) {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <OwnerChoiceButton answer={currentQuestion?.answer} showAnswer={showAnswer} choice={"A"}>
                <div className="flex items-center">
                    {iconsDefault["A"]}&nbsp;&nbsp;{currentQuestion?.choice1}
                </div>
            </OwnerChoiceButton>
            <OwnerChoiceButton answer={currentQuestion?.answer} showAnswer={showAnswer} choice={"B"}>
                <div className="flex items-center">
                    {iconsDefault["B"]}&nbsp;&nbsp;{currentQuestion?.choice2}
                </div>
            </OwnerChoiceButton>
            {
                currentQuestion?.choice3 &&
                <OwnerChoiceButton answer={currentQuestion?.answer} showAnswer={showAnswer} choice={"C"}>
                    <div className="flex items-center">
                        {iconsDefault["C"]}&nbsp;&nbsp;{currentQuestion?.choice3}
                    </div>
                </OwnerChoiceButton>
            }
            {
                currentQuestion?.choice4 &&
                <OwnerChoiceButton answer={currentQuestion?.answer} showAnswer={showAnswer} choice={"D"}>
                    <div className="flex items-center">
                        {iconsDefault["D"]}&nbsp;&nbsp;{currentQuestion?.choice4}
                    </div>
                </OwnerChoiceButton>
            }
        </div>
    )
}
