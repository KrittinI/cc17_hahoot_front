import CardBoxInProfile from "../../components/CardBoxInProfile";
import CardContainer from "./CardContainer";
import image from "../../assets/c4.jpeg";
import useEvent from "../../hooks/useEvent";

export default function EventForm({ title }) {
  const { showEvent } = useEvent();

  return (
    <div className="mb-7">
      <CardContainer title={title}>
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
      </CardContainer>
    </div>
  );
}
