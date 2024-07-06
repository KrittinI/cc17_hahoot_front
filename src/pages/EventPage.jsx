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
  const [favorite, setFavorite] = useState(false);
  const [clickEdit, setClickEdit] = useState(true);

  const handleClickFavorite = async () => {
    try {
      if (favorite) {
        await eventApi.deleteFav(event?.id);
      } else {
        await eventApi.createFev(event?.id);
      }
      setFavorite((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventApi.getEventByEventId(+eventId);
        setEvent(res.data.event);
        setQuestions(res.data.questions);
        setFavorite(Boolean(res.data.event.EventFavorites?.length));
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [eventId]);

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)]">
      <SplitScreen sizeRatio={30}>
        <OneEventLeft
          event={event}
          favorite={favorite}
          handleClickFavorite={handleClickFavorite}
          setClickEdit={setClickEdit}
          edit={clickEdit}
        />
        <OneEventRight questions={questions} edit={clickEdit} />
      </SplitScreen>
    </div>
  );
}
