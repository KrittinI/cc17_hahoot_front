import AuthContextProvider from "./contexts/AuthContext";
import EventContextProvider from "./contexts/EventContext";
import QuestionContextProvider from "./contexts/QuestionContext";
import TopicContextProvider from "./contexts/TopicContext";
import Router from "./routes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <TopicContextProvider>
          <EventContextProvider>
            <QuestionContextProvider>
              <Router />
            </QuestionContextProvider>
          </EventContextProvider>
        </TopicContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
