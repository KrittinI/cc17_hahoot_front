import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
import useUser from "../../../hooks/useUser";
import CardContainerInProfile from "../../form/CardContainerInProfile";

export default function EventForm({ title, setSeeAll, setSeeAllProfileData }) {
  const { event } = useUser();

  const handleClick = () => {
    setSeeAll((pre) => !pre);
    setSeeAllProfileData((pre) => !pre);
  };

  console.log(event);

  return (
    <div className="mb-7">
      <CardContainerInProfile title={title} onClick={handleClick}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {event?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.eventName}
              image={el?.eventImage || image}
              id={el?.id}
              name="events"
            />
          ))}
        </div>
      </CardContainerInProfile>
    </div>
  );
}
