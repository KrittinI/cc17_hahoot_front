import UserContextProvider from "../contexts/UserContext";
import UserProfileForm from "../features/authentication/userProfile/components/UserProfileForm";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center mt-20">
      <UserContextProvider>
        <UserProfileForm />
      </UserContextProvider>
    </div>
  );
}
