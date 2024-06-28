import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import userImg from "../../assets/user.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AvatarForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState();
  const [select, setSelect] = useState(1);
  const avatarMap = [
    { id: 1, src: input?.googleImage },
    { id: 2, src: userImg },
    { id: 3, src: userImg },
    { id: 4, src: userImg },
    { id: 5, src: userImg },
    { id: 6, src: userImg },
  ];

  const handleClickAvatar = (el) => {
    setSelect(el.id);
    setInput({ ...input, profileImage: el.src });
  };

  const handleClickEnter = () => {
    navigate("/playgame/:eventId");
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg ">
      <Input
        value={input?.username}
        name={`username`}
        onChange={handleChangeInput}
        placeholder={`Username`}
        position={"center"}
      />
      <h1 className="text-font-title-card">Choose Avatar</h1>
      <div className="grid grid-cols-3 gap-2" role="button">
        {avatarMap.map((el) => (
          <Button key={el.id} onClick={() => handleClickAvatar(el)}>
            <Avatar src={el.src} size={100} select={select === el.id} />
          </Button>
        ))}
      </div>

      <Button bg={`black`} width={`full`} onClick={handleClickEnter}>
        Enter
      </Button>
    </div>
  );
}
