import { useState } from "react";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useEffect } from "react";
import useEvent from "../../hooks/useEvent";
import questionApi from "../../api/question";

export default function AddEventQuestionForm({ onClose, event, onSuccess, data, timeLimit = 20 }) {
  const { setEventQuestions } = useEvent();
  console.log(event, "data");

  const initialInput = { questionId: data?.id || "", timeLimit: timeLimit || "" };
  const initialError = { questionId: "", timeLimit: "" };

  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState(initialError);
  const [currentQuestion, setCurrentQuestion] = useState(data || {});
  const [quizTopic, setQuizTopic] = useState([]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeForSelect = async (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //can  be optimized
    const selectQuestion = quizTopic.find((el) => el.id === +e.target.value);
    setCurrentQuestion(selectQuestion);
  };

  useEffect(() => {
    const fetchQuizTopic = async () => {
      try {
        const res = await questionApi.getQuestionByTopicId(+event.topicId);
        setQuizTopic(res.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuizTopic();
  }, [event.topicId]);

  const handleClickSave = () => {
    let isError = false;
    console.log(input);
    for (let field in input) {
      if (!input[field]) {
        setError((prev) => ({ ...prev, field: `${field} is required` }));
        isError = true;
      }
    }
    if (isError) return;
    else {
      //setเข้าstate
      setEventQuestions((prev) => [...prev, input]);
      onClose();
    }
  };
  return (
    <div className=" grid gap-4 p-4">
      <div className="w-[40rem] grid grid-cols-5 p-4 gap-4 item">
        <div className="col-span-3">
          <Select id="questionId" value={input.questionId} onChange={handleChangeForSelect} name="questionId" error={error.questionId} header={`Select Question`}>
            {quizTopic?.map((el) => (
              <option value={el?.id} key={el?.id}>
                {el?.question}
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
          <Select id="isDelete" className="text-center shadow-md mt-3" onChange={handleChange} name="isDelete" error={error.isDelete}>
            <option value={true} selected={input?.isDelete == 0}>
              public
            </option>
            <option value={false} selected={input?.isDelete == 1}>
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
