import { HeartIcon } from "../../../icons/heart";
import image from "../../../assets/c4.jpeg";
import DeleteIcon from "../../../icons/delete";
import EditIcon from "../../../icons/edit";
import Button from "../../../components/Button";

export default function EventForm({ data }) {
  return (
    <div>
      <div className="flex flex-col h-[auto] gap-8 rounded-lg mb-6 bg-white p-4 shadow">
        <div className="flex flex-col gap-4 border-b border-gray-300 pb-4 ">
          <img
            className="rounded-lg"
            src={data?.questionPicture || image}
            alt="questionPicture"
          />
          <div className="bg-white p-3 rounded-lg shadow  text-font-title-card">
            {data?.event?.eventName}
          </div>
          <div className="bg-white p-3 rounded-lg shadow flex justify-start items-start h-[10vh] text-font-body">
            {data?.description || "Description"}
          </div>
          <div className="flex justify-center gap-12">
            <div
              role="button"
              className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
            >
              <HeartIcon />
            </div>
            <div
              role="button"
              className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
            >
              <EditIcon />
            </div>
            <div
              role="button"
              className="flex justify-center items-center w-12 h-12 shadow bg-white rounded-full hover:bg-grey"
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div
          className="grid gap-y-4
        "
        >
          <Button bg="blue" width={"full"}>
            Create Room
          </Button>
          <Button bg={"black"} width={"full"}>
            Back
          </Button>
        </div>

        {/* if claick on btn-edit */}
        {/* <div
          className="grid gap-y-4
        "
        >
          <Button bg="blue" width={"full"}>
            Add New Quiz
          </Button>
          <Button bg={"black"} width={"full"}>
            Save
          </Button>
        </div> */}

      </div>
    </div>
  );
}
