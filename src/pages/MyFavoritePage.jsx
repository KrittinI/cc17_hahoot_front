import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";
import SearchFavorite from "../features/myQuiz-Event/components/SearchFavorite";
import QuizForm from "../features/userProfile/components/QuizForm";

export default function MyFavoritePage() {
  const [title, setTitle] = useState("All Event");
  const { getEventByTopic, setSeeAll, setSearch } = useEvent();
  return (
    <div>
      <div className="w-[66%] mx-auto h-[auto]">
        <SplitScreen sizeRatio={70}>
          <QuizForm title={"My Favorite"} />
          <SearchFavorite
            setSeeAll={setSeeAll}
            setSearch={setSearch}
            getTopic={getEventByTopic}
            setTitle={setTitle}
          />
        </SplitScreen>
      </div>
    </div>
  );
}
