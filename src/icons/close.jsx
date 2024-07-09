const sizeMap = {
  4: "size-4",
  5: "size-5",
  6: "size-6",
  10: "size-10",
  12: "size-12",
};
const colorMap = {
  green: "#00CB4A",
  black: "#ffffff",
  red: "#FB7185"
}
export default function CloseIcon({size=6, color}) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // fill={`${colorMap[color]}`}
        className={`${sizeMap[size]}`}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={`${colorMap[color]}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
