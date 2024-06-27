/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import BoxContain from "../../../components/BoxContain";
import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";

const eventData = [
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
];
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
    <div className="flex flex-col gap-7 ">
      <BoxContain title="My Event" onClick={() => navigate("/")}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {eventData.map((eventData, index) => (
            <CardBoxInProfile
              key={index}
              title={eventData.title}
              image={image}
            />
          ))}
        </div>
      </BoxContain>
      <BoxContain title="My Quiz" hight={30} onClick={() => navigate("/")}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {eventData.map((eventData, index) => (
            <CardBoxInProfile
              key={index}
              title={eventData.title}
              image={image}
            />
          ))}
        </div>
      </BoxContain>
    </div>
  );
}
