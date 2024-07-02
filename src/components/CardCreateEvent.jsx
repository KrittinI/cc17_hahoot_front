import { Button } from "@headlessui/react";

export default function CardCreateEvent() {
  return (
    <div className="bg-white p-8 rounded-3xl flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <div className="flex gap-8 ">
          <div className="bg-[#270764] text-white w-1/2 h-44">Image</div>
          <div className="w-1/2">
            <p>Detail</p>
            <input
              type="text"
              placeholder="Add detail"
              className="bg-white border border-[#DFEAF2] rounded-2xl h-full w-full p-2"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <p>Title</p>
            <input
              placeholder="we are Hahoot"
              type="text"
              className="bg-white border border-[#DFEAF2] rounded-2xl h-full w-full p-2"
            />
          </div>
          <div className="w-1/2">
            <p>Create Date</p>
            <select
              name="Date"
              id=""
              className="bg-white border border-[#DFEAF2] rounded-2xl w-full h-full"
            ></select>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button width="w-[260px]">Save content</Button>
      </div>
    </div>
  );
}
