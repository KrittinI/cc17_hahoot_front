import { useState } from "react";
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
import c4 from "../assets/c4.jpeg";

export default function EventQuestionCard({ index, question, setEventQuestions, eventQuestions, timeLimit, event }) {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  console.log(currentData);
  const { getQuestionByQuestionId } = useQuestion();

  const findQuestion = async (id) => {
    try {
      const data = await getQuestionByQuestionId(id);
      setCurrentData(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    findQuestion(question);
  }, [eventQuestions]);

  const handleDelete = (id) => {
    setEventQuestions((prev) => prev.filter((q, i) => i !== id));
    setIsDelete(false);
  };

  const handleEdit = (index, input) => {
    setEventQuestions((prev) => {
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
      <div className="bg-white text-left inline-block w-[190px] h-[240px] rounded-[8px] shadow-xl">
        <div className="w-full overflow-hidden rounded-t-xl relative">
          <img className="overflow-hidden object-cover aspect-[16/11] relative " src={currentData?.questionPicture || c4} alt="photo" />
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            <HeartIcon />
          </div>
        </div>

        <div className="px-2 py-3 w-full grid gap-y-6">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">{currentData?.question}</p>
          <div className="flex justify-start items-center text-blue gap-2">
            <Avatar src={currentData?.user?.profileImage} />
            <div className="text-font-title-card text-blue">{currentData?.user?.username}</div>
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
      <Modal open={isDelete} title={`Are you sure to delete this quiz`} width={20}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div>
            <QuestionIcon />
          </div>
          <div className="w-full flex justify-around pt-6 gap-4">
            <Button bg={`black`} width={40} onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
            <Button bg={`blue`} width={40} onClick={() => handleDelete(index)}>
              Delete
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
