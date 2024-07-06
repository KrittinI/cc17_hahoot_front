import { useEffect } from "react";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { HeartIconHover } from "../../../icons/heart";
import EditProfileBox from "./EditProfileBox";
import { useNavigate } from "react-router-dom";

export default function ProfileRight({ isQuizForm, isEventForm }) {
  const { authUser } = useAuth();
  const { profile, setProfile } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.id === profile?.id) {
      setProfile(authUser);
    }
  }, [authUser, profile]);
  return (
    <div className="flex flex-col items-center gap-4 h-[auto] w-full bg-white rounded-lg p-6">
      <h2 className="text-font-title">{profile?.username}</h2>
      <Avatar size={100} src={profile?.profileImage} />
      <h2 className="text-center mb-2 text-font-title-card">{`E-mail : ${profile?.email}`}</h2>
      <hr className="mt-2 shadow-md w-[80%]" />
      {authUser?.id === profile?.id && (
        <>
          <EditProfileBox />
          {isEventForm || isQuizForm ? (
            <>
              {isQuizForm && (
                <Button
                  bg={"blue"}
                  width={"full"}
                  onClick={() => navigate("/questions/create-question")}
                >
                  Add New Quiz
                </Button>
              )}
              {isEventForm && (
                <Button
                  bg={"blue"}
                  width={"full"}
                  onClick={() => navigate("/events/create-event")}
                >
                  Add New Event
                </Button>
              )}
              <Button
                bg={"red"}
                width={"full"}
                onClick={() => navigate(`/myfavorite/users/${profile?.id}`)}
              >
                <div className="flex w-full justify-center items-center gap-x-2">
                  <HeartIconHover />
                  My Favorite
                </div>
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
