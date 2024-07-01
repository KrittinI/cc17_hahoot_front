import { useState } from "react";
import SearchBar from "../components/SearchBar";
import QuizForm from "../features/form/QuizForm";
import SplitScreen from "../layouts/SplitScreen";
import useQuestion from "../hooks/useQuestion";

export default function AllQuizPage() {
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("All Quiz");
  const { getQuestionByTopicId } = useQuestion();

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <QuizForm seeAll={seeAll} search={search} title={title} />
        <SearchBar
          buttonText={`Create New Question`}
          setSeeAll={setSeeAll}
          setSearch={setSearch}
          getTopic={getQuestionByTopicId}
          setTitle={setTitle}
        />
      </SplitScreen>
    </div>
  );
}
