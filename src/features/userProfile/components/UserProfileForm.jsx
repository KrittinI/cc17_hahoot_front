import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Avatar from "../../../components/Avatar";
import useUser from "../../../hooks/useUser";
import Modal from "../../../components/Modal";
import PlayGameBox from "../../../components/PlayGameBox";

const initialInput = {
  username: "",
  password: "",
};
const initialInputError = {
  username: "",
  password: "",
};

export default function UserProfileForm() {
  const { userId } = useParams();
  const { getUser, updateProfileUser } = useUser();
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [input, setInput] = useState(initialInput);
  const [open, setOpen] = useState(false);
  const [inputError, setInputError] = useState(initialInputError);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(userId);
      setProfile(res);
    };
    fetchUser();
  }, [getUser, userId]);

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};

    if (input.password || input.username || avatar) {
      console.log(input.username, input.password);
      if (input.username.length < 5) {
        setInputError({ username: "Username must have at least 6 characters" });
      }

      setInputError({ ...initialInputError });

      if (0 < input.password.length < 5) {
        setInputError((prev) => ({
          ...prev,
          password: "Password must have at least 6 characters",
        }));
      }
      data.username = input.username;
      data.password = input.password;
      data.profileImage = avatar;
      await updateProfileUser(data);
    } else if (!(input.password && input.username && avatar)) {
      alert("Please fill form");
    }
  };

  return (
    <div className="flex justify-center h-[calc(100vh-8rem)] w-full">
      <Modal
        open={open}
        title={"Edit Your Avatar and Username"}
        onClose={() => setOpen(false)}
      >
        <PlayGameBox width={80} />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="username"
            placeholder={profile?.username || "Username"}
            value={input.username}
            onChage={onChangeInput}
            error={inputError.username}
          />
          <Input placeholder={profile?.email || "E-mail"} disabled />
          <Input
            name="password"
            placeholder="Password"
            value={input.password}
            type="password"
            onChage={onChangeInput}
            error={inputError.password}
          />
          <Button bg="black" width="full" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal>
      <form className="bg-white w-72 shadow-xl rounded-lg p-5 flex justify-center items-center flex-col gap-3 absolute">
        <h2 className="text-center mb-2 font-bold text-black text-3xl">
          My profile
        </h2>
        <Avatar
          src={profile?.profileImage || profile?.googleImage}
          size="100"
        />
        <Input placeholder={profile?.username || "Username"} disabled />
        <Input placeholder={profile?.email || "E-mail"} disabled />
        <Button bg="black" width="full" onClick={() => setOpen(true)}>
          Edit profile
        </Button>
      </form>
    </div>
  );
}
