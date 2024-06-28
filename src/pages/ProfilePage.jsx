import UserContextProvider from "../contexts/UserContext";
import UserEventAndQuizForm from "../features/userProfile/components/UserEventAndQuizForm";
import UserProfile from "../features/userProfile/components/UserProfile";
// import UserProfileForm from "../features/userProfile/components/UserProfileForm";
import SplitScreen from "../layouts/SplitScreen";

export default function ProfilePage() {
  return (
    <div className="w-[68%] mx-auto h-[calc(100vh-12rem)]">
      <UserContextProvider>
        <SplitScreen sizeRatio={70}>
          <UserEventAndQuizForm />
          {/* <UserProfileForm /> */}
          <UserProfile />
        </SplitScreen>
      </UserContextProvider>
    </div>
  );
}
