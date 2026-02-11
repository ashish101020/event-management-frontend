import React, { useState } from "react";
import { useEventContext } from "../context/context";
import api from "./api";
import './FormPopup.css';

const FormPopup = () => {

    const { setIsFormOpen } = useEventContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    eventType: "Offline",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "events",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event Created Successfully 🎉");
      console.log(res.data);
      setIsFormOpen(false);

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create event");
    }
  };

  const onClose = () => {
    setIsFormOpen(false);
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Create Event</h2>

        <form onSubmit={handleSubmit} className="form">
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />

          <input type="date" name="startDate" onChange={handleChange} required />
          <input type="time" name="startTime" onChange={handleChange} required />

          <input type="date" name="endDate" onChange={handleChange} required />
          <input type="time" name="endTime" onChange={handleChange} required />

          <input name="location" placeholder="Location" onChange={handleChange} required />

          <select name="eventType" onChange={handleChange}>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>

          <input name="category" placeholder="Category" onChange={handleChange} required />
          <input type="file" name="image" placeholder="Image URL" onChange={handleChange} />

          <button type="submit">Create Event</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default FormPopup;
