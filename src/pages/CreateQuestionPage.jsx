import { useState } from "react";
import AddQuestionCard from "../layouts/AddQuestionCard";
import QuestionCard from "../layouts/QuestionCard";
import Button from "../components/Button";
import questionApi from "../api/question";

export default function CreateQuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [files, setFiles] = useState([]);

  const handleClickSave = async () => {
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(`questionImage`, file)
      })
      formData.append("questions", JSON.stringify(questions))
      console.log(...formData)
      // console.log(formData.getAll('questionImage'));
      // console.log('files', files)
      // console.log(questions, "thisss");
      // console.log(JSON.stringify(questions));
      // console.log(JSON.parse(JSON.stringify(questions)));
      const res = await questionApi.createQuestion(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="h-[calc(100vh-200px)] w-[80%] bg-gray-300 mx-auto flex flex-col justify-between items-center p-4">
      <div className="bg-blue w-full flex flex-col gap-2 h-[calc(100%-40px)]">
        <div className="bg-white w-44 h-20 rounded-xl flex items-center justify-center self-center text-3xl">
          <h1>New Quiz</h1>
        </div>
        <div className="w-full bg-red overflow-auto max-h-[100%]">
          <div className="grid grid-cols-4 gap-4 w-full">
            <AddQuestionCard setQuestions={setQuestions} setFiles={setFiles} />
            {questions?.map((ques, index) =>
              <QuestionCard question={ques.question} image={files[index]} key={index} index={index} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-green w-full">
        <Button bg={`black`} width={40} onClick={handleClickSave}>Save</Button>
      </div>
    </div>
  );
}
