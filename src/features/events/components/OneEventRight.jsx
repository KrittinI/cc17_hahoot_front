import CardBoxInProfile from "../../../components/CardBoxInProfile";
import Cardcontainer from "../../../components/CardContainer";
import QuestionCard from "../../../layouts/QuestionCard";

export default function OneEventRight({ questions, newQuestion, setNewQuestion, clickEdit }) {
  console.log(newQuestion, "newww");
  return (
    <div className="h-full">
      <Cardcontainer title={`Question in Events`}>
        {questions?.map((question) => (
          <CardBoxInProfile key={question.id} data={question} name={"questions"} />
        ))}
        {!clickEdit
          ? newQuestion?.map((question, index) => <QuestionCard key={index} index={index} question={question} setQuestions={setNewQuestion} />)
          : newQuestion?.map((question, index) => <CardBoxInProfile key={index + 1000} data={question} name={"questions"} />)}
      </Cardcontainer>
    </div>
  );
}
