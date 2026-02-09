import React, { useState } from "react";
import { useEventContext } from "../context/context";
import "./Profile.css";
import api from "./api";

const Profile = () => {
  const { user, requestToOrganizer, setUser } = useEventContext();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(user?.name || "");

  if (!user) return <div className="profile-loading">Loading...</div>;

  const handleAvatarSelect = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "users/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prev) => ({ ...prev, ...res.data.user }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">Your Profile</h2>

          <div className="profile-avatar">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : user.avatar?.url ? (
              <img src={user.avatar.url} alt="avatar" />
            ) : (
              user.name?.charAt(0).toUpperCase() || "U"
            )}
          </div>

          <p>{user?.name}</p>
          <p>{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <input
            className="profile-input"
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="profile-input"
            type="email"
            value={user.email}
            disabled
          />

          <label className="avatar-btn">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              hidden
            />
          </label>

          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>

        <p className="profile-role">Role: {user.role}</p>

        {user.role === "Participant" && (
          <button onClick={requestToOrganizer} className="organizer-btn">
            Request Organizer Role
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
