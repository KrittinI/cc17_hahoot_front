import { HeartIcon, HeartIconUnfav } from "../../../icons/heart";
import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import ReadyAlert from "../../../components/ReadyAlert";
import { useState } from "react";
import eventApi from "../../../api/event";
import AddEventQuestionForm from "../../form/AddEventQuestionForm";
import useEvent from "../../../hooks/useEvent";
import { useRef } from "react";
import { ImageIcon } from "../../../icons";
import { useEffect } from "react";

export default function OneEventLeft({ event, favorite, handleClickFavorite, edit, setClickEdit, handleClickSinglePlay, handleClickCreateRoom, setNewQuestion, fetchEvent }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [file, setFile] = useState("");
  const [fileNew, setFileNew] = useState("");
  const { authUser } = useAuth();
  const { eventQuestions, setEventQuestions } = useEvent();
  const fileEl = useRef();

  console.log(file, "file");
  console.log(fileNew, "fileNew");

  const initialInput = { eventName: "", topicId: "", description: "" };
  const [input, setInput] = useState(initialInput);

  useEffect(() => {
    setInput({ eventName: event?.eventName, topicId: event?.topic?.id, description: event?.description });
    setFile(event?.eventImage);
  }, [event]);

  const oldQuestions = event?.assignOfBridges;
  const convertKey = oldQuestions?.map((el) => ({ id: el?.questionId, timeLimit: el?.timeLimit }));

  const formatData = () => {
    const formData = new FormData();

    const questions = eventQuestions.map((el) => ({
      id: +el.questionId,
      timeLimit: el.timeLimit,
    }));
    questions.unshift(...convertKey);

    if (fileNew || file) {
      formData.append("eventImage", fileNew || file);
    } else {
      formData.append("eventImage", null);
    }
    //######### convert DATA TO Text FORM AND SEND THEM IN GROUP
    // const { file, ...data } = event;
    // const inputToText = JSON.stringify(input);
    formData.append("events", JSON.stringify(input));
    formData.append("questions", JSON.stringify(questions));
    return formData;
  };

  const handleClickDelete = async (eventId) => {
    try {
      await eventApi.delete(eventId);
      setIsDelete(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSave = async () => {
    try {
      const formdata = formatData();
      await eventApi.edit(event?.id, formdata);
      await fetchEvent();
      setEventQuestions([]);
      setClickEdit(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(input, "inputtt");

  return (
    <div className="min-h-full min-w-full max-w-full flex flex-col h-full  gap-8 rounded-lg  bg-white p-4 shadow">
      <div className="flex flex-col gap-4 justify-between border-b border-gray-300 pb-4 h-full">
        <div className="flex justify-center min-h-[50%] max-h-[50%] min-w-[100%] max-w-[100%] mx-auto bg-gray-100">
          {edit ? (
            <img className="rounded-lg max-h-full max-w-full object-cover" src={event?.eventImage || image} alt="eventImage" />
          ) : (
            <div className="h-full w-full">
              <input
                type="file"
                name="eventPicture"
                id="eventPicture"
                ref={fileEl}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFile("");
                    setFileNew(e.target.files[0]);
                  }
                }}
              />
              {file ? (
                <div
                  role="button"
                  className="bg-gray-100 relative w-full h-full"
                  onClick={() => {
                    fileEl.current?.click();
                  }}
                >
                  <img src={file} alt="post" className="mx-auto w-full h-full object-cover" />
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
              ) : fileNew ? (
                <div role="button" className="bg-gray-100 relative w-full h-full" onClick={() => fileEl.current?.click()}>
                  <img src={URL.createObjectURL(fileNew)} alt="post" className="mx-auto w-full h-full object-cover" />
                  <button
                    className="absolute top-1 right-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileNew(null);
                    }}
                  >
                    &#10005;
                  </button>
                </div>
              ) : (
                <div role="button" className="flex flex-col w-full h-full justify-center items-center  bg-grey rounded-lg py-8 hover:bg-darkgrey " onClick={() => fileEl.current?.click()}>
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
        <div className="bg-white p-3 rounded-lg shadow  text-font-title-card">
          {edit ? event?.eventName : <Input value={input?.eventName} type="text" onChange={handleChange} name="eventName" />}
        </div>

        <div className="bg-white p-3 rounded-lg shadow flex justify-start items-start h-[10vh] text-font-body">
          {edit ? event?.description || "Description" : <Input value={input?.description} type="text" name="description" onChange={handleChange} />}
        </div>

        {edit && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4 text-font-title-card">
              <div className="flex items-center gap-2" role="button" onClick={() => navigate(`../../users/${event?.user.id}`)}>
                <Avatar src={event?.user?.googleImage || event?.user?.profileImage} />
                <div>{event?.user?.username}</div>
              </div>
            </div>
            <div className="flex gap-x-6">
              <div role="button" className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey" onClick={handleClickFavorite}>
                {favorite ? <HeartIcon /> : <HeartIconUnfav />}
              </div>
              {event?.creatorId === authUser?.id ? (
                <>
                  {event?.Room.length !== 0 ? (
                    <div className="flex justify-center items-center w-12 h-12 shadow bg-grey rounded-full">
                      <EditIcon />
                    </div>
                  ) : (
                    <div
                      role="button"
                      className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
                      onClick={() => {
                        setClickEdit(false);
                      }}
                    >
                      <EditIcon />
                    </div>
                  )}
                  {event?.Room.length !== 0 ? (
                    <div className="flex justify-center items-center w-12 h-12 shadow bg-grey rounded-full">
                      <DeleteIcon />
                    </div>
                  ) : (
                    <div role="button" className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey" onClick={() => setIsDelete(true)}>
                      <DeleteIcon />
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        )}

        {edit ? (
          <div className="grid gap-y-2">
            <Button bg="blue" width={"full"} onClick={() => setOpen(true)}>
              Single Play
            </Button>
            <Button bg="blue" width={"full"} onClick={() => handleClickCreateRoom()}>
              Create Room
            </Button>
            <Button bg={"black"} width={"full"} onClick={() => navigate("/events")}>
              Back
            </Button>
          </div>
        ) : (
          <div className="grid gap-y-4">
            <Button bg="blue" width={"full"} onClick={() => setIsEdit(true)}>
              Add New Quiz
            </Button>
            <Modal open={isEdit} onClose={() => setIsEdit(false)}>
              <AddEventQuestionForm onClose={() => setIsEdit(false)} event={event} />
              {/* <FormAddQuestion onSuccess={onSuccess} onClose={() => setIsEdit(false)} /> */}
            </Modal>
            <Button bg={"blue"} width={"full"} onClick={handleSave}>
              Save
            </Button>
            <Button
              bg={"black"}
              width={"full"}
              onClick={() => {
                setClickEdit(true);
                setEventQuestions([]);
                setNewQuestion([]);
              }}
            >
              Back
            </Button>
          </div>
        )}
      </div>

      <Modal title="Are you ready" open={open} >
        <ReadyAlert onClose={() => setOpen(false)} onClickConfirm={handleClickSinglePlay} />
      </Modal>
      <Modal title="confirm to delete" open={isDelete}>
        <ReadyAlert onClose={() => setIsDelete(false)} onClickConfirm={() => handleClickDelete(event?.id)} />
      </Modal>
    </div>
  );
}

// const onSuccess = (input, file) => {
//   setNewQuestion((prev) => [...prev, input]);
//   if (file) {
//     setFiles((prev) => [...prev, file]);
//   } else {
//     setFiles((prev) => [...prev, null]);
//   }
// };

// const topicId = event.topic.id;
// const events = { ...input, topicId: topicId };
// const questions = eventQuestions.map((el) => ({
//   id: +el.questionId,
//   timeLimit: el.timeLimit,
// }));
// questions.unshift(...convertKey);
