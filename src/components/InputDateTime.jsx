import { getToday } from "../utils/get-today";

export default function InputDateTime({ placeholder, type = "datetime-local", error, value, onChage, name, size = 3 }) {
    const today = getToday()
    return (
        <>
            <input
                type={type}
                min={today}
                placeholder={placeholder}
                className={`w-full px-${size} py-${size / 2} border rounded-md focus:outline-none focus:ring-2 
            ${error ? 'border-red-500 focus:ring-red-300'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue300'}
                        `}
                value={value}
                onChange={onChage}
                name={name}
            />
            {error ? <small className="text-red-500">{error}</small> : null}
        </>
    )
}

