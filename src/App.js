import { Routes, Route, Outlet } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import { useEventContext } from "./context/context";
import Dashboard from "./components/Dashboard";

// Layout with Navbar
const LayoutWithNavbar = () => {
  const { loading } = useEventContext();

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Landing page without navbar */}
        <Route path="/" element={<WelcomePage />} />

        {/* Pages WITH navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/events" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
