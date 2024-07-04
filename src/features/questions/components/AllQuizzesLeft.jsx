import CardBoxInProfile from "../../../components/CardBoxInProfile";
import useQuestion from "../../../hooks/useQuestion";
import Cardcontainer from "../../../components/CardContainer";

export default function AllQuizForm({ title }) {
  const { showQuestion } = useQuestion();

  return (
    <div className="mb-7">
      <Cardcontainer title={title}>
        {showQuestion?.map((question) => (
          <CardBoxInProfile
            key={question.id}
            data={question}
            name="questions"
          />
        ))}
      </Cardcontainer>
    </div>
  );
}
