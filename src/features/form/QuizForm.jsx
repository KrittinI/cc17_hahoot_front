import CardBoxInProfile from "../../components/CardBoxInProfile";
import image from "../../assets/c4.jpeg";
import CardContainer from "./CardContainer";
import useQuestion from "../../hooks/useQuestion";
import { useState } from "react";
import { useEffect } from "react";

export default function QuizForm({ seeAll, search, title }) {
  const { question, quizTopic } = useQuestion();
  const [showQuestion, setShowQuestion] = useState([]);

  useEffect(() => {
    if (seeAll) {
      if (search) {
        setShowQuestion(
          question?.filter((el) => el.question.toLowerCase().includes(search))
        );
      } else {
        setShowQuestion(question);
      }
    } else {
      if (search) {
        setShowQuestion(
          quizTopic?.filter((el) => el.question.toLowerCase().includes(search))
        );
      } else {
        setShowQuestion(quizTopic);
      }
    }
  }, [seeAll, question, quizTopic, search]);

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
