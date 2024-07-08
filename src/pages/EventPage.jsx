import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import SplitScreen from "../layouts/SplitScreen";
import OneEventLeft from "../features/events/components/OneEventLeft";
import OneEventRight from "../features/events/components/OneEventRight";
import eventApi from "../api/event";
import useQuestion from "../hooks/useQuestion";
import { useNavigate } from "react-router-dom";
import useEvent from "../hooks/useEvent";

export default function EventPage() {
  const { eventId } = useParams();
  const { setPlayQuestion } = useQuestion([])
  const { event, setEvent } = useEvent()
  const navigate = useNavigate()
  const [oneEvent, setOneEvent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState([]);
  const [files, setFiles] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [clickEdit, setClickEdit] = useState(true);

  const handleClickSinglePlay = () => {
    setPlayQuestion(questions)
    navigate("/quiz")
  }
  const handleClickFavorite = async () => {
    try {
      if (favorite) {
        await eventApi.deleteFav(oneEvent?.id);
      } else {
        await eventApi.createFev(oneEvent?.id);
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
        setOneEvent(res.data.event);
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
          event={oneEvent}
          favorite={favorite}
          handleClickFavorite={handleClickFavorite}
          handleClickSinglePlay={handleClickSinglePlay}
          setClickEdit={setClickEdit}
          edit={clickEdit}
          setNewQuestion={setNewQuestion}
          setFiles={setFiles}
        />
        <OneEventRight
          questions={questions}
          newQuestion={newQuestion}
          edit={clickEdit}
          setNewQuestion={setNewQuestion}
          setFiles={setFiles}
          files={files}
        />
      </SplitScreen>
    </div>
  );
}
