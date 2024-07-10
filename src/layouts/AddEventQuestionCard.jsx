import { useState } from "react";
import Modal from "../components/Modal";
import AddEventQuestionForm from "../features/form/AddEventQuestionForm";
import Add from "../icons/add";

export default function AddEventQuestionCard({ event }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-grey relative flex text-left cursor-pointer w-[190px] h-[240px] rounded-[8px] shadow-xl">
        <div className="w-full flex justify-center items-center" role="button" onClick={() => setOpen(true)}>
          <Add />
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title={'Create Question'} j="start">
          <AddEventQuestionForm onClose={() => setOpen(false)} event={event} />
        </Modal>
      </div>
    </>
  );
}
