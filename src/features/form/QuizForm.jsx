import CardBoxInProfile from "../../components/CardBoxInProfile";
import image from "../../assets/c4.jpeg";
import CardContainer from "./CardContainer";
import useQuestion from "../../hooks/useQuestion";

export default function QuizForm({ title }) {
  const { showQuestion } = useQuestion();
  return (
    <div className="flex flex-col mb-7">
      <CardContainer title={title}>
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
      </CardContainer>
    </div>
  );
}
