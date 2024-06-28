import Avatar from "../../../components/Avatar";
import EditProfileBox from "./EditProfileBox";
import useUser from "../../../hooks/useUser";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

export default function UserProfile() {
    const { authUser } = useAuth();
    const { profile, setProfile } = useUser();


    useEffect(() => {
        if (authUser?.id === profile?.id) {
            setProfile(authUser)
        }
    }, [authUser])

    return (
        <div className="flex flex-col items-center gap-4 h-[auto] w-full bg-white rounded-lg p-6">
            <h2 className="text-font-title">
                {profile?.username}
            </h2>
            <Avatar
                src={profile?.profileImage || profile?.googleImage}
                size="100"
            />
            <h2 className="text-center mb-2 text-font-title">
            </h2>
            <h2 className="text-center mb-2 text-font-title-card">
                E-mail: {profile?.email}
            </h2>
            {authUser?.id === profile?.id && <EditProfileBox />}
            <hr className="mt-2 shadow-md w-[80%]" />
        </div >
    )
}
