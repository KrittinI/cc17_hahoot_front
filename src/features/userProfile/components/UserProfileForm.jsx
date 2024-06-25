import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { useEffect } from "react";
import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Avatar from "../../../components/Avatar";
import CardBox from "../../../components/CardBox";

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
  console.log(profile);
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

  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-8rem)] w-full relative"></div>
      <div className="flex gap-4 bg-white p-4 rounded-2xl w-72">
        <form
          className="bg-white w-72 shadow-xl rounded-lg p-5 flex justify- items-center flex-col gap-3 absolute top-20"
          onClick={handleSubmit}
        >
          <div className="flex flex-col items-center gap-5">
            <Avatar src={profile?.profileImage} />
            <div>
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
                <CardBox display="flex">
                  <div>title</div>
                </CardBox>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
