import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";

export default function EventForm({ data }) {
  return (
    <div className="flex flex-col h-[auto] gap-8 rounded-lg mb-6">
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 ">
        <img src={data?.questionPicture || image} alt="questionPicture" />
        <div className="bg-white p-3">{data?.event?.eventName}</div>
        <div className="bg-white p-3 flex justify-center items-center h-[15vh]">
          {data?.description || "Description"}
        </div>
        <div className="flex gap-4">
          <div
            role="button"
            className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-md hover:bg-grey"
          >
            <EditIcon />
          </div>
          <div
            role="button"
            className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-md hover:bg-grey"
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
