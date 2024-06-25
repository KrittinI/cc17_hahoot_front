import { useParams } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import { useEffect } from "react";
import { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Avatar from "../../../../components/Avatar";
import userImage from "../../../../assets/user.png";

const initialInput = {
  username: "",
  profileImage: "",
  password: "",
  confirmPassword: "",
};

export default function UserProfileForm() {
  const { userId } = useParams();
  const { getUser, updateProfileUser } = useUser();
  const [profile, setProfile] = useState(null);
  const [input, setInput] = useState(initialInput);

  useEffect(() => {
    const getme = async () => {
      const res = await getUser(userId);
      setProfile(res);
    };
    getme();
  }, [getUser, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.username = input.username;
    data.password = input.password;
    data.confirmPassword = input.confirmPassword;
    data.profileImage = input.profileImage;
    await updateProfileUser(data);
  };

  const onChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectAvatar = (e) => {
    setInput({ profileImage: e.target.src });
  };

  const onChangeAvatar = (e) => {
    setInput({ profileImage: e.target.src });
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center p-4 gap-6 bg-pink-200 w-60"
        onClick={handleSelectAvatar}
      >
        <div>My avatar</div>
        <Avatar src={profile?.profileImage} />
        <div>select avatar</div>
        <img
          src={userImage}
          role="button"
          className="h-14 w-14"
          onChange={onChangeAvatar}
        />
        <img
          src={profile?.profileImage}
          role="button"
          className="h-14 w-14"
          onChange={onChangeAvatar}
        />
        <Button>select Avatar</Button>
      </form>

      <form
        className="flex flex-col justify-center items-center p-4 gap-6 bg-pink-200 w-60"
        onClick={handleSubmit}
      >
        <div className="flex items-center gap-5">
          <Avatar src={input?.profileImage || profile?.profileImage} />
          <div className="h-44 w-full flex flex-col gap-4">
            <Input
              placeholder={profile?.username || "Username"}
              onChage={onChangeInput}
              name="username"
              value={input.username}
            />
            <Input
              placeholder={profile?.password || "Password"}
              onChage={onChangeInput}
              name="password"
              value={input.password}
              type="password"
            />
            <Input
              placeholder="Confirm password"
              onChage={onChangeInput}
              name="confirmPassword"
              value={input.confirmPassword}
              type="password"
            />
            <Button>update</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
