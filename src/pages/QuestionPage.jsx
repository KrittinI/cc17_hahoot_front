import { useParams } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import QuestionForm from "../features/oneQuiz-Event/components/QuestionForm";
import CommentContainer from "../features/form/CommentContainer";
import questionApi from "../api/question";

export default function QuestionPage() {
  const { questionId } = useParams();
  const { getQuestionByQuestionId } = useQuestion();

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
        const res = await getQuestionByQuestionId(+questionId);
        setOneQuestion(res);
        setFavorite(Boolean(res.QuestionFavorite.length));
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)] overflow-hidden bg-black">
      <SplitScreen>
        <QuestionForm
          data={oneQuestion}
          id={+questionId}
          favorite={favorite}
          handleClickFavorite={handleClickFavorite}
        />
        <CommentContainer />
      </SplitScreen>
    </div>
  );
}
