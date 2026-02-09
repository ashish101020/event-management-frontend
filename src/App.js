import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/welcomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import EventRegistration from "./pages/EventRegistration";
import CreatedEvents from "./pages/CreatedEvents";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/events" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/created-events" element={<CreatedEvents />} />
        <Route path="/event-registrations" element={<EventRegistration />} />
      </Routes>
    </div>
  );
}

export default App;
