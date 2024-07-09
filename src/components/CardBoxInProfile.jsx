import { useNavigate } from "react-router-dom";
import image from "../assets/c4.jpeg";
import { HeartIcon, HeartIconUnfav } from "../icons/heart";
import Avatar from "../components/Avatar";

// const sizeMap = {
//   full: "w-full",
//   40: "w-40",
// };

export default function CardBoxInProfile({ data, name, type }) {
  const navigate = useNavigate();
  return (
    <div
      // className={`${sizeMap[width]} bg-white flex flex-col shadow-xl rounded-lg`}
      className="relative text-left inline-block cursor-pointer w-[190px] h-[240px] rounded-[8px] shadow-md z-80 hover:w-[194px] hover:h-[245px] "
      onClick={() => navigate(`/${name}/${data?.id}`)}
    >
      <div className="bg-white w-[30px] h-[30px] rounded-full absolute right-2 top-2 flex justify-center items-center text-[#D7D7D7]">
        {/* {favorite ? <HeartIcon /> : <HeartIconUnfav />} */}
        {data?.QuestionFavorite?.length || data?.EventFavorites?.length ? (
          <HeartIcon />
        ) : (
          <HeartIconUnfav />
        )}
      </div>
      <div className="bg-gray-100 rounded-t-[8px] flex justify-center">
        <img
          className="overflow-hidden object-cover aspect-[16/11] rounded-t-lg"
          src={data?.questionPicture || data?.eventImage || image}
          alt={name}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 px-2 pt-3 pb-2 rounded-lg hover:pt-4 ">
        <div className="text-font-title-card h-10 overflow-hidden text-ellipsis whitespace-nowrap">
          {data?.question || data?.eventName}
        </div>
      </div>
      <div className="flex justify-between items-center px-2  ">
        <Avatar src={data?.user?.profileImage || data?.user?.googleImage} />
        <div className="text-font-title-card text-blue">
          {data?.topic?.topicName}
        </div>
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
