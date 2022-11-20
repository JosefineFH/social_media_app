import "./App.css";
// import "./css/style.css";
import "./sass/style.css";
import NavigationLayout from "./components/Common/Navigation";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavigationLayout />
      </div>
    </AuthProvider>
  );
}

export default App;
