import SearchBar from "../components/SearchBar";
import QuizForm from "../features/visitor/QuizForm";
import SplitScreen from "../layouts/SplitScreen";

export default function AllQuizPage() {
  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <QuizForm />
        <SearchBar buttonText={`Create New Question`} />
      </SplitScreen>
    </div>
  );
}
