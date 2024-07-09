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
};
export default function CorrectIcon({ size = 10, color = "green " }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={`${colorMap[color]}`}
        className={`${sizeMap[size]}`}
      >
        <path
          fillRule="evenodd"
          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
