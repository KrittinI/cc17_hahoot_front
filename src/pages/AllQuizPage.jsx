import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";
import useQuestion from "../hooks/useQuestion";
import AllQuizzesLeft from "../features/questions/components/AllQuizzesLeft";

export default function AllQuizPage() {
  const [title, setTitle] = useState("All Quiz");
  const { getQuestionByTopicId, setSeeAll, setSearch } = useQuestion();

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <AllQuizzesLeft title={title} />
        <SearchBar
          buttonText={`Create New Question`}
          setSeeAll={setSeeAll}
          setSearch={setSearch}
          getTopic={getQuestionByTopicId}
          setTitle={setTitle}
          create={`/questions/create-question`}
        />
      </SplitScreen>
    </div>
  );
}
