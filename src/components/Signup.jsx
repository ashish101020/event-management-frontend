import React, { useState } from "react";
import "./Signup.css";
import { useEventContext } from "../context/context";
import api from "./api";
import toast from "react-hot-toast";

const Signup = () => {
  const { googleLogin, userLogin, setLoading } = useEventContext();

  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setSignupFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setSignupFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", signupFormData.name);
      formData.append("email", signupFormData.email);
      formData.append("password", signupFormData.password);
      formData.append("avatar", signupFormData.avatar);

      const res = await api.post(
        "auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { token, user, message } = res.data;
      userLogin({ token, user });
      toast.success(message)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";

      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1>Sign Up</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="avatar"
            className="input"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="button">
            Sign Up
          </button>
        </form>

        <button
          className="button google-btn"
          onClick={googleLogin}
        >
          Sign Up with Google
        </button>

        <p className="login-text">
          Already have an account? <span className="login-link">Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
