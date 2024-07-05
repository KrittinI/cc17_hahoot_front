import Modal from "../components/Modal";
import FormAddQuestion from "../components/FormAddQuestion";
import Add from "../icons/add";
import { useState } from "react";

export default function AddQuestionCard({ setQuestions, setFiles }) {
  const [open, setOpen] = useState(false);

  const onSuccess = (input, file) => {
    setQuestions(prev => [...prev, input])
    if (file) {
      setFiles(prev => [...prev, file])
    } else {
      setFiles(prev => [...prev, null])
    }
    // setOpen(false)
  }

  return (
    <>
      <div className="bg-grey relative text-left inline-block cursor-pointer w-[190px] h-[240px] rounded-[8px] shadow-xl">
        <div className="w-full h-64 flex justify-center items-center" role="button" onClick={() => setOpen(true)}>
          <Add />
        </div>
        <Modal open={open} onClose={() => setOpen(false)} >
          <FormAddQuestion onSuccess={onSuccess} onClose={() => setOpen(false)} />
        </Modal>
      </div>
    </>
  );
}
