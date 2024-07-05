import { useState } from "react";
import UserContextProvider from "../contexts/UserContext";
import UserEventAndQuizForm from "../features/userProfile/components/UserEventAndQuizForm";
import SplitScreen from "../layouts/SplitScreen";
import ActiveMyQuizEvent from "../features/myQuiz-Event/components/ActiveMyQuizEvent";
import EventForm from "../features/userProfile/components/EventForm";
import QuizForm from "../features/userProfile/components/QuizForm";

export default function ProfilePage() {
  const [isQuizForm, setIsQuizForm] = useState(false);
  const [isEventForm, setIsEventForm] = useState(false);
  const [seeAllProfileData, setSeeAllProfileData] = useState(false);

  return (
    <div className="w-[68%] mx-auto h-[calc(100vh-164px)]">
      <UserContextProvider>
        <SplitScreen>
          {isQuizForm || isEventForm ? (
            <>
              {isEventForm && (
                <EventForm
                  title={"My Event"}
                  setSeeAll={setIsEventForm}
                  setSeeAllProfileData={setSeeAllProfileData}
                />
              )}
              {isQuizForm && (
                <QuizForm
                  title={"My Quizs"}
                  setSeeAll={setIsQuizForm}
                  setSeeAllProfileData={setSeeAllProfileData}
                />
              )}
            </>
          ) : (
            <UserEventAndQuizForm
              setIsQuizForm={setIsQuizForm}
              setIsEventForm={setIsEventForm}
              setSeeAllProfileData={setSeeAllProfileData}
            />
          )}
          <ActiveMyQuizEvent
            isCreateEventOrQuiz={isQuizForm}
            profileData={seeAllProfileData}
          />
        </SplitScreen>
      </UserContextProvider>
    </div>
  );
}
