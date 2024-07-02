import { useNavigate } from "react-router-dom";
import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";
import LeftArrowIcon from "../../../icons/left-arrow";
import RightArrowIcon from "../../../icons/right-arrow";
import useQuestion from "../../../hooks/useQuestion";
import { useEffect } from "react";

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
    <div className="flex flex-col h-[auto] gap-8 rounded-lg mb-6">
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 ">
        <img src={data?.questionPicture || image} alt="questionPicture" />
        <div className="bg-white p-3">{data?.question}</div>
        <div className="bg-white p-3 flex justify-center items-center h-[15vh]">
          {data?.description || "Description"}
        </div>
        <div className="flex gap-4">
          <div
            role="button"
            className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-md hover:bg-grey"
          >
            <EditIcon />
          </div>
          <div
            role="button"
            className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-md hover:bg-grey"
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-around items-center my-4">
          <div
            className="flex justify-center items-center bg-yellow w-[80px] h-[80px] rounded-full invisiable"
            role="button"
            onClick={handleClickPrevious}
          >
            <LeftArrowIcon />
          </div>
          <div
            className="flex justify-center items-center bg-red w-[80px] h-[80px] rounded-full invisiable"
            role="button"
            onClick={handleClickNext}
          >
            <RightArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
