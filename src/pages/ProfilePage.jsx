import UserContextProvider from "../contexts/UserContext";
import UserEventAndQuizForm from "../features/userProfile/components/UserEventAndQuizForm";
import UserProfileForm from "../features/userProfile/components/UserProfileForm";
import SplitScreen from "../layouts/SplitScreen";

export default function ProfilePage() {
  return (
    <div>
      <UserContextProvider>
        <SplitScreen sizeRatio={60}>
          <UserEventAndQuizForm />
          <UserProfileForm />
        </SplitScreen>
      </UserContextProvider>
    </div>
  );
}
