import AuthContextProvider from "./contexts/AuthContext";
import QuestionContextProvider from "./contexts/QuestionContext";
import Router from "./routes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <QuestionContextProvider>
          <Router />
        </QuestionContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
