import { createContext, useContext, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../components/api.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const userLogin = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLoggedIn(true);
    navigate("/events", { replace: true });
  };

  const userLogOut = () => {
    toast(
      (t) => (
        <div>
          <p style={{ marginBottom: "8px" }}>
            Are you sure you want to logout?
          </p>

          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <button
              onClick={() => {
                localStorage.clear();
                setUser(null);
                setLoggedIn(false);
                navigate("/events", { replace: true });

                toast.dismiss(t.id);
                toast.success("Logged out successfully 👋");
              }}
              style={{
                background: "yellowgreen",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                background: "#e5e7eb",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity },
    );
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (response) => {
      console.log("SUCCESS RESPONSE:", response);

      try {
        setLoading(true)
        const res = await api.post("auth/google", {
          code: response.code,
        });

        console.log("BACKEND RESPONSE:", res.data);

        const { token, user } = res.data;
        userLogin({ token, user });
      } catch (err) {
        if (err.response) {
          console.log("Server Error:", err.response.data);
        } else if (err.request) {
          console.log("No response from server");
        } else {
          console.log("Error:", err.message);
        }
      } finally {
        setLoading(false);
      }
    },

    onError: (error) => {
      console.log("ERROR RESPONSE:", error);
    },
  });

  const requestToOrganizer = async () =>{
    try {
      const res = await api.put("users/request-organizer", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res.data.message);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message)
    }
  }
  // const handleFetchRequests = async () =>{
  //   try {
  //     const res = await api.get("admin/organizer-requests", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const users = res.data.requests;

  //   setRequests(users);
  //   console.log(users)

  //     navigate('/events/requestToOrganizer')

  //     toast.success(res.data.message);

  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.response?.data?.message)
  //   }
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    } else {
      setUser(null);
      setLoggedIn(false);
    }
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        loggedIn,
        setLoggedIn,
        googleLogin,
        userLogOut,
        user,
        setUser,
        userLogin,
        requestToOrganizer,
        loading, setLoading,
        requests,
        setRequests,
        isFormOpen, setIsFormOpen
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEventContext must be used within an EventContextProvider",
    );
  }

  return context;
};
