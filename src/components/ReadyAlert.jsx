import QuestionIcon from "../icons/Question";
import Button from "./Button";

export default function ReadyAlert({ onClose, onClickConfirm }) {

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <QuestionIcon size={20}/>
      <div className="grid grid-cols-2 gap-6">
        <Button bg="black" width="40" onClick={onClose}>
          Exit
        </Button>
        <Button bg="blue" width="40" onClick={onClickConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
