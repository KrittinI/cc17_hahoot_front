import { useNavigate } from "react-router-dom";
import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";
import LeftArrowIcon from "../../../icons/left-arrow";
import RightArrowIcon from "../../../icons/right-arrow";
import useQuestion from "../../../hooks/useQuestion";
import { useEffect } from "react";
import Avatar from "../../../components/Avatar";
import { HeartIcon } from "../../../icons/heart";

export default function QuestionForm({ data, id }) {
  const navigate = useNavigate();
  const { showQuestion } = useQuestion();
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

  useEffect(() => {
    if (showQuestion.length === 0) {
      navigate(`/questions/`);
    }
  }, [showQuestion]);

  return (
    <div
      className={`bg-white flex flex-col p-6 shadow-xl rounded-lg h-[calc(100vh})]`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-center mb-2 text-font-title">
          Quiz : {data?.id}
        </div>
      </div>
      <hr className="shadow-2 w-full" />
      <div className="grid gap-4 mt-8">
        <div className="bg-white p-3 shadow rounded-lg text-center text-font-title-card">
          {data?.question}
        </div>
        <div className="flex justify-around items-center">
          <div
            className="flex justify-center items-center bg-yellow w-[60px] h-[60px] rounded-full invisiable hover:bg-grey"
            role="button"
            onClick={handleClickPrevious}
          >
            <LeftArrowIcon />
          </div>
          <div className="max-w-[240px] h-[300px] flex justify-center items-center gap-x-2">
            <img
              className="rounded-lg max-h-[180px]"
              src={data?.questionPicture || image}
              alt="questionPicture"
            />
            <div className="grid gap-y-2">
              <div className="flex justify-start items-center p-4 w-[250px] h-[30px] bg-green shadow-xl rounded-lg ">answer</div>
              <div className="flex justify-start items-center p-4 w-[250px] h-[30px] bg-blue shadow-xl rounded-lg ">answer</div>
              <div className="flex justify-start items-center p-4 w-[250px] h-[30px] bg-blue shadow-xl rounded-lg ">answer</div>
              <div className="flex justify-start items-center p-4 w-[250px] h-[30px] bg-blue shadow-xl rounded-lg ">answer</div>
            </div>
          </div>
          <div
            className="flex justify-center items-center bg-red w-[60px] h-[60px] rounded-full invisiable hover:bg-grey"
            role="button"
            onClick={handleClickNext}
          >
            <RightArrowIcon />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4 text-font-title-card">
            <div>
              <Avatar />
            </div>
            <div>Username</div>
          </div>
          <div className="flex gap-x-6">
            <div
              role="button"
              className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
            >
              <HeartIcon />
            </div>
            <div
              role="button"
              className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
            >
              <EditIcon />
            </div>
            <div
              role="button"
              className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
