import Button from "../../components/Button";

const styleMap = {
  flex: "flex flex-col flex-wrap justify-center h-64 gap-6 overflow-y-auto py-2",
  grid: "w-full grid grid-cols-4 overflow-auto gap-2 py-4"
}


export default function CardContainerInProfile({
  title,
  children,
  showSeeAll,
  onClick,
  style = "grid"
}) {
  return (
    <div
      className={`bg-white flex flex-col p-4 shadow-xl rounded-lg min-h-full max-h-full gap-4 `}
    >
      <div className="flex justify-between items-center ">
        <div className="text-center  font-bold text-black text-3xl">
          {title}
        </div>
        <div>
          <Button bg="black" width={20} onClick={onClick}>
            {showSeeAll ? "See All" : "Back"}
          </Button>
        </div>
      </div>
      <hr className="shadow-2 w-full" />
      <div className={`${styleMap[style]}`}>
        {children}
      </div>
    </div>
  );
}
