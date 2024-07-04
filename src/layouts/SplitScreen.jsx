/* eslint-disable react/prop-types */

const sizeMap = {
  10: "w-[10%]",
  20: "w-[20%]",
  30: "w-[30%]",
  40: "w-[40%]",
  50: "w-[50%]",
  60: "w-[60%]",
  70: "w-[70%]",
  75: "w-[75%]",
  80: "w-[80%]",
  90: "w-[90%]",
};

export default function SplitScreen({
  children,
  border = false,
  sizeRatio = 70,
}) {
  const [left, right] = children;
  return (
    <>
      <div className="flex justify-center gap-4 h-full py-6">
        <div
          className={`${sizeMap[sizeRatio]}  h-full ${border ? "border-r" : ""
            }`}
        >
          {left}
        </div>
        <div
          className={`${sizeMap[100 - sizeRatio]} h-full ${border ? "border-l" : ""
            }`}
        >
          {right}
        </div>
      </div>
    </>
  );
}
