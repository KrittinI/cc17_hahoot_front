/* eslint-disable react/prop-types */

export default function SplitScreen({ children, border = false }) {
    const [left, right] = children;
    return (
        <div className="flex ">
            <div className={`w-[70%] p-8 ${border ? "border-r" : ""}`}>{left}</div>
            <div className={`w-[30%] p-8 ${border ? "border-l" : ""}`}>{right}</div>
        </div>
    )
}
