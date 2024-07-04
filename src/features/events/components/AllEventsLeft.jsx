import CardBoxInProfile from "../../../components/CardBoxInProfile";
import useEvent from "../../../hooks/useEvent";
import Cardcontainer from "../../../components/CardContainer";

export default function AllEventsLeft({ title }) {
  const { showEvent } = useEvent();

  return (
    <div className="h-full">
      <Cardcontainer title={title}>
        {showEvent?.map((event) => (
          <CardBoxInProfile
            key={event.id}
            data={event}
            name="events"
          />
        ))}
      </Cardcontainer>
    </div>
  );
}
