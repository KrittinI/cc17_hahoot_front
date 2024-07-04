import CardBoxInProfile from "../../../components/CardBoxInProfile";
import CardContainerInProfile from "../../form/CardContainerInProfile";

export default function UserEventAndQuizForm({
  setIsQuizForm,
  setIsEventForm,
  events,
  questions
}) {

  const handleClickEvent = () => {
    setIsEventForm(true);
  };

  const handleClickQuiz = () => {
    setIsQuizForm(true);
  };

  return (
    <div className="flex flex-col gap-7 ">
      <CardContainerInProfile
        style="flex"
        title="Events"
        showSeeAll
        onClick={handleClickEvent}
      >
        {events?.map((event) => (
          <CardBoxInProfile
            width={40}
            key={event.id}
            data={event}
            name="events"
          />
        ))}
      </CardContainerInProfile>
      <CardContainerInProfile
        style="flex"
        title="Quizzes"
        hight={30}
        showSeeAll
        onClick={handleClickQuiz}
      >
        {questions?.map((question) => (
          <CardBoxInProfile
            width={40}
            key={question.id}
            data={question}
            name="questions"
          />
        ))}
      </CardContainerInProfile>
    </div>
  );
}
