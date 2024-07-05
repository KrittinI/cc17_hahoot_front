import CardBoxInProfile from "../../components/CardBoxInProfile";
import image from "../../assets/c4.jpeg";
import useEvent from "../../hooks/useEvent";
import Cardcontainer from "../../components/CardContainer";

export default function AllEventForm({ title }) {
  const { showEvent } = useEvent();

  return (
    <div className="mb-7">
      <Cardcontainer title={title}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {showEvent?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.eventName}
              image={el?.eventImage || image}
              id={el?.id}
              name="events"
            />
          ))}
        </div>
      </Cardcontainer>
    </div>
  );
}
