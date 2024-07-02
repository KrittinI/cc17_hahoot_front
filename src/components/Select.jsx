import Option from "./Option";

export default function Select({ children, onChange, name, error, id, value, header }) {
  return (
    <select
      id={id}
      className={`w-full border px-3 py-1.5 rounded-md focus:outline-none focus:ring-2
            ${error ? "border-red focus:ring-red" : "border-gray-300 focus:border-blue focus:ring-blue"}`}
      name={name}
      value={value}
      onChange={onChange}
    >
      <Option selected hidden={true} name={header} />
      {children}
    </select>
  );
}
