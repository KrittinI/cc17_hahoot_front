export default function Cardcontainer({ title, children }) {
  return (
    <div
      className={`bg-white flex flex-col p-6 shadow-xl rounded-lg min-h-[80vh] gap-4`}
    >
      <div className="flex justify-between items-center gap-4 ">
        <div className="text-center  font-bold text-black text-3xl">
          {title}
        </div>
      </div>
      <hr className="shadow-2 w-full" />
      <div className="w-full grid grid-cols-4 h-auto gap-2 pt-4">
        {children}
      </div>
    </div>
  );
}
