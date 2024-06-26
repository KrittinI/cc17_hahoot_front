import { useNavigate } from "react-router-dom";
import BoxContain from "../../../components/BoxContain";
import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";

const eventData = [
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 1 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
  {
    title: "1 + 8 เท่ากับเท่าไหร่ ?",
    image: "src/assets/hh-hero.png",
  },
];

export default function UserEventAndQuizForm() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7 ">
      <BoxContain title="My Event" onClick={() => navigate("/")}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {eventData.map((eventData, index) => (
            <CardBoxInProfile
              key={index}
              title={eventData.title}
              image={image}
            />
          ))}
        </div>
      </BoxContain>
      <BoxContain title="My Quiz" hight={30} onClick={() => navigate("/")}>
        <div className="flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto pt-4">
          {eventData.map((eventData, index) => (
            <CardBoxInProfile
              key={index}
              title={eventData.title}
              image={image}
            />
          ))}
        </div>
      </BoxContain>
    </div>
  );
}
