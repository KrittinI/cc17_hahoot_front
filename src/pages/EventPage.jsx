import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import useEvent from "../hooks/useEvent";
import EventForm from "../features/oneQuiz-Event/components/EventForm";
import QuizForm from "../features/form/QuizForm";

export default function EventPage() {
  const { eventId } = useParams();
  const [oneEvent, setOneEvent] = useState([]);
  const { getEvent } = useEvent();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEvent(+eventId);
        setOneEvent(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [eventId]);

  console.log(oneEvent);

  return (
    <div className="w-[66%] mx-auto h-[auto]">
      <SplitScreen sizeRatio={30}>
        <EventForm data={oneEvent} id={+eventId} />
        <QuizForm title={"Quizs of Event"} />
      </SplitScreen>
    </div>
  );
}
