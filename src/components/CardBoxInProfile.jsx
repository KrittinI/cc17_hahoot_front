import DeleteIcon from "../icons/delete";
import EditIcon from "../icons/edit";
import PreviewIcon from "../icons/preview";

export default function CardBoxInProfile({
  image,
  width = 20,
  onClick,
  title,
}) {
  return (
    <div
      className={`bg-white flex flex-col justify-center shadow-xl rounded-lg w-[${width}%]`}
    >
      <div className="h-[50%] rounded-t-lg">
        <img className="rounded-t-lg" src={image} />
      </div>
      <div className="grid grid-cols-1 gap-3 p-3 rounded-lg">
        <div className="{`text-${size}`} text-font-title-card h-10">
          {title}
        </div>
        <div className="flex justify-around">
          <div
            role="button"
            className="flex justify-center items-center w-7 h-7 shadow bg-white rounded-md hover:bg-grey "
            onClick={onClick}
          >
            <EditIcon />
          </div>
          <div
            role="button"
            className="flex justify-center items-center w-7 h-7 shadow bg-white rounded-md hover:bg-grey "
            onClick={onClick}
          >
            <PreviewIcon />
          </div>
          <div
            role="button"
            className="flex justify-center items-center w-7 h-7 shadow bg-white rounded-md hover:bg-grey "
            onClick={onClick}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
