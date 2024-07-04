import CardBoxInProfile from "../../components/CardBoxInProfile";
import image from "../../assets/c4.jpeg";
import useQuestion from "../../hooks/useQuestion";
import Cardcontainer from "../../components/CardContainer";

export default function AllQuizForm({ title }) {
  const { showQuestion } = useQuestion();

  return (
    <div className="mb-7">
      <Cardcontainer title={title}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {showQuestion?.map((el, index) => (
            <CardBoxInProfile
              key={index}
              title={el?.question}
              image={el?.questionPicture || image}
              id={el?.id}
              name="questions"
            />
          ))}
        </div>
      </Cardcontainer>
    </div>
  );
}
