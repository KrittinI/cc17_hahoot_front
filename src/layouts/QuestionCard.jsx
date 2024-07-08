import { useState } from "react";
import FormAddQuestion from "../components/FormAddQuestion";
import Modal from "../components/Modal";
import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import QuestionIcon from "../icons/Question";

export default function QuestionCard({
  question,
  image,
  index,
  setQuestions,
  setFiles,
}) {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q, i) => i !== id));
    setFiles((prev) => prev.filter((q, i) => i !== id));
    setIsDelete(false);
  };

  const handleEdit = (index, input, file) => {
    setQuestions((prev) => {
      const questions = [...prev];
      questions.splice(index, 1, input);
      return questions;
    });
    setFiles((prev) => {
      const files = [...prev];
      files.splice(index, 1, file);
      return files;
    });
    setOpen(false);
  };

  const onSuccess = (input, file) => {
    handleEdit(index, input, file);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white text-left inline-block cursor-pointer w-[190px] h-[240px] rounded-[8px] shadow-xl">
        <div className="w-full overflow-hidden rounded-t-xl relative">
          {image && (
            <img
              className="overflow-hidden object-cover aspect-[16/11] relative "
              src={URL.createObjectURL(image)}
              alt="photo"
            />
          )}
        </div>

        <div className="px-2 py-3 w-full grid gap-y-6">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {question?.question}
          </p>
          <div className="flex justify-between items-center">
            <Avatar />
            <div className="text-font-title-card text-blue">Mathematis</div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly w-[190px]">
        <span
          role="button"
          onClick={() => setIsDelete(true)}
          className="bg-white rounded-full flex justify-center items-center p-2 h-[40px] w-[40px] shadow-xl"
        >
          <DeleteIcon />
        </span>
        <span
          role="button"
          onClick={() => setOpen(true)}
          className="bg-white rounded-full flex justify-center items-center p-2 h-[40px] w-[40px] shadow-xl"
        >
          <EditIcon />
        </span>
      </div>
      <Modal open={isDelete}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div className=" text-font-title">Are you sure to delete</div>
          <div className=" text-font-title"> this quiz</div>
          <div>
            <QuestionIcon />
          </div>
          <div className="w-full flex justify-around pt-6">
            <Button bg={`red`} width={20} onClick={() => handleDelete(index)}>
              Delete
            </Button>
            <Button bg={`black`} width={20} onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit your question"
      >
        <FormAddQuestion
          question={question}
          onClose={() => setOpen(false)}
          onSuccess={onSuccess}
          image={image}
        />
      </Modal>
    </div>
  );
}

//กด เเล้ว เเสดง modal ที่ เเสดง ค่า ของของตัวนั้นๆ
