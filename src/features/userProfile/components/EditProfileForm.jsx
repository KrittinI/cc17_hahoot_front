import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useAuth from "../../../hooks/useAuth";
import userImg from "../../../assets/user.png";
import { useState } from "react";
import userApi from "../../../api/user";

export default function EditProfileForm({ onSuccess }) {
  const { authUser, setAuthUser } = useAuth();
  const [input, setInput] = useState(authUser);
  const [select, setSelect] = useState(1);
  const [error, setError] = useState("");
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

  const handleClickSave = async () => {
    try {
      const data = { ...input };
      if (data.username === null || data?.username?.length < 6) {
        return setError("invalid username");
      }
      if (data.password) {
        if (data.password === "firstLogin" || data.password.length < 5) {
          return setError("invalid password");
        }
        if (data.password !== data.confirmPassword) {
          return setError("password and confirmpassword not match");
        }
        delete data.id;
        delete data.confirmPassword;
      }
      const response = await userApi.update(data);
      console.log(response);
      if (response?.status !== 200) {
        return setError(response?.data.message);
      }
      onSuccess();
      setAuthUser({ ...input });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    setError("");
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Choose Avatar</h1>
      <div className="grid grid-cols-3 gap-8" role="button">
        {avatarMap.map((el) => (
          <Button key={el.id} onClick={() => handleClickAvatar(el)}>
            <Avatar src={el.src} size={100} select={select === el.id} />
          </Button>
        ))}
      </div>
      <Input
        value={input?.username}
        name={`username`}
        onChange={handleChangeInput}
        placeholder={`Username`}
      />
      {/* <Input value={input?.email} name={`email`} onChange={handleChangeInput} /> */}
      {authUser?.password === "firstLogin" && (
        <>
          <Input
            value={input?.password}
            name={`password`}
            onChange={handleChangeInput}
            placeholder={`password`}
          />
          <Input
            value={input?.confirmPassword}
            name={`confirmPassword`}
            onChange={handleChangeInput}
            placeholder={`confirmpassword`}
          />
        </>
      )}
      {error && <h1 className="text-darkred">{error}</h1>}
      <Button bg={`black`} width={`full`} onClick={handleClickSave}>
        Save
      </Button>
    </div>
  );
}
