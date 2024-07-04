import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import OneEventLeft from "../features/events/components/OneEventLeft";
import OneEventRight from "../features/events/components/OneEventRight";
import eventApi from "../api/event";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventApi.getEventByEventId(+eventId)
        setEvent(res.data.event);
        setQuestions(res.data.questions)
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [eventId]);

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)]">
      <SplitScreen sizeRatio={30}>
        <OneEventLeft event={event} />
        <OneEventRight questions={questions} />
      </SplitScreen>
    </div>
  );
}
