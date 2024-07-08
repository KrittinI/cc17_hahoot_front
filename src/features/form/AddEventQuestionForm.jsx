import { useState } from "react";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useQuestion from "../../hooks/useQuestion";
import { useEffect } from "react";
import useEvent from "../../hooks/useEvent";

export default function AddEventQuestionForm({ onClose, event, onSuccess, data, timeLimit }) {
  const { getQuestionByTopicId, quizTopic, getQuestionByQuestionId } = useQuestion();
  const { setEventQuestion } = useEvent();
  const initialInput = { questionId: data?.id || "", timeLimit: timeLimit || "" };
  const initialError = { questionId: "", timeLimit: "" };
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(initialError);
  const [currentQuestion, setCurrentQuestion] = useState(data || {});
  console.log(data, "i am i am");

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeForSelect = async (e) => {
    // console.log(e.target.values, "iddd");
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //can  be optimized
    const selectQuestion = await getQuestionByQuestionId(e.target.value);
    setCurrentQuestion(selectQuestion);
  };

  useEffect(() => {
    getQuestionByTopicId(event.topicId);
  }, []);

  console.log(quizTopic, "i am quizTopic");

  const handleClickSave = () => {
    let isError = false;
    for (let field in input) {
      if (!input[field]) {
        setError((prev) => ({ ...prev, field: `${field} is required` }));
        isError = true;
      }
    }
    if (isError) return;
    else {
      //setเข้าstate

      console.log(input, "inputtt");
      setEventQuestion((prev) => [...prev, input]);
      setInput(initialInput);
      onClose();
    }
  };
  return (
    <div className=" grid gap-4 p-4">
      <div className="w-[40rem] grid grid-cols-5 p-4 gap-4 item">
        <div className="col-span-3">
          <Select id="questionId" value={input.questionId} onChange={handleChangeForSelect} name="questionId" error={error.questionId} header={`Select Question`}>
            {quizTopic?.map((el) => (
              <option value={+el.id} key={el.id}>
                {el.question}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-2 ">
          <Input type="text" name="timeLimit" id="timeLimit" value={input.timeLimit} onChange={handleChange} error={error.timeLimit} placeholder={`fill timeLimit for this Question`} />
        </div>
        <div className="grid col-span-2 bg-orange-300">
          <img src={currentQuestion?.questionPicture} alt="" />
        </div>
        <div className="grid col-span-3 grid-cols-5 gap-4">
          <div className={currentQuestion?.answer === "A" ? `col-span-4 gap-2 bg-green` : `col-span-4 gap-2 bg-red`}>
            <p>CHOICE A : {currentQuestion?.choice1}</p>
          </div>

          <div className={currentQuestion?.answer === "B" ? `col-span-4 gap-2 bg-green` : `col-span-4 gap-2 bg-red`}>
            <p>CHOICE B : {currentQuestion?.choice2}</p>
          </div>
          <div className={currentQuestion?.answer === "C" ? `col-span-4 gap-2 bg-green` : `col-span-4 gap-2 bg-red`}>
            <p>CHOICE C : {currentQuestion?.choice3}</p>
          </div>
          <div className={currentQuestion?.answer === "D" ? `col-span-4 gap-2 bg-green` : `col-span-4 gap-2 bg-red`}>
            <p>CHOICE D : {currentQuestion?.choice4}</p>
          </div>

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
      {onSuccess ? (
        <Button bg={`blue`} onClick={() => onSuccess(input)}>
          edit
        </Button>
      ) : (
        <Button bg={`blue`} onClick={handleClickSave}>
          save
        </Button>
      )}
      <div></div>
      <Button bg={"black"} onClick={() => onClose()}>
        Cancel
      </Button>
    </div>
  );
}
