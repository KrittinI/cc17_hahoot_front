import CardBoxInProfile from "../../components/CardBoxInProfile";
import SeeAllForm from "./SeeAllForm";
import image from "../../assets/c4.jpeg";

export default function EventForm() {
  const eventData = [
    {
      title: "1 + 1 เท่ากับเท่าไหร่ ? 1 + 1 เท่ากับเท่าไหร่ ? ",
      image: "src/assets/hh-hero.png",
    },
    {
      title: "1 + 1 เท่ากับเท่าไหร่ ? 1 + 1 เท่ากับเท่าไหร่ ?",
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
      title: "1 + 8 เท่ากับเท่าไหร่rrrrrrrrrr ?",
      image: "src/assets/hh-hero.png",
    },
  ];
  return (
    <div className="mb-7">
      <SeeAllForm title="All Event">
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {eventData.map((eventData, index) => (
            <CardBoxInProfile
              key={index}
              title={eventData.title}
              image={image}
            />
          ))}
        </div>
      </SeeAllForm>
    </div>
  );
}
