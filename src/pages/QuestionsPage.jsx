import useQuestion from "../hooks/useQuestion";
import AddQuestionCard from "../layouts/AddQuestionCard";
import QuestionCard from "../layouts/QuestionCard";

export default function QuestionsPage() {
  const { questions } = useQuestion();
  console.log(questions, "thisss");
  // console.log(question?.questionPicture, "i am question");

  return (
    <>
      <div className="flex flex-col w-[80%] h-full justify-center items-center gap-3 mt-4 mb-4 mx-auto">
        <div className="bg-white w-44 h-20 flex items-center justify-center text-3xl">
          <h1>New Quiz</h1>
        </div>
        <div className="grid grid-cols-4  gap-4">
          <AddQuestionCard />
          {questions?.map((ques, index) => {
            return <QuestionCard question={ques.question} image={ques.questionPicture} key={index} index={index} />;
          })}
        </div>
      </div>
    </>
  );
}
// id={ques.id}
