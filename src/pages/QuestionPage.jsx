import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import OneQuestionLeft from "../features/questions/components/OneQuestionLeft";
import CommentContainer from "../features/form/CommentContainer";
import questionApi from "../api/question";

export default function QuestionPage() {
  const { questionId } = useParams();
  const [oneQuestion, setOneQuestion] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const handleClickFavorite = async () => {
    try {
      if (favorite) {
        await questionApi.deleteFav(oneQuestion?.id);
      } else {
        await questionApi.createFav(oneQuestion?.id);
      }
      setFavorite((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await questionApi.getQuestionByQuestionId(+questionId);
        setOneQuestion(res.data.question);
        setFavorite(Boolean(res.data.question.QuestionFavorite?.length));
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  const onSuccess = async (input, file) => {
    try {
      const formData = new FormData();
      formData.append("questionPicture", file);
      formData.append("questions", JSON.stringify(input));
      await questionApi.editQuestionById(questionId, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)] overflow-hidden bg-black">
      <SplitScreen>
        <OneQuestionLeft
          data={oneQuestion}
          id={+questionId}
          favorite={favorite}
          handleClickFavorite={handleClickFavorite}
          onSuccess={onSuccess}
        />
        <CommentContainer />
      </SplitScreen>
    </div>
  );
}
