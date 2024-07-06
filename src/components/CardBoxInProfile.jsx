import { useNavigate } from "react-router-dom";
import image from "../assets/c4.jpeg";
import { HeartIcon } from "../icons/heart";
import Avatar from "../components/Avatar";

// const sizeMap = {
//   full: "w-full",
//   40: "w-40",
// };

export default function CardBoxInProfile({ data, name, type }) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      // className={`${sizeMap[width]} bg-white flex flex-col shadow-xl rounded-lg`}
      className="relative text-left inline-block cursor-pointer w-[190px] h-[240px] rounded-[8px] shadow-xl z-80"
      onClick={() => navigate(`/${name}/${data?.id}`)}
    >
      <div className="bg-white w-[30px] h-[30px] rounded-full absolute right-2 top-2 flex justify-center items-center text-[#D7D7D7]">
        <HeartIcon />
      </div>
      <img
        className="rounded-t-lg w-full"
        src={data?.questionPicture || data?.eventImage || image}
        alt={name}
      />
      <div className="grid grid-cols-1 gap-3 p-2 rounded-lg ">
        <div className="text-font-title-card h-10 overflow-hidden text-ellipsis whitespace-nowrap">
          {data?.question || data?.eventName}
        </div>
      </div>
      <div className="flex p-2 justify-between items-center gap-2 ">
        <Avatar />
        <div className="text-font-title-card text-blue w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{data?.eventName}</div>
      </div>
      {type && (
        <div className="grid grid-cols-1 gap-3 p-1 rounded-lg">
          <div className="text-font-title-card bg-blue w-fit">
            {name?.split("s")}
          </div>
        </div>
      )}
    </div>
  );
}
