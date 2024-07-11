import { useState } from "react";
import useTopic from "../../hooks/useTopic";
import useEvent from "../../hooks/useEvent";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRef } from "react";
import { ImageIcon } from "../../icons/Image";
import { useNavigate } from "react-router-dom";

export default function CreateEventForm({ onClose }) {
  const initialInput = {
    eventName: "",
    topicId: "",
    description: "",
  };
  const initialError = {
    eventName: "",
    topicId: "",
    description: "",
  };
  const navigate = useNavigate();
  const { setSingleEvent } = useEvent();

  const [input, setInput] = useState(initialInput);
  const [file, setFile] = useState("");

  const [error, setError] = useState(initialError);

  const { topic } = useTopic();
  const fileEl = useRef();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const EventCreation = async () => {
    try {
      setSingleEvent({ ...input, file });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    for (let field in input) {
      if (!input[field]) {
        setError((prev) => ({ ...prev, [field]: `${field} is required` }));
        hasError = true;
      }
    }

    if (!hasError) {
      EventCreation();
      onClose();
    }
  };
  const handleClickCancle = () => {
    setSingleEvent(null)
    onClose();
    navigate(-1)
  };

  return (
    <>
      <div className="w-full px-4">
        <hr className="shadow-2 text-grey" />
      </div>

      <form onSubmit={handleSubmit} className="w-full p-4">
        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              name="eventName"
              id=""
              value={input.eventName}
              placeholder="Enter Your Title"
              onChange={handleChange}
              error={error.eventName}
              position={"center"}
            />
          </div>
          <div className="flex gap-3 ">
            <div className="w-3/6 h-56">
              <input
                type="file"
                name="eventPicture"
                id="eventPicture"
                ref={fileEl}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              {file ? (
                <div
                  role="button"
                  className="bg-gray-100 relative w-full h-full"
                  onClick={() => fileEl.current?.click()}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="post"
                    className="mx-auto w-full h-full object-cover"
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
                  className="flex flex-col justify-center items-center gap-2 bg-grey rounded-lg py-8 hover:bg-darkgrey w-full h-full"
                  onClick={() => fileEl.current?.click()}
                >
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
            <div className="flex flex-col gap-3 h-50 w-3/6 justify-center">
              <Select
                header="Topic"
                value={input.topicId}
                onChange={handleChange}
                name="topicId"
                error={error.topicId}
              >
                {topic?.map((el, index) => (
                  <option value={el.id} key={index}>
                    {el.topicName}
                  </option>
                ))}
              </Select>

              <textarea
                name="description"
                id="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Enter Description"
                className={`  border-grey p-2 rounded-md h-full
                  error.description
                    ? "h-full border border-red"
                    : "h-full w-full"`}
              ></textarea>
              {error.description ? (
                <small className="text-red">{error.description}</small>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button bg="black" width={40} onClick={handleClickCancle}>
            Cancel
          </Button>
          <Button bg="blue" width={40}>
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
