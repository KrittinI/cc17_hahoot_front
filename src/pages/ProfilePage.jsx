// import UserContextProvider from "../contexts/UserContext";
import UserProfileForm from "../features/userProfile/components/UserProfileForm";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)] w-full">
      {/* <UserContextProvider> */}
      <UserProfileForm />
      {/* </UserContextProvider> */}
    </div>
  );
}
