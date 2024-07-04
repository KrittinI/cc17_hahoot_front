import Select from "../components/Select";
import Input from "./Input";
import { useState } from "react";
import { useRef } from "react";
import useTopic from "../hooks/useTopic";
import Button from "./Button";

const initialError = {
  questionPicture: "",
  question: "",
  choice1: "",
  choice2: "",
  choice3: "",
  choice4: "",
  answer: "",
  topicId: "",
  isPublic: false
};

const initialInput = {
  questionPicture: "",
  question: "",
  choice1: "",
  choice2: "",
  choice3: "",
  choice4: "",
  answer: "",
  topicId: 0,
  isPublic: false
};

export default function FormAddQuestion({ question, onSuccess, onClose, image }) {
  const { topic } = useTopic()
  const fileEl = useRef();

  const [file, setFile] = useState(image || null);
  const [error, setError] = useState(initialError);
  const [input, setInput] = useState(question || initialInput);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClickAnswer = (choice) => {
    setInput((prev) => ({ ...prev, answer: choice }))
    setError((prev) => ({ ...prev, answer: "" }));
  }

  const handleChooseFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const handleClickSave = () => {
    if (!input.question) {
      setError((prev) => ({ ...prev, question: "Question is required" }));
    }
    if (!input.choice1) {
      setError((prev) => ({ ...prev, choice1: "choice1 is required" }));
    }
    if (!input.choice2) {
      setError((prev) => ({ ...prev, choice2: "choice2 is required" }));
    }
    if (input.answer === "C" && !input.choice3) {
      setError((prev) => ({ ...prev, choice3: "choice3 is required" }));
    }
    if (input.answer === "D" && (!input.choice3 || !input.choice4)) {
      setError((prev) => ({ ...prev, choice3: "choice3 is required", choice4: "choice4 is required" }));
    }
    if (!input.topicId || input.topicId === "0") {
      setError((prev) => ({ ...prev, topicId: "topic is required" }));
    }
    if (!input.answer) {
      setError((prev) => ({ ...prev, answer: "answer is required" }));
    }
    if (!input.answer || !input.choice1 || !input.choice2 || (!input.topicId || input.topicId === "0") || !input.question || (input.answer === "C" && !input.choice3) || input.answer === "D" && (!input.choice3 || !input.choice4)) {
      return
    }
    onSuccess(input, file)
  }

  return (
    <div
      className="w-[60rem] grid grid-cols-5  p-4 gap-4"
    >
      <div className="col-span-4">
        <Input
          type="text"
          name="question"
          id="question"
          value={input.question}
          onChange={handleChange}
          error={error.question}
          placeholder={`Enter Your Question...`}
        />
      </div>
      <div>
        <Select id="topic" className="text-center shadow-md mt-5" value={+input.topicId} onChange={handleChange} name="topicId" error={error.topicId} header={`Select Topic`}>
          {topic?.map((topic) => (
            <option value={+topic.id} key={topic.id} >
              {topic.topicName}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid col-span-2 bg-orange-300" >
        <input
          className=""
          type="file"
          ref={fileEl}
          name="questionPicture"
          id="questionPicture"
          onChange={handleChooseFile}
        />
      </div>
      <div className="grid col-span-3 grid-cols-5 gap-4">
        <div className="col-span-4 gap-2">
          <Input
            type="text"
            name="choice1"
            value={input.choice1}
            onChange={handleChange}
            error={error.choice1}
            placeholder={`Choice A`}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span
            name="answer"
            onClick={() => handleClickAnswer("A")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-blue rounded-xl"
          >
            {input.answer === "A" ? "T" : "F"}
          </span>
          {error.answer ? <small className="text-red">{error.answer}</small> : null}
        </div>
        <div className="col-span-4 gap-2 ">
          <Input
            type="text"
            name="choice2"
            value={input.choice2}
            onChange={handleChange}
            error={error.choice2}
            placeholder={`Choice B`}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span
            name="answer"
            onClick={() => handleClickAnswer("B")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-blue rounded-xl"
          >
            {input.answer === "B" ? "T" : "F"}
          </span>
          {error.answer ? <small className="text-red">{error.answer}</small> : null}
        </div>
        <div className="col-span-4 gap-2 ">
          <Input
            type="text"
            name="choice3"
            value={input.choice3}
            onChange={handleChange}
            error={error.choice3}
            placeholder={`Choice C (Optional)`}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span
            name="answer"
            onClick={() => handleClickAnswer("C")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-blue rounded-xl"
          >
            {input.answer === "C" ? "T" : "F"}
          </span>
          {error.answer ? <small className="text-red">{error.answer}</small> : null}
        </div>
        <div className="col-span-4 gap-2">
          <Input
            type="text"
            name="choice4"
            value={input.choice4}
            onChange={handleChange}
            error={error.choice4}
            placeholder={`Choice D (Optional)`}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span
            name="answer"
            onClick={() => handleClickAnswer("D")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-blue rounded-xl"
          >
            {input.answer === "D" ? "T" : "F"}
          </span>
          {error.answer ? <small className="text-red">{error.answer}</small> : null}
        </div>
      </div>
      {/* 
      <Select id="isPublic" className="text-center shadow-md mt-3" onChange={handleChange} name="isPublic" error={error.isPublic}>
        <option value={true} selected={input?.isPublic == 0}>
          public
        </option>
        <option value={false} selected={input?.isPublic == 1}>
          private
        </option>
      </Select> */}
      <div></div>
      <Button bg={`blue`} onClick={handleClickSave}>save</Button>
      <div></div>
      <Button bg={'black'} onClick={() => onClose()} >Cancel</Button>
    </div>
  );
}