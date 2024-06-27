/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import BoxContain from "../../../components/BoxContain";
import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
import useUser from "../../../hooks/useUser";

export default function UserEventAndQuizForm() {
  const { question, event } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 ">
      <BoxContain title="My Event" onClick={() => navigate("/")}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {event?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.eventName}
              image={el?.eventImage}
            />
          ))}
        </div>
      </BoxContain>
      <BoxContain title="My Quiz" hight={30} onClick={() => navigate("/")}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {question.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.question}
              image={el?.questionImage || image}
            />
          ))}
        </div>
      </BoxContain>
    </div>
  );
}
