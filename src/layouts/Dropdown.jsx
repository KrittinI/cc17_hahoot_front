import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dropdown() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const { authUser, logout } = useAuth()

    const handleClickLogout = () => {
        setOpen(false)
        logout()
        navigate('/login')
    }


    return (
        <div role='button' className="relative px-8 py-2 " onClick={() => setOpen(prev => !prev)}>
            <Avatar src={authUser?.profileImage} />
            {open && <div className="absolute bg-white right-8 translate-y-2 p-2 w-24 rounded-xl shadow flex flex-col justify-center items-center gap-2">
                {authUser
                    ? <>
                        <Link to={`/users/${authUser.id}`} className="w-full text-center rounded-lg hover:bg-blue-50">Profile</Link>
                        <div className="w-full text-center rounded-lg hover:bg-blue-50" onClick={handleClickLogout}>Log out</div>
                    </>
                    : <>
                        <Link to='/login' className="w-full text-center rounded-lg hover:bg-blue-50">Log in</Link>
                    </>
                }
            </div>}
        </div>
    )
}
