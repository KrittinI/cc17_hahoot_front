import Modal from "../components/Modal";
import FormAddQuestion from "../components/FormAddQuestion";
import Add from "../icons/add";
import { useState } from "react";

export default function AddQuestionCard({ setQuestions }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white h-64 overflow-hidden w-full rounded-xl shadow-lg">
        <div className="w-full h-64 flex justify-center items-center" role="button" onClick={() => setOpen(true)}>
          <Add />
        </div>
        <Modal open={open} onClose={() => setOpen(false)} title="Add your question">
          <FormAddQuestion onSuccess={() => setOpen(false)} setQuestions={setQuestions} />
        </Modal>
      </div>
    </>
  );
}
