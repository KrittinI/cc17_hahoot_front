import { useLocation } from "react-router-dom"
import MenuItem from "./MenuItem"

const mentList = [
    { id: 1, name: 'Home', to: '/' },
    { id: 2, name: 'Court', to: '/courts' },
    { id: 3, name: 'Event', to: '/events' },
    // { id: 4, name: 'Payment', to: '/bills' },
]

export default function Menu() {
    const { pathname } = useLocation()
    return (
        <div className="flex">
            {mentList.map(menu => <MenuItem key={menu.id} name={menu.name} to={menu.to} active={pathname === menu.to} />)}
        </div>
    )
}
