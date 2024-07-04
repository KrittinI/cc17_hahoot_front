import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";
import AllEventForm from "../features/form/AllEventForm";

export default function AllEventPage() {
  const [title, setTitle] = useState("All Event");
  const { getEventByTopic, setSeeAll, setSearch } = useEvent();

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <AllEventForm title={title} />
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
