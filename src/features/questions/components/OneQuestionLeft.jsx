import { useNavigate } from "react-router-dom";
import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";
import LeftArrowIcon from "../../../icons/left-arrow";
import RightArrowIcon from "../../../icons/right-arrow";
import useQuestion from "../../../hooks/useQuestion";
import Avatar from "../../../components/Avatar";
import { HeartIcon, HeartIconUnfav } from "../../../icons/heart";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Modal from "../../../components/Modal";
import FormAddQuestion from "../../../components/FormAddQuestion";
import QuestionIcon from "../../../icons/Question";
import Button from "../../../components/Button";
import questionApi from "../../../api/question";

export default function OneQuestionRight({ data, id, favorite, handleClickFavorite, onSuccess }) {
  const navigate = useNavigate();
  const { showQuestion } = useQuestion();
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const isDisabled = data?.assignOfBridges?.length !== 0;

  const index = showQuestion.findIndex((el) => el.id === id);

  const handleClickNext = () => {
    if (showQuestion[showQuestion.length - 1].id === id) {
      navigate(`/questions/${showQuestion[0].id}`);
    } else {
      navigate(`/questions/${showQuestion[index + 1].id}`);
    }
  };
  const handleClickPrevious = () => {
    if (id === showQuestion[0].id) {
      navigate(`/questions/${showQuestion[showQuestion.length - 1].id}`);
    } else navigate(`/questions/${showQuestion[index - 1].id}`);
  };

  const handleClickDelete = async (questionId) => {
    try {
      await questionApi.deleteQuestionById(questionId);
      setIsDelete(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={`bg-white flex flex-col p-6 shadow-xl rounded-lg gap-8`}>
      <div className="flex justify-between items-center">
        <div className="text-center text-font-title-card w-full">{data?.question}</div>
      </div>
      <hr className="shadow-2 w-full" />
      <div className="grid grid-cols-10 gap-4">
        <div className="flex justify-center items-center self-center bg-yellow w-full aspect-[1/1] rounded-full col-span-1 invisiable hover:bg-grey" role="button" onClick={handleClickPrevious}>
          <LeftArrowIcon />
        </div>
        <div className="h-[450px] flex flex-col col-span-8 justify-center items-center gap-2">
          <div className="bg-gray-300 p-2 w-full h-[80%] flex justify-center items-center">
            <img className="rounded-lg w-auto h-auto max-h-[100%] max-w-[100%]" src={data?.questionPicture || image} alt="questionPicture" />
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <div className={`flex justify-start items-center p-4 w-full  ${data?.answer === "A" ? "bg-green" : "bg-red"} shadow-xl rounded-lg `}>{data?.choice1}</div>
            <div className={`flex justify-start items-center p-4 w-full  ${data?.answer === "B" ? "bg-green" : "bg-red"} shadow-xl rounded-lg `}>{data?.choice2}</div>
            {data?.choice3 && <div className={`flex justify-start items-center p-4 w-full  ${data?.answer === "C" ? "bg-green" : "bg-red"} shadow-xl rounded-lg `}>{data?.choice3}</div>}
            {data?.choice4 && <div className={`flex justify-start items-center p-4 w-full  ${data?.answer === "D" ? "bg-green" : "bg-red"} shadow-xl rounded-lg `}>{data?.choice4}</div>}
          </div>
        </div>
        <div className="flex justify-center items-center col-span-1 self-center bg-red w-full aspect-[1/1] rounded-full invisiable hover:bg-grey" role="button" onClick={handleClickNext}>
          <RightArrowIcon />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4 text-font-title-card">
          <div className="flex gap-2 items-center" role="button" onClick={() => navigate(`/users/${data?.user.id}`)}>
            <Avatar src={data?.user?.googleImage || data?.user?.profileImage} />
            <div>{data?.user?.username}</div>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div role="button" className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey" onClick={handleClickFavorite}>
            {favorite ? <HeartIcon /> : <HeartIconUnfav />}
          </div>
          {data?.creatorId === authUser?.id ? (
            <>
              {isDisabled ? (
                <div className="flex justify-center items-center w-12 h-12 shadow rounded-full bg-grey disabled">
                  <EditIcon />
                </div>
              ) : (
                <div role="button" className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey" onClick={() => setOpen(true)}>
                  <EditIcon />
                </div>
              )}
              <Modal open={open} onClose={() => setOpen(false)} title={`Edit Your Question`}>
                <FormAddQuestion onSuccess={onSuccess} data={data} onClose={() => setOpen(false)} setOpen={setOpen} />
              </Modal>

              {isDisabled ? (
                <div className="flex justify-center items-center w-12 h-12 shadow rounded-full bg-grey disabled">
                  <DeleteIcon />
                </div>
              ) : (
                <div role="button" className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey" onClick={() => setIsDelete(true)}>
                  <DeleteIcon />
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
      <Modal open={isDelete}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div className=" text-font-title">Are you sure to Delete</div>
          <div className=" text-font-title"> this Question</div>
          <div>
            <QuestionIcon />
          </div>
          <div className="w-full flex justify-around pt-6">
            <Button bg={`red`} width={20} onClick={() => handleClickDelete(data?.id)}>
              Delete
            </Button>
            <Button bg={`black`} width={20} onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
