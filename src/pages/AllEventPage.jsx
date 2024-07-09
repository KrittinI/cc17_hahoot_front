import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";
import AllEventsLeft from "../features/events/components/AllEventsLeft";
import { useEffect } from "react";

export default function AllEventPage() {
  const [title, setTitle] = useState("All Events");
  const [seeAll, setSeeAll] = useState(true);
  const [search, setSearch] = useState("");
  const [topicId, setTopicId] = useState("");
  const [showEvent, setShowEvent] = useState([]);
  const { getEventByTopic, event } = useEvent();

  useEffect(() => {
    const isSeeAll = async () => {
      if (seeAll) {
        if (search) {
          setShowEvent(event?.filter((el) => el.eventName.toLowerCase().includes(search)));
        } else {
          setShowEvent(event);
        }
      } else {
        const eventTopic = (await getEventByTopic(topicId)).data.events;
        if (search) {
          setShowEvent(eventTopic?.filter((el) => el.eventName.toLowerCase().includes(search)));
        } else {
          setShowEvent(eventTopic);
        }
      }
    };
    isSeeAll();
  }, [seeAll, event, search, topicId]);

  console.log(showEvent, "showEvent");

  return (
    <div className="w-[68%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={70}>
        <AllEventsLeft title={title} data={showEvent} />
        <SearchBar buttonText={`Create New Event`} setSeeAll={setSeeAll} setSearch={setSearch} topicId={setTopicId} setTitle={setTitle} create={`/events/create-event`} />
      </SplitScreen>
    </div>
  );
}

//กด button link ไปหน้า quiz
