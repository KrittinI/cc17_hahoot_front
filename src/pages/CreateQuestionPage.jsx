import { useState } from "react";
import AddQuestionCard from "../layouts/AddQuestionCard";
import QuestionCard from "../layouts/QuestionCard";
import Button from "../components/Button";
import questionApi from "../api/question";
import useQuestion from "../hooks/useQuestion";
import { useNavigate } from "react-router-dom";

export default function CreateQuestionPage() {
  const { setShowQuestion } = useQuestion()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([]);
  const [files, setFiles] = useState([]);
  const handleClickSave = async () => {
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(`questionImage`, file)
      })
      formData.append("questions", JSON.stringify(questions))
      const res = await questionApi.createQuestion(formData);
      if (res.status !== 200) {
        return
      }
      setShowQuestion(prev => [...prev, ...res.data.questions])
      navigate(`/questions`)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="h-[calc(100vh-164px)] w-[70%] mx-auto flex flex-col justify-between items-center p-4">
      <div className="bg-white w-full flex flex-col gap-4 h-[calc(100%-40px)] rounded-xl p-4">
        <div className="bg-white w-44 h-10 rounded-xl flex items-center justify-center">
          <h1 className="text-font-title">New Quiz</h1>
        </div>
        <hr className="shadow-2 text-grey " />
        <div className="w-full overflow-auto max-h-[100%]">
          <div className="grid grid-cols-5 gap-4 w-full">
            <AddQuestionCard setQuestions={setQuestions} setFiles={setFiles} />
            {questions?.map((quesion, index) =>
              <QuestionCard
                key={index}
                index={index}
                question={quesion}
                setQuestions={setQuestions}
                setFiles={setFiles}
                image={files[index]}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-end">
        <Button bg={`black`} width={60} onClick={handleClickSave}>Save</Button>
      </div>
    </div>
  );
}
