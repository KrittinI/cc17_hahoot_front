const displayMap = {
  grid: "",
  flex: "w-48",
};

export default function CardBox({ children, display }) {
  return (
    <div
      role="button"
      className={`
                flex 
                ${displayMap[display]} 
                flex-1 
                flex-col 
                h-64 
                bg-zinc-100 
                shadow 
                p-4 
                justify-between 
                rounded-lg gap-4 
                hover:bg-zinc-200
                `}
    >
      {children}
    </div>
  );
}
