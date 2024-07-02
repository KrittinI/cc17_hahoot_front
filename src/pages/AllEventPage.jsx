import { useState } from "react";
import SearchBar from "../components/SearchBar";
import EventForm from "../features/form/EventForm";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";

export default function AllEventPage() {
  const [title, setTitle] = useState("All Event");
  const { getEventByTopic, setSeeAll, setSearch } = useEvent();

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <EventForm title={title} />
        <SearchBar
          buttonText={`Create New Event`}
          setSeeAll={setSeeAll}
          setSearch={setSearch}
          getTopic={getEventByTopic}
          setTitle={setTitle}
        />
      </SplitScreen>
    </div>
  );
}
