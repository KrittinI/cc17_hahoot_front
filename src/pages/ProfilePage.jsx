
import UserContextProvider from "../contexts/UserContext";
import UserProfileForm from "../features/userProfile/components/UserProfileForm";
import SplitScreen from "../layouts/SplitScreen";

export default function ProfilePage() {
  return (
    <div>
      <UserContextProvider>
        <SplitScreen sizeRatio={70}>
          <div>Hello</div>
          <UserProfileForm />
        </SplitScreen>
      </UserContextProvider>
    </div>
  )
}