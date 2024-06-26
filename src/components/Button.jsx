

const bgMap = {
  active: "bg-blue",
  disable: "bg-gray",
  // hh-button
  black: "bg-black text-white rounded-[8px] hover:bg-blue",
  red: "bg-red text-white rounded-[8px] hover:bg-darkred",
  blue: "bg-blue text-white rounded-[8px] hover:bg-darkblue",
  outline: "hover:text-blue",
};

const colorMap = {
  white: "text-white",
  black: "black",
  gray: "text-gray-400",
};

const widthMap = {
  full: "w-full",
  20: "w-20",
  40: "w-40",
  60: "w-60",
};
const marginTopMap = {
  0: "",
  4: "mt-12",
};

const selectMap = {
  true: "bg-blue text-white",
  false: "",
};

export default function Button({
  children,
  bg,
  color,
  width,
  onClick,
  mt,
  select = false,
}) {
  return (
    <button
      className={`px-3 py-1 ${bgMap[bg]} ${colorMap[color]} rounded-md ${widthMap[width]} ${marginTopMap[mt]} ${selectMap[select]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
