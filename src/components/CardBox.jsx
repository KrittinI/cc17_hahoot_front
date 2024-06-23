const displayMap = {
  grid: "",
  flex: "w-48",
};

export function CardBox({ children, display }) {
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
const bgMap = {
  red: " bg-red hover:bg-darkred",
  blue: " bg-blue hover:bg-darkblue",
  yellow: " bg-yellow hover:bg-darkyellow",
  green: " bg-green hover:bg-darkgreen",
};

export function CardQuiz({ imageSrc, title, bg, onClick }) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={`
        flex 
        ${bgMap[bg]} 
       max-w-sm rounded overflow-hidden shadow-lg
        `}
    >
      <div className="px-6 py-4">
        <p className="text-white text-font-body">Hahoot</p>
        <div className="text-font-title mb-2 text-white">{title}</div>
        <div>
          <img className="w-full" src={imageSrc} alt={title} />
        </div>
      </div>
    </div>
  );
}
