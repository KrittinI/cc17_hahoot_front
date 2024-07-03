import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import { HeartIconHover } from "../../../icons/heart";

export default function ActiveMyQuizEvent() {
  return (
    <div className="flex flex-col items-center gap-4 h-[auto] w-full bg-white rounded-lg p-6">
      <h2 className="text-font-title">username</h2>
      <Avatar size={100} />
      <h2 className="text-center mb-2 text-font-title-card">E-mail:</h2>
      <hr className="mt-2 shadow-md w-[80%]" />
      <Button bg={"black"} width={"full"}>
        Edit Profile
      </Button>

      <Button bg={"blue"} width={"full"}>
        Add New Event
      </Button>

      <Button bg={"red"} width={"full"}>
        <div className="flex w-full justify-center items-center gap-x-2">
          <HeartIconHover />
          My Favorite
        </div>
      </Button>
    </div>
  );
}
