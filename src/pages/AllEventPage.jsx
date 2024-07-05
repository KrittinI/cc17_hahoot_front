import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";
import AllEventsLeft from "../features/events/components/AllEventsLeft";

export default function AllEventPage() {
  const [title, setTitle] = useState("All Events");
  const { getEventByTopic, setSeeAll, setSearch } = useEvent();

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <AllEventsLeft title={title} />
        <SearchBar
          buttonText={`Create New Event`}
          setSeeAll={setSeeAll}
          setSearch={setSearch}
          getTopic={getEventByTopic}
          setTitle={setTitle}
          create={`/events/create-event`}
        />
      </SplitScreen>
    </div>
  );
}

//กด button link ไปหน้า quiz
