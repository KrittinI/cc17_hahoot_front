import Option from "./Option";

export default function Select({ children, onChange, name, error, id, value, header }) {
  return (
    <>
      <select
        id={id}
        className={`w-full border px-2 py-2 rounded-md focus:outline-none focus:ring-2
            ${error ? "border-red focus:ring-red" : "border-grey focus:border-blue focus:ring-blue"}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        <Option selected hidden={true} name={header} />
        {children}
      </select>
      {error ? <small className="text-red">{error}</small> : null}
    </>
  );
}
