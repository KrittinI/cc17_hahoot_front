import { useState } from "react";
import Select from "../../components/Select";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useEffect } from "react";
import useEvent from "../../hooks/useEvent";
import questionApi from "../../api/question";
import { ImageIcon } from "../../icons/Image";

export default function AddEventQuestionForm({
  onClose,
  event,
  onSuccess,
  data,
  timeLimit = 20,
}) {
  console.log(data?.questionPicture, "pictureeeee");

  const { setEventQuestions } = useEvent();

  const initialInput = {
    questionId: data?.id || "",
    timeLimit: timeLimit || "",
  };
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
    <div className="w-full">
      <div className="w-[40rem] grid grid-cols-4 p-4 gap-4 item">
        <div className="col-span-3">
          <Select
            id="questionId"
            value={input.questionId}
            onChange={handleChangeForSelect}
            name="questionId"
            error={error.questionId}
            header={`Select Question`}
          >
            {quizTopic?.map((el) => (
              <option value={el?.id} key={el?.id}>
                {el?.question}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-1 ">
          <Input
            type="text"
            name="timeLimit"
            id="timeLimit"
            value={input.timeLimit}
            onChange={handleChange}
            error={error.timeLimit}
            placeholder={`fill timeLimit for this Question`}
          />
        </div>

        <div className="grid col-span-2 bg-grey hover:bg-darkgrey rounded-lg items-center justify-center">
          {currentQuestion?.questionPicture ? (
            <img
              className="h-[240px] "
              src={currentQuestion?.questionPicture}
              alt=""
            />
          ) : (
            <div className="flex flex-col items-center h-[240px] justify-center">
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
        <div className="grid col-span-2 grid-cols-2 gap-4 text-font-body text-black ">
          <div
            className={
              currentQuestion?.answer === "A"
                ? `col-span-4 gap-2 bg-green rounded-md  flex pl-2 items-center`
                : `col-span-4 gap-2 bg-red rounded-md flex pl-2 items-center`
            }
          >
            <p>CHOICE A : {currentQuestion?.choice1}</p>
          </div>

          <div
            className={
              currentQuestion?.answer === "B"
                ? `col-span-4 gap-2 bg-green rounded-md  flex pl-2 items-center`
                : `col-span-4 gap-2 bg-red rounded-md  flex pl-2 items-center`
            }
          >
            <p>CHOICE B : {currentQuestion?.choice2}</p>
          </div>
          <div
            className={
              currentQuestion?.answer === "C"
                ? `col-span-4 gap-2 bg-green rounded-md  flex pl-2 items-center`
                : `col-span-4 gap-2 bg-red rounded-md  flex pl-2 items-center`
            }
          >
            <p>CHOICE C : {currentQuestion?.choice3}</p>
          </div>
          <div
            className={
              currentQuestion?.answer === "D"
                ? `col-span-4 gap-2 bg-greenrounded-md  flex pl-2 items-center`
                : `col-span-4 gap-2 bg-red rounded-md  flex pl-2 items-center`
            }
          >
            <p>CHOICE D : {currentQuestion?.choice4}</p>
          </div>

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
      <div></div>
      <div className="w-full flex justify-between px-4 pb-2">
        <Button bg={"black"} width={40} onClick={() => onClose()}>
          Cancel
        </Button>
        <div></div>
        {onSuccess ? (
          <Button bg={`blue`} width={40} onClick={() => onSuccess(input)}>
            Edit
          </Button>
        ) : (
          <Button bg={`blue`} width={40} onClick={handleClickSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
