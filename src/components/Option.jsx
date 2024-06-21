export default function Option({ value = 0, name = "Select", isActive }) {
    return (
        <option
            hidden={isActive}
            value={value}>
            {name}
        </option>
    )
}
