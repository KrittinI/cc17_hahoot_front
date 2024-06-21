import Option from "./Option";

export default function Select({ children, onChange, name, error, id, value }) {
    return (
        <select
            id={id}
            className={`w-full border px-3 py-1.5 rounded-md focus:outline-none focus:ring-2
            ${error ? 'border-red-500 focus:ring-red-300'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue300'}`}
            name={name}
            value={value}
            onChange={onChange}>
            <Option selected hidden={true} />
            {children}
        </select>
    )
}
