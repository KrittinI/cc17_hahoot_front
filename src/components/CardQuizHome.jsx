import { useState } from "react";
import Modal from "./Modal";
import ReadyAlert from "./ReadyAlert";
import Button from "./Button";

const bgMap = {
  red: " bg-red hover:bg-darkred",
  blue: " bg-blue hover:bg-darkblue",
  yellow: " bg-yellow hover:bg-darkyellow",
  green: " bg-green hover:bg-darkgreen",
};

export default function CardQuizHome({ imageSrc, title, bg }) {
  const [open, setOpen] = useState(false);


  const onClose = () => {
    console.log("Close");
    setOpen(false)
  }

  return (
    <div
      role="button"
      // onClick={() => setOpen(true)}
      className={`
          flex 
          ${bgMap[bg]} 
          max-w-sm rounded overflow-hidden shadow-lg
          `}
    >
      <div className="px-6 py-4">
        <p className="text-white text-font-body">Hahoot</p>
        <div className="text-font-title mb-2 text-white">{title}</div>
        <div>
          <img className="w-full" src={imageSrc} alt={title} />
        </div>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </div>
      <Modal title="" open={open} onClose={onClose}>
        <ReadyAlert onClose={onClose} />
      </Modal>
    </div>
  );
}
