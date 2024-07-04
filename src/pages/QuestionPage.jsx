import { useParams } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import QuestionForm from "../features/oneQuiz-Event/components/QuestionForm";
import CommentContainer from "../features/form/CommentContainer";

export default function QuestionPage() {
  const { questionId } = useParams();
  const [oneQuestion, setOneQuestion] = useState(null);
  const { getQuestionByQuestionId } = useQuestion();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestionByQuestionId(+questionId);
        setOneQuestion(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)] bg-black">
      <SplitScreen >
        <QuestionForm data={oneQuestion} id={+questionId} />
        <CommentContainer />
      </SplitScreen>
    </div>
  );
}
