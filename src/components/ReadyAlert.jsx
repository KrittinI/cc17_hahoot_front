import { useNavigate } from "react-router-dom";
import QuestionIcon from "../icons/Question";
import Button from "./Button";

export default function ReadyAlert({ onClose }) {

  const navigate = useNavigate()
  const onClickConfirm = () => {
    navigate('/play/:eventId')
    console.log('Confirm');
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-4">
      <QuestionIcon />
      <div className="grid grid-cols-2 gap-6">
        <Button bg="black" width="20" onClick={() => window.location.reload()}>
          Exit
        </Button>
        <Button bg="black" width="20" onClick={onClickConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
