import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
import CardContainerInProfile from "../../form/CardContainerInProfile";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useEvent from "../../../hooks/useEvent";

export default function EventForm({ title, setSeeAll }) {
  const { userId } = useParams()
  const { getEventByUserId } = useEvent()
  const [userEvents, setUserEvents] = useState([])

  const handleClick = () => {
    setSeeAll((pre) => !pre);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await getEventByUserId(+userId)
      console.log(result.data.events);
      setUserEvents(result.data.events)
    }
    fetchEvent()
  }, [userId])

  // console.log(event);

  return (
    <div className="mb-7">
      <CardContainerInProfile title={title} onClick={handleClick}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {userEvents?.map((el, index) => (
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
