import CardBoxInProfile from "../../../components/CardBoxInProfile";
import Cardcontainer from "../../../components/CardContainer";
import QuestionCard from "../../../layouts/QuestionCard";

export default function OneEventRight({ questions, newQuestion, setNewQuestion, setFiles, files }) {
  console.log(newQuestion, "newww");
  return (
    <div className="h-full">
      <Cardcontainer title={`Question in Events`}>
        {questions?.map((question) => (
          <CardBoxInProfile key={question.id} data={question} name={"questions"} />
        ))}
        {newQuestion?.map((quesion, index) => (
          <QuestionCard key={index} index={index} question={quesion} setQuestions={setNewQuestion} setFiles={setFiles} image={files[index]} />
        ))}
      </Cardcontainer>
    </div>
  );
}
