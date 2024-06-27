export default function SeeAllForm({ title, children, hight }) {
  return (
    <div
      className={`bg-white flex flex-col p-6 shadow-xl rounded-lg h-[calc(100vh-${hight}rem)]`}
    >
      <div className="flex justify-between mb-4">
        <div className="text-center mb-2 font-bold text-black text-3xl">
          {title}
        </div>
      </div>
      <hr className="shadow-2 w-full" />
      <div>{children}</div>
    </div>
  );
}
