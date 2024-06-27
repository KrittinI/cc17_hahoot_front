import UserContextProvider from "../contexts/UserContext";
import UserEventAndQuizForm from "../features/userProfile/components/UserEventAndQuizForm";
import UserProfile from "../features/userProfile/components/UserProfile";
import SplitScreen from "../layouts/SplitScreen";

export default function ProfilePage() {
  return (
    <div className="w-[80%] mx-auto">
      <UserContextProvider>
        <SplitScreen sizeRatio={70}>
          <UserEventAndQuizForm />
          <UserProfile />
        </SplitScreen>
      </UserContextProvider>
    </div>
  );
}
