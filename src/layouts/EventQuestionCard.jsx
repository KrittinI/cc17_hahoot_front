import { useState } from "react";
import useEvent from "../hooks/useEvent";
import useQuestion from "../hooks/useQuestion";
import { useEffect } from "react";
import { HeartIcon } from "../icons/heart";
import Avatar from "../components/Avatar";
import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import Modal from "../components/Modal";
import QuestionIcon from "../icons/Question";
import Button from "../components/Button";
import AddEventQuestionForm from "../features/form/AddEventQuestionForm";

export default function EventQuestionCard({ index, question, setEventQuestion, eventQuestion, timeLimit, event }) {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const { getQuestionByQuestionId } = useQuestion();

  const findQuestion = async (id) => {
    try {
      const data = await getQuestionByQuestionId(id);
      setCurrentData(data);
      console.log(data, "data");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    findQuestion(question);
  }, [eventQuestion]);

  const handleDelete = (id) => {
    setEventQuestion((prev) => prev.filter((q, i) => i !== id));
    setIsDelete(false);
  };

  const handleEdit = (index, input) => {
    setEventQuestion((prev) => {
      const questions = [...prev];
      questions.splice(index, 1, input);
      return questions;
    });

    setOpen(false);
  };

  const onSuccess = (input) => {
    handleEdit(index, input);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white text-left inline-block cursor-pointer w-[190px] h-[240px] rounded-[8px] shadow-xl">
        <div className="w-full overflow-hidden rounded-t-xl relative">
          {currentData?.questionPicture && <img className="overflow-hidden object-cover aspect-[16/11] relative " src={currentData?.questionPicture} alt="photo" />}
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            <HeartIcon />
          </div>
        </div>

        <div className="px-2 py-3 w-full grid gap-y-6">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">{currentData?.question}</p>
          <div className="flex justify-between items-center">
            <Avatar />
            <div className="text-font-title-card text-blue">{currentData?.topic.topicName}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly w-[190px]">
        <span role="button" onClick={() => setIsDelete(true)} className="bg-white rounded-full flex justify-center items-center p-2 h-[40px] w-[40px] shadow-xl">
          <DeleteIcon />
        </span>
        <span role="button" onClick={() => setOpen(true)} className="bg-white rounded-full flex justify-center items-center p-2 h-[40px] w-[40px] shadow-xl">
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
      <Modal open={open} onClose={() => setOpen(false)} title="Edit your question">
        <AddEventQuestionForm question={question} onClose={() => setOpen(false)} onSuccess={onSuccess} index={index} event={event} data={currentData} timeLimit={timeLimit} />
      </Modal>
    </div>
  );
}
