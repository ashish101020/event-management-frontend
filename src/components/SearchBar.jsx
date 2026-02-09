import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import api from "./api";
import { useEventContext } from "../context/context";

const SearchBar = () => {
  const { setEvents } = useEventContext();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        const res = await api.get("/events");
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, [setEvents]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔍 Search with filters
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.get("/events", {
        params: {
          title: formData.title || undefined,
          type: formData.type || undefined,
          location: formData.location || undefined,
          date: formData.date || undefined,
        },
      });

      setEvents(res.data.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="searchbar-container">
      <h1 style={{ color: "yellowgreen", margin: 0, fontSize: "48px" }}>
        Explore Events
      </h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Search Events"
          className="search-input"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="type"
          placeholder="Event Type (e.g. Music)"
          className="search-input"
          value={formData.type}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="search-input"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="search-input"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
