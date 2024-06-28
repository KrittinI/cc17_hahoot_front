/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
import useUser from "../../../hooks/useUser";
import Cardcontainer from "../../form/CardContainer"

export default function UserEventAndQuizForm() {
  const { profile, question, event } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 ">
      <Cardcontainer title="My Event" showSeeAll onClick={() => navigate(`/events/${profile?.id}`)}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {event?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.eventName}
              image={el?.eventImage}
            />
          ))}
        </div>
      </Cardcontainer>
      <Cardcontainer title="My Quiz" hight={30} showSeeAll onClick={() => navigate(`/questions/${profile?.id}`)}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {question?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.question}
              image={el?.questionImage || image}
            />
          ))}
        </div>
      </Cardcontainer>
    </div>
  );
}
