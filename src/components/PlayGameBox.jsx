import useAuth from "../hooks/useAuth";
import Avatar from "./Avatar";
import Button from "./Button";
import Input from "./Input";

export default function PlayGameBox({ width }) {
    const { authUser } = useAuth()
    return (
        <div className={`flex flex-col gap-4 justify-center items-center w-[${width}%] mx-auto p-4`}>
            <Input placeholder={`username`} width />
            <div className="grid grid-cols-3 gap-4">
                <Avatar src={authUser?.googleImage} size={100} />
                <Avatar src={authUser?.googleImage} size={100} />
                <Avatar src={authUser?.googleImage} size={100} />
                <Avatar src={authUser?.googleImage} size={100} />
            </div>
            <Button bg={'black'} width={40}>Save</Button>
        </div>
    )
}
