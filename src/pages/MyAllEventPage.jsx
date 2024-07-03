import QuizForm from "../features/form/QuizForm";
import ActiveMyQuizEvent from "../features/myQuiz-Event/components/ActiveMyQuizEvent";
import SplitScreen from "../layouts/SplitScreen";

export default function MyAllEventPage() {
  return (
      <div className="w-[66%] mx-auto h-[auto]">
        <SplitScreen sizeRatio={70}>
          <QuizForm title={"My Event"} />
          <ActiveMyQuizEvent />
        </SplitScreen>
      </div>
  );
}
