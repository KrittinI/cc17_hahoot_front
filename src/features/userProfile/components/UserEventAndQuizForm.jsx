/* eslint-disable react-hooks/exhaustive-deps */

import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
import useUser from "../../../hooks/useUser";
import CardContainerInProfile from "../../form/CardContainerInProfile";

export default function UserEventAndQuizForm({
  setIsQuizForm,
  setIsEventForm,
  setSeeAllProfileData,
}) {
  const { question, event } = useUser();

  const handleClickEvent = () => {
    setIsEventForm(true);
    setSeeAllProfileData(true);
  };

  const handleClickQuiz = () => {
    setIsQuizForm(true);
    setSeeAllProfileData(true);
  };

  return (
    <div className="flex flex-col gap-7 ">
      <CardContainerInProfile
        title="My Event"
        showSeeAll
        onClick={handleClickEvent}
      >
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto ">
          {event?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.eventName}
              image={el?.eventImage || image}
              id={el?.id}
              name="events"
            />
          ))}
        </div>
      </CardContainerInProfile>
      <CardContainerInProfile
        title="My Quiz"
        hight={30}
        showSeeAll
        onClick={handleClickQuiz}
      >
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {question?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.question}
              image={el?.questionImage || image}
              id={el?.id}
              name="questions"
            />
          ))}
        </div>
      </CardContainerInProfile>
    </div>
  );
}
