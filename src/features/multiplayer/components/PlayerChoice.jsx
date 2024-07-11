import { Square, Circle, Dimond, Triangle } from "../../../icons/kahoot";
import PlayerChoiceButton from "./PlayerChoiceButton";

export default function PlayerChoice({ handleAnswerClick, choice3, choice4 }) {
  return (
    <div className="h-screen w-screen bg-transparent flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-full p-4">
        <PlayerChoiceButton onClick={() => handleAnswerClick("A")} choice={"A"}>
          <Triangle size="20vmin" />
        </PlayerChoiceButton>
        <PlayerChoiceButton onClick={() => handleAnswerClick("B")} choice={"B"}>
          <Dimond size="20vmin" />
        </PlayerChoiceButton>
        {choice3 && (
          <PlayerChoiceButton
            onClick={() => handleAnswerClick("C")}
            choice={"C"}
          >
            <Circle size="20vmin" />
          </PlayerChoiceButton>
        )}
        {choice4 && (
          <PlayerChoiceButton
            onClick={() => handleAnswerClick("D")}
            choice={"D"}
          >
            <Square size="20vmin" />
          </PlayerChoiceButton>
        )}
      </div>
    </div>
  );
}
