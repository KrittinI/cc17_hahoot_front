import { useState } from "react";
import Modal from "./Modal";
import ReadyAlert from "./ReadyAlert";
import hhHero from "../assets/hh-hero.png"
import { useNavigate } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";

const bgMap = {
  0: " bg-red hover:bg-darkred",
  1: " bg-blue hover:bg-darkblue",
  2: " bg-yellow hover:bg-darkyellow",
  3: " bg-green hover:bg-darkgreen",
};

export default function CardQuizHome({ bg, data }) {
  const [open, setOpen] = useState(false);
  const { setPlayQuestion } = useQuestion()

  const navigate = useNavigate()
  const onClickConfirm = () => {
    setPlayQuestion([data])
    navigate(`/quiz`)
  }

  const handleClose = () => {
    console.log('click');
    console.log(open);
    setOpen(false)
  }

  return (
    <div
      role="button"
      onClick={() => setOpen(true)}
      className={`
          flex 
          ${bgMap[bg]} 
          max-w-sm rounded overflow-hidden shadow-lg
          `}
    >
      <div className="px-6 py-4">
        <div className="text-white text-font-body">Hahoot</div>
        <div className="text-font-title text-white max-h-full">
          {data?.question}
        </div>
        <div className="">
          <img className="w-full" src={data?.questionPicture || hhHero} alt={data?.question} />
        </div>
      </div>
      <Modal title="Are you ready" open={open}>
        <ReadyAlert onClose={() => window.location.reload()} onClickConfirm={onClickConfirm} />
      </Modal>
    </div>
  );
}
