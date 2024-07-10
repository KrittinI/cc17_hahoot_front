import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import OneQuestionLeft from "../features/questions/components/OneQuestionLeft";
import CommentContainer from "../features/form/CommentContainer";
import questionApi from "../api/question";
import useQuestion from "../hooks/useQuestion";
import Spinner from "../components/Spinner";

export default function QuestionPage() {
  const { questionId } = useParams();
  const { showQuestion, setShowQuestion } = useQuestion();
  const [oneQuestion, setOneQuestion] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickFavorite = async () => {
    try {
      const data = [...showQuestion];
      const foundData = data.find((el) => el.id === +questionId);
      const foundIndex = data.findIndex((el) => el.id === +questionId);
      if (favorite) {
        await questionApi.deleteFav(oneQuestion?.id);
        const updateFoundData = { ...foundData, QuestionFavorite: [] };
        data.splice(foundIndex, 1, updateFoundData);
      } else {
        await questionApi.createFav(oneQuestion?.id);
        const updateFoundData = { ...foundData, QuestionFavorite: [1] };
        data.splice(foundIndex, 1, updateFoundData);
      }
      setShowQuestion(data);
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
  }, [questionId, loading]);

  const onSuccess = async (input, file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("questionPicture", file);
      formData.append("questions", JSON.stringify(input));
      await questionApi.editQuestionById(questionId, formData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)] overflow-hidden bg-black">
      {loading && <Spinner transparent />}
      <SplitScreen>
        <OneQuestionLeft data={oneQuestion} id={+questionId} favorite={favorite} handleClickFavorite={handleClickFavorite} onSuccess={onSuccess} />
        <CommentContainer />
      </SplitScreen>
    </div>
  );
}
