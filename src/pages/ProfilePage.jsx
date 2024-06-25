
import UserContextProvider from "../contexts/UserContext";
import UserProfileForm from "../features/userProfile/components/UserProfileForm";
import SplitScreen from "../layouts/SplitScreen";

export default function ProfilePage() {
  return (
    <div>
      <UserContextProvider>
        <SplitScreen>
          <div>Hello</div>
          <UserProfileForm />
        </SplitScreen>
      </UserContextProvider>
    }