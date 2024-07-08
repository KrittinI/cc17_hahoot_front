import CardBoxInProfile from "../../../components/CardBoxInProfile";
import CardContainerInProfile from "../../form/CardContainerInProfile";

export default function QuizForm({ title, setSeeAll, questions }) {
  const handleClick = () => {
    setSeeAll((pre) => !pre);
  };
  return (
    <CardContainerInProfile title={title} onClick={handleClick}>
      {questions?.map((question) => (
        <CardBoxInProfile
          key={question.id}
          data={question}
          name="questions"
        />
      ))}
    </CardContainerInProfile>
  );
}
