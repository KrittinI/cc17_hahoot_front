import AuthContextProvider from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
