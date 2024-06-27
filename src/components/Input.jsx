const positionMap = {
  center: "text-center",
};

export default function Input({
  placeholder,
  type = "text",
  error,
  value = "",
  onChange,
  name,
  size = 3,
  position,
  fontSize,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-${size} py-${size / 2
          } border rounded-md focus:outline-none focus:ring-2 ${positionMap[position]
          } ${fontSize}
            ${error
            ? "border-red focus:ring-red"
            : "border-gray focus:border-blue focus:ring-blue"
          }
                        `}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
      />
      {error ? <small className="text-red">{error}</small> : null}
    </>
  );
}
