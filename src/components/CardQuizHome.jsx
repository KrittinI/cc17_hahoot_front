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

  return (
    <>
      <div
        role="button"
        onClick={() => setOpen(true)}
        className={`
          flex flex-col
          ${bgMap[bg]} 
          max-w-sm rounded overflow-hidden shadow-lg
          p-4 sm:w-[100px] md:w-full
          `}
      >
        <div className="">
          <div className="text-white xl:text-font-body md:text-font-body sm:text-font-body-sm">Hahoot</div>
          <div className="xl:text-font-title-card-quiz text-white xl:h-[160px] md:h-[130px] md:text-font-title-md sm:text-font-title-card-quiz ">
            {data?.question}
          </div>
          <div className="h-full">
            <img className="w-full xl:h-[240px] md:h-[160px] rounded-md" src={data?.questionPicture || hhHero} alt={data?.question} />
          </div>
        </div>
      </div>
      <Modal title="Are you ready" open={open}>
        <ReadyAlert onClose={() => setOpen(false)} onClickConfirm={onClickConfirm} />
      </Modal>
    </>

  );
}
