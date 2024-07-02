/* eslint-disable no-unused-vars */
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
  25: "w-25",
  30: "w-30",
  35: "w-35",
  40: "w-40",
  60: "w-60",
};
const marginTopMap = {
  4: "mt-12",
};

export default function Button({ bg, width, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-${bg} text-white py-2 px-4 rounded-lg w-${width} text-lg font-bold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-${bg} focus:ring-opacity-50`}
    >
      {children}
    </button>
  );
}
