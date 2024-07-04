import { useState } from "react";
import FormAddQuestion from "../components/FormAddQuestion";
import Modal from "../components/Modal";
import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import Button from "../components/Button";

export default function QuestionCard({ question, image, index, setQuestions, setFiles }) {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = (id) => {
    setQuestions(prev => prev.filter((q, i) => i !== id))
    setFiles(prev => prev.filter((q, i) => i !== id))
    setIsDelete(false)
  }

  const handleEdit = (index, input, file) => {
    setQuestions(prev => {
      const questions = [...prev]
      questions.splice(index, 1, input)
      return questions
    })
    setFiles(prev => {
      const files = [...prev]
      files.splice(index, 1, file)
      return files
    })
    setOpen(false);
  };

  const onSuccess = (input, file) => {
    handleEdit(index, input, file)
  }


  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white h-64 w-full relative rounded-xl shadow-lg" >
        <div className="w-full overflow-hidden rounded-t-xl relative">{(image) && <img className="overflow-hidden object-cover aspect-[16/9] " src={URL.createObjectURL(image)} alt="รูป" />}</div>
        <div className="px-3 py-1">
          <p>{question?.question}</p>
        </div>
      </div>
      <div className="flex justify-evenly w-full">
        <span role="button" onClick={() => setIsDelete(true)} className="bg-white rounded-full flex justify-center items-center p-2 h-[40px] w-[40px]">
          <DeleteIcon />
        </span>
        <span role="button" onClick={() => setOpen(true)} className="bg-white rounded-full flex justify-center items-center p-2 h-[40px] w-[40px]">
          <EditIcon />
        </span>
      </div>
      <Modal open={isDelete} title={`Delete This Question?`}>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <h1>Delete</h1>
          <div className="w-full flex justify-around">
            <Button bg={`red`} width={20} onClick={() => handleDelete(index)}>Delete</Button>
            <Button bg={`black`} width={20} onClick={() => setIsDelete(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit your question">
        <FormAddQuestion question={question} onClose={() => setOpen(false)} onSuccess={onSuccess} image={image} />
      </Modal>

    </div>
  );
}

//กด เเล้ว เเสดง modal ที่ เเสดง ค่า ของของตัวนั้นๆ
