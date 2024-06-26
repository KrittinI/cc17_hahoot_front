import QuestionIcon from "../icons/Question";
import Button from "./Button";

export default function ReadyAlert({ onClose }) {
  return (

    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <QuestionIcon />
      <div className="text-font-title">Are you ready</div>
      <div className="flex justify-around items-center">
        <Button bg="black" width="20" onClick={onClose}>
          Exit
        </Button>
        <Button bg="black" width="20">
          Confirm
        </Button>
      </div>
    </div>
  );
}
