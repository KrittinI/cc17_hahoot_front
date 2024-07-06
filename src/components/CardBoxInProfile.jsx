import { useNavigate } from "react-router-dom";
import image from "../assets/c4.jpeg";

const sizeMap = {
  full: "w-full",
  40: "w-40",
};

export default function CardBoxInProfile({ data, name, width = "full", type }) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      className={`${sizeMap[width]} bg-white flex flex-col shadow-xl rounded-lg`}
      onClick={() => navigate(`/${name}/${data?.id}`)}
    >
      <img
        className="rounded-t-lg w-full"
        src={data?.questionPicture || data?.eventImage || image}
        alt={name}
      />
      <div className="grid grid-cols-1 gap-3 p-1 rounded-lg">
        <div className="text-font-title-card h-10 overflow-hidden text-ellipsis whitespace-nowrap">
          {data?.question || data?.eventName}
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
