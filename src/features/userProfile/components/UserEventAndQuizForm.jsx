/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import BoxContain from "../../../components/BoxContain";
import CardBoxInProfile from "../../../components/CardBoxInProfile";
import { useEffect } from "react";
import useQuestion from "../../../hooks/useQuestion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useEvent from "../../../hooks/useEvent";

export default function UserEventAndQuizForm() {
  const { getQuestionByUserId } = useQuestion();
  const { getEventByUserId } = useEvent();
  const [question, setQuestion] = useState(null);
  const [event, setEvent] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchAllQuestion = async () => {
    const res = await getQuestionByUserId(userId);
    setQuestion(res);
  };

  console.log("question", question);

  const fetchAllEvent = async () => {
    const res = await getEventByUserId(userId);
    setEvent(res);
  };

  useEffect(() => {
    fetchAllQuestion();
    fetchAllEvent();
  }, [fetchAllEvent, fetchAllQuestion]);

  console.log("event", event);

  return (
    <div className="flex flex-col gap-6 ">
      <BoxContain title="My Event" hight={30} onClick={() => navigate("/")}>
        <div className="flex justify-center gap-6 h-52 flex-wrap my-4">
          <CardBoxInProfile />
          <CardBoxInProfile />
          <CardBoxInProfile />
          <CardBoxInProfile />
        </div>
      </BoxContain>
      <BoxContain
        title="My Quiz"
        hight={30}
        onClick={() => navigate("/")}
      ></BoxContain>
    </div>
  );
}
