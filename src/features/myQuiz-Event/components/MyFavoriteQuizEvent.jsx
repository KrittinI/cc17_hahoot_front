import CardBoxInProfile from "../../../components/CardBoxInProfile";
import Cardcontainer from "../../../components/CardContainer";

export default function MyFavoriteQuizEvent({ title, showCard }) {
  console.log("showCard", showCard);
  return (
    <div className="h-full">
      <Cardcontainer title={title}>
        {showCard?.map((el, index) => (
          <CardBoxInProfile
            key={index}
            data={el}
            name={el.eventName ? "events" : "questions"}
            type
          />
        ))}
      </Cardcontainer>
    </div>
  );
}
