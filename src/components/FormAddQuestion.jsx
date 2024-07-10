import Select from "../components/Select";
import Input from "./Input";
import { useState } from "react";
import { useRef } from "react";
import useTopic from "../hooks/useTopic";
import Button from "./Button";
import img from "../assets/c4.jpeg";
import { ImageIcon } from "../icons/Image";
import CorrectIcon from "../icons/correct";
import CloseIcon from "../icons/close";

const initialError = {
  questionPicture: "",
  question: "",
  choice1: "",
  choice2: "",
  choice3: "",
  choice4: "",
  answer: "",
  topicId: "",
  isDelete: false,
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
  isDelete: false,
};

export default function FormAddQuestion({
  question,
  onSuccess,
  onClose,
  image,
  data,
}) {
  const { topic } = useTopic();
  const fileEl = useRef();

  const [file, setFile] = useState(image || null);
  const [error, setError] = useState(initialError);
  const [input, setInput] = useState(question || data || initialInput);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClickAnswer = (choice) => {
    setInput((prev) => ({ ...prev, answer: choice }));
    setError((prev) => ({ ...prev, answer: "" }));
  };

  const handleChooseFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

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
      setError((prev) => ({
        ...prev,
        choice3: "choice3 is required",
        choice4: "choice4 is required",
      }));
    }
    if (!input.topicId || input.topicId === "0") {
      setError((prev) => ({ ...prev, topicId: "topic is required" }));
    }
    if (!input.answer) {
      setError((prev) => ({ ...prev, answer: "required" }));
    }
    if (
      !input.answer ||
      !input.choice1 ||
      !input.choice2 ||
      !input.topicId ||
      input.topicId === "0" ||
      !input.question ||
      (input.answer === "C" && !input.choice3) ||
      (input.answer === "D" && (!input.choice3 || !input.choice4))
    ) {
      return;
    }
    onSuccess(input, file);
    onClose()
  };

  return (
    <>
      <div className="w-full px-4">
        <hr className="shadow-2 text-grey" />
        <div className="w-[40rem] grid grid-cols-5 p-4 gap-4 item">
          <div className="col-span-3">
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
          <div className="col-span-2 ">
            <Select
              id="topic"
              value={+input.topicId}
              onChange={handleChange}
              name="topicId"
              error={error.topicId}
              header="Select Topic"
            >
              {topic?.map((topic) => (
                <option value={+topic.id} key={topic.id}>
                  {topic.topicName}
                </option>
              ))}
            </Select>
          </div>
          <div className="grid col-span-2 bg-grey hover:bg-darkgrey rounded-lg items-center justify-center">
            <input
              type="file"
              ref={fileEl}
              name="questionPicture"
              id="questionPicture"
              onChange={handleChooseFile}
              className="hidden"
            />
            {file ? (
              <div
                role="button"
                className="bg-gray-100 relative"
                onClick={() => fileEl.current?.click()}
              >
                <img
                  src={file ? URL.createObjectURL(file) : img}
                  alt="post"
                  className="mx-auto"
                />
                <button
                  className="absolute top-1 right-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  &#10005;
                </button>
              </div>
            ) : (
              <div
                role="button"
                className="flex flex-col justify-center items-center gap-2 rounded-lg py-8  h-full w-full"
                onClick={() => fileEl.current?.click()}
              >
                {data?.questionPicture ? (
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : data?.questionPicture || img
                    }
                    alt="post"
                    className="mx-auto"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <div
                      className="bg-white
                w-10 h-10 rounded-full flex justify-center items-center"
                    >
                      <ImageIcon />
                    </div>
                    <span>Add Photo</span>
                  </div>
                )}
              </div>
            )}
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
                className="w-[40px] h-[40px] flex justify-center items-center rounded-xl"
              >
                {input.answer === "A" ? (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CorrectIcon color="green" size={12} />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CloseIcon size={12} color={"red"} />
                  </div>
                )}
              </span>
              {error.answer ? (
                <small className="text-red">{error.answer}</small>
              ) : null}
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
                className="w-[40px] h-[40px] flex justify-center items-center rounded-xl"
              >
                {input.answer === "B" ? (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CorrectIcon color="green" size={12} />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CloseIcon size={12} color={"red"} />
                  </div>
                )}
              </span>
              {error.answer ? (
                <small className="text-red">{error.answer}</small>
              ) : null}
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
                className="w-[40px] h-[40px] flex justify-center items-center rounded-xl"
              >
                {input.answer === "C" ? (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CorrectIcon color="green" size={12} />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CloseIcon size={12} color={"red"} />
                  </div>
                )}
              </span>
              {error.answer ? (
                <small className="text-red">{error.answer}</small>
              ) : null}
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
                className="w-[40px] h-[40px] flex justify-center items-center rounded-xl"
              >
                {input.answer === "D" ? (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CorrectIcon color="green" size={12} />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] flex justify-center items-start">
                    <CloseIcon size={12} color={"red"} />
                  </div>
                )}
              </span>
              {error.answer ? (
                <small className="text-red">{error.answer}</small>
              ) : null}
            </div>
          </div>
          {/* 
      <Select id="isDelete" className="text-center shadow-md mt-3" onChange={handleChange} name="isDelete" error={error.isDelete}>
        <option value={true} selected={input?.isDelete == 0}>
          public
        </option>
        <option value={false} selected={input?.isDelete == 1}>
          private
        </option>
      </Select> */}
        </div>
        <div className="flex justify-between px-4 pb-4">
          <Button width={"40"} bg={"black"} onClick={() => onClose()}>
            Cancel
          </Button>
          <Button width={"40"} bg={`blue`} onClick={handleClickSave}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
}
