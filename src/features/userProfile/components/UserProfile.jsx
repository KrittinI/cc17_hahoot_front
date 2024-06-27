import Avatar from "../../../components/Avatar";
import EditProfileBox from "./EditProfileBox";
import useUser from "../../../hooks/useUser";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

export default function UserProfile() {
    const { authUser } = useAuth()
    const { profile, setProfile } = useUser()

    useEffect(() => {
        if (authUser?.id === profile?.id) {
            setProfile(authUser)
        }
    }, [authUser, profile])

    return (
        <div className="flex flex-col items-center gap-4 h-[calc(100vh-8rem)] w-full bg-white rounded-lg p-2">
            <h2 className="text-center mb-2 font-bold text-black text-3xl">
                {profile?.username}
            </h2>
            <Avatar
                src={profile?.profileImage || profile?.googleImage}
                size="100"
            />
            <h2 className="text-center mb-2 font-bold text-black text-3xl">
            </h2>
            <h2 className="text-center mb-2  text-black text-l">
                Email: {profile?.email}
            </h2>
            {authUser?.id === profile?.id && <EditProfileBox />}
            <hr className="mt-2 shadow-md w-[80%]" />
        </div >
    )
}
