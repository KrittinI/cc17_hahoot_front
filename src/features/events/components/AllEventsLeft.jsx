import CardBoxInProfile from "../../../components/CardBoxInProfile";
import Cardcontainer from "../../../components/CardContainer";

export default function AllEventsLeft({ title, data }) {
  return (
    <div className="h-full">
      <Cardcontainer title={title}>
        {data?.map((event) => (
          <CardBoxInProfile key={event.id} data={event} name="events" />
        ))}
      </Cardcontainer>
    </div>
  );
}
