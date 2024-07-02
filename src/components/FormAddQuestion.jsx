import Select from "../components/Select";
import Input from "./Input";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import questionApi from "../api/question";
import useTopic from "../hooks/useTopic";
const arr = [];

const initialError = {
  questionPicture: "",
  question: "",
  choice1: "",
  choice2: "",
  choice3: "",
  choice4: "",
  answer: "",
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
  isPublic: false
};

export default function FormAddQuestion({ foundQuestion, setQuestions, onSuccess }) {
  const { topic } = useTopic()
  const fileEl = useRef();

  const [file, setFile] = useState(null);
  const [error, setError] = useState(initialError);
  const [input, setInput] = useState(initialInput);

  useEffect(() => {
    if (foundQuestion) {
      setInput(foundQuestion);
      console.log("changeeeeeeeeeeeeeeee");
    }
  }, [foundQuestion]);

  console.log(input.answer);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClickAnswer = (choice) => {
    setInput((prev) => ({ ...prev, answer: choice }))
  }

  const formatQuestion = () => {
    const formData = new FormData();

    if (file) {
      console.log("this is file", file);
      formData.append("questionPicture", file);
    }
    if (input) {
      console.log("this is input", input);

      for (const key in input) {
        if (key === "questionPicture") {
          continue;
        }
        if (key === "index") {
          continue;
        }
        console.log(key);
        formData.append(key, input[key]);

        // if (key == "id") {
        //   console.log("eiei", key);
        //   formData.append(key, +input[key]);
        // } else {
        //   console.log(key);
        //   formData.append(key, input[key]);
        // }
      }
    }
    console.log(...formData);
    return formData;
  };

  const handleSubmit = (index) => {
    // console.log(input, "i am input");

    if (!input.question) {
      setError((prev) => ({ ...prev, question: "Question is required" }));
    }
    if (!input.choice1) {
      setError((prev) => ({ ...prev, choice1: "choice1 is required" }));
    }
    if (!input.choice2) {
      setError((prev) => ({ ...prev, choice2: "choice2 is required" }));
    }
    if (!input.choice3) {
      setError((prev) => ({ ...prev, choice3: "choice3 is required" }));
    }
    if (!input.choice4) {
      setError((prev) => ({ ...prev, choice4: "choice4 is required" }));
    }
    if (!file) {
      setError((prev) => ({ ...prev, questionPicture: "questionPicture is required" }));
      console.log("i am questionPicture", input.questionPicture);
    }
    if (!input.answer) {
      setError((prev) => ({ ...prev, answer: "answer is required" }));
    }
    // console.log(input.isPublic);
    if (!input.isPublic) {
      setError((prev) => ({ ...prev, isPublic: "isPublic is required" }));
      console.log("first");
    }

    for (const key in error) {
      if (Object.hasOwnProperty.call(error, key)) {
        const element = error[key];

        if (element) return console.log(element);
      }
    }

    // console.log(foundQuestion?.id, "idddd");
    // console.log(edit);

    arr.push({ ...input, questionPicture: file });

    // if (edit) {
    //   console.log(index, "indexx");
    //   console.log(input, "innnnn");
    //   const editedData = { ...input, questionPicture: file };

    //   const editedArr = arr.map((q, idx) => (idx === index ? editedData : q));
    //   setQuestions(editedArr);

    //   console.log(input, "innnnn");
    //   // console.log(questions, "innnnn");
    //   // const formData = formatQuestion();
    //   // await questionApi.editQuestionById(foundQuestion.id, formData);
    // } else {
    //   console.log(edit, "edit");
    //   console.log("hahaha");
    //   console.log(arr, "arr");
    //   setQuestions(arr);
    //   console.log("gong");
    // }
  };

  const handleClickCreate = async (indexxx) => {
    try {
      const formData = formatQuestion();
      console.log(...formData, "itsme");
      const questionCreated = await questionApi.createQuestion(formData);
      console.log("this is your question", questionCreated);
      const filteredArr = arr.filter((el, index) => index !== indexxx);
      console.log(filteredArr);
      setQuestions(filteredArr);
    } catch (err) {
      alert("failed");
    }
  };
  // console.log(input.questionPicture, "pictureeee");

  return (
    <form
      action=""
      className="w-[60rem] grid grid-cols-5  p-4 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(foundQuestion?.index);
      }}
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
      <Select id="topic" className="text-center shadow-md mt-5" onChange={handleChange} name="topicId" error={error.topic} header={`Select Topic`}>
        {topic?.map((topic) => (
          <option value={topic.id} key={topic.id} selected={input?.topicId == topic.id}>
            {topic.topicName}
          </option>
        ))}
      </Select>
      <div className="grid col-span-2 bg-orange-300">
        {/* <label htmlFor="question">question</label> */}
        <label htmlFor="questionPicture">insert the picture of this question</label>
        <input
          type="file"
          ref={fileEl}
          name="questionPicture"
          id="questionPicture"
          // value={file}
          onChange={(e) => {
            if (e.target.files[0]) {
              console.log("hello", e.target.files[0]);
              setFile(e.target.files[0]);
              // setInput((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
              // console.log("helloooo", e.target.files[0].filename);
              // console.log(e.target.files);
            }
          }}
        />
      </div>
      <div className="flex col-span-3 flex-col gap-4">
        <div className="flex gap-2">
          <Input
            type="text"
            name="choice1"
            value={input.choice1}
            onChange={handleChange}
            error={error.choice1}
            placeholder={`Choice A`}
          />
          <span
            onClick={() => handleClickAnswer("A")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-xl"
          >
            {input.answer === "A" ? "T" : "F"}
          </span>
        </div>
        <div className="flex gap-2 justify-between">
          <Input
            type="text"
            name="choice2"
            value={input.choice2}
            onChange={handleChange}
            error={error.choice2}
            placeholder={`Choice B`}
          />
          <span
            onClick={() => handleClickAnswer("B")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-xl"
          >
            {input.answer === "B" ? "T" : "F"}
          </span>

        </div>
        <div className="flex gap-2 justify-between">
          <Input
            type="text"
            name="choice3"
            value={input.choice3}
            onChange={handleChange}
            error={error.choice3}
            placeholder={`Choice C`}
          />
          <span
            onClick={() => handleClickAnswer("C")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-xl"
          >
            {input.answer === "C" ? "T" : "F"}
          </span>
        </div>
        <div className="flex gap-2 justify-between">
          <Input
            type="text"
            name="choice4"
            value={input.choice4}
            onChange={handleChange}
            error={error.choice4}
            placeholder={`Choice D`}
          />
          <span
            onClick={() => handleClickAnswer("D")}
            role="button"
            className="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-xl "
          >
            {input.answer === "D" ? "T" : "F"}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
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
      <button>save</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleClickCreate(foundQuestion?.index);
        }}
      >
        create
      </button>
    </form>
  );
}

// const formData = formatQuestion();
// console.log(...formData, "gong");
// try {
// const questionCreated = await questionApi.createQuestion(formData);
// console.log(questionCreated, "i am question unique");
// console.log("beforePush", question);
// console.log(input);
// const Arr = [];
// Arr.push({ ...input, questionPicture: questionCreated.data.questions[0].questionPicture, creatorId: questionCreated.data.questions[0].creatorId });
// Arr.push({ ...input, questionPicture: file });
// console.log(Arr, "after push");
// console.log(questionCreated.data.questions[0].questionPicture, "quesssssssssssss");
// fetchQuestion();
// } catch (err) {
//   console.log("failed");
//   alert("failed");
// }
