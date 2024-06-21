/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function MenuItem({ active, name, to }) {
    return (
        <Link to={to} className={`px-8 py-2 rounded-lg ${active ? 'bg-blue-400 text-white' : 'hover:bg-blue-50'}`}>
            <h1 className={`${active ? '' : 'text-bold'}`}>{name}</h1>
        </Link>
    )
}
