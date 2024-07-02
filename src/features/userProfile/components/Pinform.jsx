import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import Logo from "../../../icons/Logo";

const initialInput = {
  pincode: "",
};

export default function Pinform({ setPin }) {
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);

  const onClickCloseForm = () => {
    navigate("/");
  };

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setPin(input);
  };

  return (
    <>
      <form
        className=" bg-white w-72 shadow-xl rounded-lg p-5 flex justify-center items-center flex-col gap-3 relative"
        onSubmit={handleSubmitForm}
      >
        <h2 className="text-center mb-2 font-bold text-black text-3xl">
          <Logo />
        </h2>
        <div role="button" className="absolute top-1 right-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-red"
            onClick={onClickCloseForm}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <>
          <Input
            name="pincode"
            placeholder="PIN Code"
            position="center"
            value={input.pincode}
            onChange={onChangeInput}
          />
          <Button width="full" bg="black">
            Enter
          </Button>
        </>
      </form>
    </>
  );
}
