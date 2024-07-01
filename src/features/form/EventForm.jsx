import CardBoxInProfile from "../../components/CardBoxInProfile";
import CardContainer from "./CardContainer";
import image from "../../assets/c4.jpeg";
import useEvent from "../../hooks/useEvent";
import { useState } from "react";
import { useEffect } from "react";

export default function EventForm({ seeAll, search, title }) {
  const { event, eventTopic } = useEvent();
  const [showEvent, setShowEvent] = useState([]);

  useEffect(() => {
    if (seeAll) {
      if (search) {
        setShowEvent(
          event?.filter((el) => el.eventName.toLowerCase().includes(search))
        );
      } else {
        setShowEvent(event);
      }
    } else {
      if (search) {
        setShowEvent(
          eventTopic?.filter((el) =>
            el.eventName.toLowerCase().includes(search)
          )
        );
      } else {
        setShowEvent(eventTopic);
      }
    }
  }, [event, eventTopic, search, seeAll]);

  return (
    <div className="mb-7">
      <CardContainer title={title}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {showEvent?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.eventName}
              image={el?.eventImage || image}
              id={el?.id}
              name="events"
            />
          ))}
        </div>
      </CardContainer>
    </div>
  );
}
