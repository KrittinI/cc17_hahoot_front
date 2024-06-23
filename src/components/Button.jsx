const bgMap = {
  blue: "border border-blue-500 bg-blue-500 hover:bg-blue-600",
  sky: "border border-blue-400 bg-blue-400 hover:bg-blue-500",
  green: "border border-green-500 bg-green-500 hover:bg-green-600",
  gray: "border border-gray-200 bg-gray-200 hover:bg-gray-300",
  none: "border border-black hover:bg-gray-300 hover:border-gray-300",
  red: "border border-red-500 bg-red-500 hover:bg-red-600",
  avatar: "",
  disable: "bg-gray-200",
  black: "bg-black text-white rounded-[8px] hover:bg-blue  ",
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
  4: "mt-12",
};
export default function Button({ children, bg, color, width, onClick, mt }) {
  return (
    <button
      className={`px-3 py-1.5 ${bgMap[bg]} ${colorMap[color]} rounded-xl ${widthMap[width]} ${marginTopMap[mt]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
