import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
import useUser from "../../../hooks/useUser";
import CardContainerInProfile from "../../form/CardContainerInProfile";

export default function QuizForm({ title, setSeeAll, setSeeAllProfileData }) {
  const { question } = useUser();
  const handleClick = () => {
    setSeeAll((pre) => !pre);
    setSeeAllProfileData((pre) => !pre);
  };
  console.log(question);
  return (
    <div className="flex flex-col mb-7">
      <CardContainerInProfile title={title} onClick={handleClick}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {question?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.question}
              image={el?.questionPicture || image}
              id={el?.id}
              name="questions"
            />
          ))}
        </div>
      </CardContainerInProfile>
    </div>
  );
}
