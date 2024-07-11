import useEvent from "../../../hooks/useEvent";
import AddEventQuestionCard from "../../../layouts/AddEventQuestionCard";
import EventQuestionCard from "../../../layouts/EventQuestionCard";

export default function CreateEventRight({ event }) {
  const { eventQuestions, setEventQuestions } = useEvent();
  return (
    <div className="bg-white w-full flex flex-col gap-4 h-[calc(100%-40px)] rounded-xl p-4">
      <div className="w-full overflow-auto max-h-[100%]">
        <div className="grid grid-cols-4 gap-4 w-full">
          <AddEventQuestionCard event={event} />
          {eventQuestions?.map((question, index) => (
            <EventQuestionCard
              key={index}
              index={index}
              question={question?.questionId}
              setEventQuestions={setEventQuestions}
              timeLimit={question?.timeLimit}
              event={event}
              eventQuestions={eventQuestions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

//AddQuestionCard =>>> AddEventQuestion ,Question =>>> EventQuestion.jsx
