import React, { useEffect } from "react";
import { useEventContext } from "../context/context";
import api from "../components/api";
import OwnCreatedCard from "../components/OwnCreatedCard";
import Navbar from "../components/Navbar";

const CreatedEvents = () => {
    const { setLoading, setEvents, events, user } = useEventContext();
    useEffect(() => {
    const fetchOwnEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get(`events/user/:${user.id}`);
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnEvents();
  }, [setEvents, user, setLoading]);
    
  return (
    <>
    <Navbar/>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
          gap:"10px"
        }}
      >
        <h1 style={{ color: "yellowgreen" }}>Welcome Organizer!</h1>
        <button
          style={{
            backgroundColor: "lightgreen",
            padding: "5px",
            outline: "none",
            width: "200px",
            height: "50px",
            color: "white",
            fontSize:"16px",
            borderRadius:"8px"
          }}
        >
          + Create New Event
        </button>
      </div>
      <div style={{display:"flex", flexWrap:"wrap"}}>
        {events.length > 0 && (
            events.map((event) => (
                <OwnCreatedCard event={event} key={event._id}/>
            ))
        )}
      </div>
    </div>
    </>
  );
};

export default CreatedEvents;
