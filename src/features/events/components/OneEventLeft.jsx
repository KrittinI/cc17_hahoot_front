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
import FormAddQuestion from "../../../components/FormAddQuestion";

export default function OneEventLeft({
  event,
  favorite,
  handleClickFavorite,
  edit,
  setClickEdit,
  handleClickSinglePlay,
  setNewQuestion,
  setFiles,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { authUser } = useAuth();

  const onSuccess = (input, file) => {
    setNewQuestion((prev) => [...prev, input]);
    if (file) {
      setFiles((prev) => [...prev, file]);
    } else {
      setFiles((prev) => [...prev, null]);
    }
  };

  return (
    <div>
      <div className="flex flex-col h-[auto] gap-8 rounded-lg mb-6 bg-white p-4 shadow">
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 ">
          <img
            className="rounded-lg"
            src={event?.eventImage || image}
            alt="eventImage"
          />
          <div className="bg-white p-3 rounded-lg shadow  text-font-title-card">
            {edit ? (
              event?.eventName
            ) : (
              <Input placeholder={event?.eventName} type="text" />
            )}
          </div>

          <div className="bg-white p-3 rounded-lg shadow flex justify-start items-start h-[10vh] text-font-body">
            {edit ? (
              event?.description || "Description"
            ) : (
              <Input
                placeholder={event?.description || "Description"}
                type="text"
              />
            )}
          </div>

          {edit && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-4 text-font-title-card">
                <div
                  role="button"
                  onClick={() => navigate(`../../users/${event?.user.id}`)}
                >
                  <Avatar
                    src={event?.user?.googleImage || event?.user?.profileImage}
                  />
                </div>
                <div>{event?.user?.username}</div>
              </div>
              <div className="flex gap-x-6">
                <div
                  role="button"
                  className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
                  onClick={handleClickFavorite}
                >
                  {favorite ? <HeartIcon /> : <HeartIconUnfav />}
                </div>
                {event?.creatorId === authUser?.id ? (
                  <>
                    <div
                      role="button"
                      className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
                      onClick={() => {
                        setClickEdit(false);
                      }}
                    >
                      <EditIcon />
                    </div>
                    <div
                      role="button"
                      className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
                    >
                      <DeleteIcon />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>

        {edit ? (
          <div className="grid gap-y-2">
            <Button
              bg="blue"
              width={"full"}
              onClick={() => setOpen(true)}
            >
              Single Play
            </Button>
            <Button
              bg="blue"
              width={"full"}
              onClick={() => navigate("/events/create-event")}
            >
              Create Room
            </Button>
            <Button
              bg={"black"}
              width={"full"}
              onClick={() => navigate("/events")}
            >
              Back
            </Button>
          </div>
        ) : (
          <div className="grid gap-y-4">
            <Button bg="blue" width={"full"} onClick={() => setOpen(true)}>
              Add New Quiz
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <FormAddQuestion
                onSuccess={onSuccess}
                onClose={() => setOpen(false)}
              />
            </Modal>
            <Button bg={"black"} width={"full"}>
              Save
            </Button>
          </div>
        )}
        <Modal title="Are you ready" open={open}>
          <ReadyAlert onClose={() => setOpen(false)} onClickConfirm={handleClickSinglePlay} />
        </Modal>
      </div>
    </div>
  );
}
