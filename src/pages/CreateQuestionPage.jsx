import { useState } from "react";
import AddQuestionCard from "../layouts/AddQuestionCard";
import QuestionCard from "../layouts/QuestionCard";

export default function CreateQuestionPage() {
  const [questions, setQuestions] = useState([]);

  console.log(questions, "thisss");
  // console.log(question?.questionPicture, "i am question");

  return (
    <div className="h-[calc(100vh-200px)] w-[80%] bg-black mx-auto flex flex-col items-center p-4 gap-2">
      <div className="bg-white w-44 h-20 rounded-xl flex items-center justify-center text-3xl">
        <h1>New Quiz</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        <AddQuestionCard setQuestions={setQuestions} />
        {questions?.map((ques, index) => {
          return <QuestionCard question={ques.question} image={ques.questionPicture} key={index} index={index} />;
        })}
      </div>
    </div>
  );
}
// id={ques.id}
