import { useNavigate } from "react-router-dom";
import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";
import LeftArrowIcon from "../../../icons/left-arrow";
import RightArrowIcon from "../../../icons/right-arrow";

export default function QuestionForm({ data, question, id }) {
  const navigate = useNavigate();

  const handleClickNext = () => {
    if (question.length === id) {
      navigate(`/questions/${1}`);
    } else navigate(`/questions/${id + 1}`);
  };
  const handleClickPrevious = () => {
    if (id === 1) {
      console.log(question.length);
      navigate(`/questions/${question.length}`);
    } else navigate(`/questions/${id - 1}`);
  };
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
