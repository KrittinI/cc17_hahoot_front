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
import questionApi from "../api/question";

export default function EventPage() {
  const { eventId } = useParams();
  const { setPlayQuestion } = useQuestion();
  const { event, setEvent, setEventId, setEventQuestions, eventQuestions } = useEvent();
  const navigate = useNavigate();
  const [oneEvent, setOneEvent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState([]);
  const [files, setFiles] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [clickEdit, setClickEdit] = useState(true);

  const handleClickSinglePlay = () => {
    setPlayQuestion(questions);
    navigate("/quiz");
  };
  const handleClickCreateRoom = () => {
    setPlayQuestion(questions);
    setEventId(+eventId);
    navigate("/multiplayer");
  };
  const handleClickFavorite = async () => {
    try {
      const data = [...event];
      const foundData = data.find((el) => el.id === +eventId);
      const foundIndex = data.findIndex((el) => el.id === +eventId);
      if (favorite) {
        await eventApi.deleteFav(oneEvent?.id);
        const updateFoundData = { ...foundData, EventFavorites: [] };
        data.splice(foundIndex, 1, updateFoundData);
      } else {
        await eventApi.createFev(oneEvent?.id);
        const updateFoundData = { ...foundData, EventFavorites: [1] };
        data.splice(foundIndex, 1, updateFoundData);
      }
      setEvent(data);
      setFavorite((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvent = async () => {
    try {
      const res = await eventApi.getEventByEventId(+eventId);
      setOneEvent(res.data.event);
      // setEventQuestions(res.data.questions);
      setQuestions(res.data.questions);
      setFavorite(Boolean(res.data.event.EventFavorites?.length));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (eventQuestions.length === 0) return;
    const id = eventQuestions[eventQuestions.length - 1].questionId;
    // console.log(id);
    //fetch data for display
    const fetchQuestion = async () => {
      try {
        const res = await questionApi.getQuestionByQuestionId(+id);
        console.log(res.data.question);
        setNewQuestion((prev) => [...prev, res.data.question]);
        setFiles((prev) => [...prev, res.data.question.questionPicture]);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchQuestion();
  }, [eventQuestions.length]);
  console.log(eventQuestions, "eventQuestions");

  return (
    <div className="w-[66%] mx-auto h-[calc(100vh-164px)]">
      <SplitScreen sizeRatio={30}>
        <OneEventLeft
          event={oneEvent}
          favorite={favorite}
          handleClickFavorite={handleClickFavorite}
          handleClickSinglePlay={handleClickSinglePlay}
          handleClickCreateRoom={handleClickCreateRoom}
          setClickEdit={setClickEdit}
          edit={clickEdit}
          setNewQuestion={setNewQuestion}
          setFiles={setFiles}
          fetchEvent={fetchEvent}
          eventId={eventId}
        />
        <OneEventRight questions={questions} newQuestion={newQuestion} edit={clickEdit} setNewQuestion={setNewQuestion} clickEdit={clickEdit} />
      </SplitScreen>
    </div>
  );
}
