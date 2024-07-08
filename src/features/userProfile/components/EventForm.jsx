import CardBoxInProfile from "../../../components/CardBoxInProfile";
import CardContainerInProfile from "../../form/CardContainerInProfile";

export default function EventForm({ title, setSeeAll, events }) {

  const handleClick = () => {
    setSeeAll((pre) => !pre);
  };

  return (
    <CardContainerInProfile title={title} onClick={handleClick}>
      {events?.map((event) => (
        <CardBoxInProfile
          key={event.id}
          data={event}
          name="events"
        />
      ))}
    </CardContainerInProfile>
  );
}
