import Button from "../../../components/Button";
import image from "../../../assets/c4.jpeg";
import useEvent from "../../../hooks/useEvent";
import eventApi from "../../../api/event";
import Modal from "../../../components/Modal";
import QuestionIcon from "../../../icons/Question";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEventleft({ event }) {
  const navigate = useNavigate();
  const { eventQuestions, setEventQuestions, setSingleEvent, setEvent } =
    useEvent();
  const [isCancle, setIsCancle] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const formatData = () => {
    const formData = new FormData();
    if (event?.file) {
      formData.append("eventImage", event?.file);
    } else {
      formData.append("eventImage", null);
    }
    //######### convert DATA TO Text FORM AND SEND THEM IN GROUP
    const { file, ...data } = event;
    const inputToText = JSON.stringify(data);
    formData.append("events", inputToText);
    formData.append("question", JSON.stringify(eventQuestions));
    return formData;
  };

  const handleClickSave = async () => {
    try {
      if (eventQuestions.length === 0) {
        return alert("please add some question");
      }
      const data = formatData();
      const res = await eventApi.create(data);
      setEventQuestions([]);
      setIsSave(false);
      setEvent((prev) => [...prev, res.data.event]);
      setSingleEvent(null);
      navigate("/events");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancle = () => {
    setSingleEvent(null);
    setEventQuestions([]);
    navigate("/events");
  };
  const path = event?.file && URL?.createObjectURL(event?.file);

  return (
    <div>
      <div className="flex flex-col h-[auto] gap-8 rounded-lg mb-6 bg-white p-4 shadow">
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 ">
          <img
            className="rounded-lg object-cover max-h-64"
            src={path || image}
            alt="questionPicture"
          />
          <div className="bg-white p-3 rounded-lg shadow  text-font-title-card">
            {event?.eventName}
          </div>
          <div className="bg-white p-3 rounded-lg shadow flex justify-start items-start h-[10vh] text-font-body">
            {event?.description || "Description"}
          </div>
        </div>
        <div
          className="grid gap-y-4
        "
        >
          <Button
            bg="black"
            width={"full"}
            onClick={() => {
              setIsCancle(true);
            }}
          >
            Cancle
          </Button>
          <Button bg={"blue"} width={"full"} onClick={() => setIsSave(true)}>
            Save
          </Button>
        </div>
      </div>

      <Modal open={isCancle} title={`Confirm to Quit this Event`}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div>
            <QuestionIcon size={20} />
          </div>
          <div className="w-full flex justify-between pt-6">

            <Button bg={`black`} width={40} onClick={() => setIsCancle(false)}>
              Cancel
            </Button>
            <Button bg={`blue`} width={40} onClick={() => handleCancle()}>
              Quit
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={isSave} title={`Confirm to Save this Event`}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div>
            <QuestionIcon size={20} />
          </div>
          <div className="w-full flex justify-around pt-6">
            <Button bg={`black`} width={40} onClick={() => setIsSave(false)}>
              Cancel
            </Button>
            <Button bg={`blue`} width={40} onClick={() => handleClickSave()}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
