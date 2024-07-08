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
  const { eventQuestion, setEventQuestion, setSingleEvent, setIsCreated } = useEvent();
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
    const questToString = eventQuestion.map((quest) => JSON.stringify(quest));
    formData.append("events", inputToText);
    formData.append("question", questToString);

    //########## HOW TO LOG FORM DATA
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1], "formmmm");
    // }
    return formData;
  };

  const handleClickSave = async () => {
    try {
      if (eventQuestion.length === 0) {
        return alert("please add some question");
      }
      const data = formatData();
      const res = await eventApi.create(data);
      console.log(res.data, "res");
      const count = eventQuestion.length;
      setEventQuestion([]);
      setIsSave(false);
      setIsCreated(res.data);
      setSingleEvent(null);
      alert(`you've already created ${count} question `);
      navigate("/events");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancle = () => {
    setSingleEvent(null);
    setEventQuestion([]);
    navigate("/events");
  };
  const path = URL?.createObjectURL(event?.file);

  return (
    <div>
      <div className="flex flex-col h-[auto] gap-8 rounded-lg mb-6 bg-white p-4 shadow">
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 ">
          <img className="rounded-lg object-cover max-h-64" src={path || image} alt="questionPicture" />
          <div className="bg-white p-3 rounded-lg shadow  text-font-title-card">{event?.eventName}</div>
          <div className="bg-white p-3 rounded-lg shadow flex justify-start items-start h-[10vh] text-font-body">{event?.description || "Description"}</div>
        </div>
        <div
          className="grid gap-y-4
        "
        >
          <Button
            bg="blue"
            width={"full"}
            onClick={() => {
              setIsCancle(true);
            }}
          >
            Cancle
          </Button>

          <Button bg={"black"} width={"full"} onClick={() => setIsSave(true)}>
            Save
          </Button>
        </div>
      </div>

      <Modal open={isCancle}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div className=" text-font-title">Are you sure to Quit from creating</div>
          <div className=" text-font-title"> this Event</div>
          <div>
            <QuestionIcon />
          </div>
          <div className="w-full flex justify-around pt-6">
            <Button bg={`red`} width={20} onClick={() => handleCancle()}>
              Quit
            </Button>
            <Button bg={`black`} width={20} onClick={() => setIsCancle(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={isSave}>
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6">
          <div className=" text-font-title">Are you sure to Save</div>
          <div className=" text-font-title"> this Event</div>
          <div>
            <QuestionIcon />
          </div>
          <div className="w-full flex justify-around pt-6">
            <Button bg={`red`} width={20} onClick={() => handleClickSave()}>
              Save
            </Button>
            <Button bg={`black`} width={20} onClick={() => setIsSave(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
