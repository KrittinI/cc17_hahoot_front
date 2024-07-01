import { useState } from "react";
import SearchBar from "../components/SearchBar";
import EventForm from "../features/form/EventForm";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";

export default function AllEventPage() {
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("All Event");
  const { getEventByTopic } = useEvent();

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <EventForm seeAll={seeAll} search={search} title={title} />
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
