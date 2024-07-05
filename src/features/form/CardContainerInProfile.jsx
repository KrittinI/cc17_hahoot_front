import Button from "../../components/Button";

const styleMap = {
  flex: "flex flex-col flex-wrap justify-center h-60 gap-6 overflow-y-auto ",
  grid: "w-full grid grid-cols-4 h-auto gap-2 pt-4"
}


export default function CardContainerInProfile({
  title,
  children,
  hight,
  showSeeAll,
  onClick,
  style = "grid"
}) {
  return (
    <div
      className={`bg-white flex flex-col p-6 shadow-xl rounded-lg h-[calc(100vh-${hight}rem)]`}
    >
      <div className="flex justify-between items-center ">
        <div className="text-center  font-bold text-black text-3xl">
          {title}
        </div>
        {showSeeAll ? (
          <div>
            <Button bg="black" width={20} onClick={onClick}>
              See All
            </Button>
          </div>
        ) : (
          <div>
            <Button bg="black" width={20} onClick={onClick}>
              Back
            </Button>
          </div>
        )}
      </div>
      <hr className="shadow-2 w-full" />
      <div className={`${styleMap[style]}`}>
        {children}
      </div>
    </div>
  );
}
