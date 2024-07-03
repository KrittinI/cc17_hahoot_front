import QuizForm from "../features/form/QuizForm";
import ActiveMyQuizEvent from "../features/myQuiz-Event/components/ActiveMyQuizEvent";
import SplitScreen from "../layouts/SplitScreen";

export default function MyAllQuizPage() {
  return (
    <div className="w-[66%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <QuizForm title={"My Quizs"} />
        <ActiveMyQuizEvent />
      </SplitScreen>
    </div>
  );
}
