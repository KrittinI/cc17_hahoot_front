import { useState } from "react";
import UserContextProvider from "../contexts/UserContext";
import UserEventAndQuizForm from "../features/userProfile/components/UserEventAndQuizForm";
import SplitScreen from "../layouts/SplitScreen";
import ProfileRight from "../features/userProfile/components/ProfileRight";
import EventForm from "../features/userProfile/components/EventForm";
import QuizForm from "../features/userProfile/components/QuizForm";
import ProfileLeft from "../features/userProfile/components/ProfileLeft";

export default function ProfilePage() {
  const [isQuizForm, setIsQuizForm] = useState(false);
  const [isEventForm, setIsEventForm] = useState(false);
  const [openSeeAll, setOpenSeeAll] = useState("")
  const handleClickOpen = (block) => {
    setOpenSeeAll(block)
  }


  return (
    <div className="w-[68%] mx-auto h-[calc(100vh-164px)]">
      <UserContextProvider>
        <SplitScreen>
          <ProfileLeft setIsQuizForm={setIsQuizForm} setIsEventForm={setIsEventForm} isQuizForm={isQuizForm} isEventForm={isEventForm} setOpenSeeAll={setOpenSeeAll} />
          <ProfileRight isQuizForm={isQuizForm} isEventForm={isEventForm} openSeeAll={openSeeAll} />
        </SplitScreen>
      </UserContextProvider>
    </div>
  );
}
