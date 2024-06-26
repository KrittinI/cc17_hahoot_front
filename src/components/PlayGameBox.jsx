import useAuth from "../hooks/useAuth";
import Avatar from "./Avatar";
import Button from "./Button";
import Input from "./Input";
import userImg from "../assets/user.png";
import { useState } from "react";

export default function PlayGameBox({ width, isButton, isUsername }) {
  const { authUser } = useAuth();
  const [select, setSelect] = useState(0)
  const onSelect = (id) => {
    setSelect(id);
  };
  const avatarMap = [
    { id: 1, src: authUser?.googleImage },
    { id: 2, src: userImg },
    { id: 3, src: userImg },
    { id: 4, src: userImg },
    { id: 5, src: userImg },
    { id: 6, src: userImg },
  ];

  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center w-[${width}%] mx-auto p-4`}
    >
      {isUsername ? <Input placeholder={`username`} width /> : null}
      <div className="grid grid-cols-3 gap-4" role="button">
        {avatarMap.map((el) => (
          <Avatar
            key={el.id}
            src={el.src}
            size={100}
            select={el.id === select}
          />
        ))}
      </div>
      {isButton ? (
        <Button bg={"black"} width={40}>
          Save
        </Button>
      ) : null}
    </div>
  );
}
