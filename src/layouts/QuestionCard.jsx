import { useState } from "react";
import FormAddQuestion from "../components/FormAddQuestion";
import Modal from "../components/Modal";
import useQuestion from "../hooks/useQuestion";
import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import questionApi from "../api/question";
import useAuth from "../hooks/useAuth";
import Fav from "../icons/Fav";

export default function QuestionCard({ question, image, index, creatorId, id }) {
  const { file, questions, setQuestions, setEdit } = useQuestion();
  const { authUser } = useAuth();
  // console.log(image, "imggg");
  // console.log(authUser);

  const [foundQuestion, setFoundQuestion] = useState({});

  const [editOpen, setEditOpen] = useState(false);

  // const handleDelete = async (id) => {
  //   // console.log(id, "card id");
  //   // const newArr = question.filter((el, elIndex) => elIndex !== id);
  //   // console.log(newArr, "i am new array");
  //   // setQuestion(newArr);
  //   // await questionApi.deleteQuestionById(id);
  //   // console.log("aha deleted");
  //   fetchQuestion();
  // };

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleEdit = (id) => {
    const foundQuestion = questions.find((el, index) => index === id);
    // console.log(foundQuestion);
    setFoundQuestion({ ...foundQuestion, index });
    // setOpen(true);
    setEditOpen(true);
    setEdit(true);
  };

  return (
    <>
      <div className="bg-white h-64 w-full overflow-scroll relative rounded-xl shadow-lg">
        <div className="w-full relative h-64">{image && <img className="object-cover aspect-[16/9] " src={URL.createObjectURL(image)} alt="รูป" />}</div>
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Fav />
        </div>

        <div className="px-3 py-1">
          <p>{question}</p>
        </div>

        {/* {authUser?.id === creatorId && ( */}
        <div className="flex justify-center gap-4">
          {/* <div role="button" onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </div> */}
          <div role="button" onClick={() => handleEdit(index)} className="absolute bottom-2">
            <EditIcon />
          </div>
        </div>
        {/* )} */}
      </div>

      {editOpen && (
        <Modal open={editOpen} onClose={handleClose} title="add your question222">
          <FormAddQuestion foundQuestion={foundQuestion} />
        </Modal>
      )}
    </>
  );
}

//กด เเล้ว เเสดง modal ที่ เเสดง ค่า ของของตัวนั้นๆ
