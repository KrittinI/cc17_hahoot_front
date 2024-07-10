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

export default function OneEventLeft({ event, favorite, handleClickFavorite, edit, setClickEdit, handleClickSinglePlay, handleClickCreateRoom, setNewQuestion, fetchEvent }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { authUser } = useAuth();
  const { eventQuestions, setEventQuestions } = useEvent();

  const initialInput = { eventName: "", topicId: "", description: "" };
  const [input, setInput] = useState(initialInput);

  const oldQuestions = event?.assignOfBridges;
  const convertKey = oldQuestions?.map((el) => ({ id: el?.questionId, timeLimit: el?.timeLimit }));

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
      const topicId = event.topic.id;
      const events = { ...input, topicId: topicId };
      const questions = eventQuestions.map((el) => ({
        id: +el.questionId,
        timeLimit: el.timeLimit,
      }));
      questions.unshift(...convertKey);
      await eventApi.edit(event?.id, { questions: questions, events: events });
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

  return (
    <div className="h-full">
      <div className="flex flex-col h-full gap-8 rounded-lg mb-6 bg-white p-4 shadow">
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 h-full">
          <div className="max-h-[50%] mx-auto">
            <img className="rounded-lg max-h-full" src={event?.eventImage || image} alt="eventImage" />
          </div>
          <div className="bg-white p-3 rounded-lg shadow  text-font-title-card">{edit ? event?.eventName : <Input placeholder={event?.eventName} type="text" onChange={handleChange} name="eventName" />}</div>

          <div className="bg-white p-3 rounded-lg shadow flex justify-start items-start h-[10vh] text-font-body">
            {edit ? event?.description || "Description" : <Input value={input?.description || event?.description} type="text" name="description" onChange={handleChange} />}
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

        <Modal title="Are you ready" open={open}>
          <ReadyAlert onClose={() => setOpen(false)} onClickConfirm={handleClickSinglePlay} />
        </Modal>
        <Modal title="confirm to delete" open={isDelete}>
          <ReadyAlert onClose={() => setIsDelete(false)} onClickConfirm={() => handleClickDelete(event?.id)} />
        </Modal>
      </div>
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
