import CardBoxInProfile from "../../../components/CardBoxInProfile";
import image from "../../../assets/c4.jpeg";
// import useUser from "../../../hooks/useUser";
import CardContainerInProfile from "../../form/CardContainerInProfile";
import useQuestion from "../../../hooks/useQuestion";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function QuizForm({ title, setSeeAll }) {
  // const { question } = useUser();
  const { userId } = useParams()
  const { getQuestionByUserId } = useQuestion()
  const [userQeustion, setUserQustion] = useState([])
  const handleClick = () => {
    setSeeAll((pre) => !pre);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await getQuestionByUserId(+userId)
      setUserQustion(res.data.questions)
    }
    fetchQuestion()
  }, [userId])

  // console.log(question);
  return (
    <div className="flex flex-col mb-7">
      <CardContainerInProfile title={title} onClick={handleClick}>
        <div className="flex flex-wrap justify-center h-auto gap-10 pt-4 mb-6">
          {userQeustion?.map((el, index) => (
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
