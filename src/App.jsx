import AuthContextProvider from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
