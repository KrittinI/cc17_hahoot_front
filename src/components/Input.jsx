const positionMap = {
  center: "text-center",
};

export default function Input({ placeholder, type = "text", error, value = "", onChange, onClick, name, position, fontSize, width = 'full' }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-${width} px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 ${positionMap[position]} ${fontSize}
            ${error ? "border-red focus:ring-red" : "border-gray focus:border-blue focus:ring-blue"}
                        `}
        value={value}
        onChange={onChange}
        onClick={onClick}
        name={name}
        id={name}
      />
      {error ? <small className="text-red">{error}</small> : null}
    </>
  );
}
