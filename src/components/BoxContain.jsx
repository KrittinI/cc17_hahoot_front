import Button from "./Button";

export default function BoxContain({ title, onClick, children, hight }) {
  return (
    <div
      className={`bg-white flex flex-col p-8 shadow-xl rounded-lg h-[calc(100vh-${hight}rem)]`}
    >
      <div className="flex justify-between mb-4">
        <div className="text-center mb-2 font-bold text-black text-3xl">
          {title}
        </div>
        <Button bg="black" width={20} onClick={onClick}>
          See All
        </Button>
      </div>
      <hr className="shadow-2 w-full" />
      <div>{children}</div>
    </div>
  );
}
