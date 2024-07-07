import { useState } from "react";
import useTopic from "../../hooks/useTopic";
import useEvent from "../../hooks/useEvent";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRef } from "react";
import { ImageIcon } from "../../icons/Image";
import authEvent from "../../api/event";

export default function CreateEventForm() {
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
  const { setOpen, singleEvent, setSingleEvent } = useEvent();
  //ใช้้handleCHange จัดการ value ใน input
  const [input, setInput] = useState(initialInput);
  const [file, setFile] = useState("");
  //ไว้ ใช้กับ handleError
  const [error, setError] = useState(initialError);
  //   const [isError, setIsError] = useState(false);
  const { topic } = useTopic();
  const fileEl = useRef();

  //   console.log(topic);
  //   console.log(select, "i am select");

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const formatData = () => {
    const formData = new FormData();
    console.log(file);
    console.log(input);
    if (file) {
      formData.append("eventImage", file);
    } else {
      formData.append("eventImage", null);
    }
    for (let data in input) {
      formData.append(`${data}`, `${input[data]}`);
      console.log(data, input[data]);
    }
    console.log(...formData, "this is formdata");
    return formData;
  };

  const EventCreation = async () => {
    try {
      const data = formatData();
      const creatingEvent = await authEvent.create(data);
      const event = await authEvent.getEventByEventId(creatingEvent.event.id);
      setSingleEvent(event);
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
      setOpen(false);
    }
  };
  // console.log(singleEvent, "i am single");
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full ">
        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              name="eventName"
              id=""
              value={input.eventName}
              placeholder="Title"
              onChange={handleChange}
              error={error.eventName}
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
                  className="bg-gray-100 relative"
                  onClick={() => fileEl.current?.click()}
                >
                  <img
                    src={URL.createObjectURL(file)}
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
                  className="flex flex-col items-center gap-2 bg-gray-300 rounded-lg py-8 hover:bg-gray-200 w-full h-full"
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
            <div className="flex flex-col gap-3 h-56 w-3/6">
              <Select
                header="topic"
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
                placeholder="description"
                className={
                  error.description
                    ? "h-full border border-red"
                    : "h-full w-full"
                }
              ></textarea>
              {error.description ? (
                <small className="text-red">{error.description}</small>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-center p-3">
          <Button bg="black">submit</Button>
        </div>
      </form>
    </>
  );
}
