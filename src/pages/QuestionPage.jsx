import { useParams } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import QuestionForm from "../features/question/components/QuestionForm";

export default function QuestionPage() {
  const { questionId } = useParams();
  const [oneQuestion, setOneQuestion] = useState(null);
  const { getQuestionByQuestionId, question } = useQuestion();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await getQuestionByQuestionId(+questionId);
        // console.log(res);
        setOneQuestion(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, [questionId]);

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={30}>
        <QuestionForm data={oneQuestion} question={question} id={+questionId} />
        <div>left</div>
      </SplitScreen>
    </div>
  );
}
