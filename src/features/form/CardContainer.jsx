import Button from "../../components/Button";

export default function Cardcontainer({ title, children, hight, showSeeAll, onClick }) {
  return (
    <div
      className={`bg-white flex flex-col p-6 shadow-xl rounded-lg h-[calc(100vh-${hight}rem)]`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-center mb-2 font-bold text-black text-3xl">
          {title}
        </div>
        {showSeeAll && <div>
          <Button bg="black" width={20} onClick={onClick}>
            See All
          </Button>
        </div>}
      </div>
      <hr className="shadow-2 w-full" />
      <div>{children}</div>
    </div>
  );
}
