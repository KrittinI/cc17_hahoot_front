import CardBoxInProfile from "../../../components/CardBoxInProfile";
import Cardcontainer from "../../../components/CardContainer";

export default function OneEventRight({ questions }) {
  return (
    <div className="h-full">
      <Cardcontainer title={`Question in Events`}>
        {questions?.map((question) => (
          <CardBoxInProfile
            key={question.id}
            data={question}
            name={"questions"}
          />
        ))}
      </Cardcontainer>
    </div>
  );
}
