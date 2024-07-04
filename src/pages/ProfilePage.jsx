import { useState } from "react";
import UserContextProvider from "../contexts/UserContext";
import SplitScreen from "../layouts/SplitScreen";
import ProfileRight from "../features/userProfile/components/ProfileRight";
import ProfileLeft from "../features/userProfile/components/ProfileLeft";

export default function ProfilePage() {
  const [isQuizForm, setIsQuizForm] = useState(false);
  const [isEventForm, setIsEventForm] = useState(false);


  return (
    <div className="w-[68%] mx-auto h-[calc(100vh-164px)]">
      <UserContextProvider>
        <SplitScreen>
          <ProfileLeft setIsQuizForm={setIsQuizForm} setIsEventForm={setIsEventForm} isQuizForm={isQuizForm} isEventForm={isEventForm} />
          <ProfileRight isQuizForm={isQuizForm} isEventForm={isEventForm} />
        </SplitScreen>
      </UserContextProvider>
    </div>
  );
}
