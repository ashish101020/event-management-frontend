import React, { useState } from "react";
import "./Signup.css"; // reusing same styles
import { useEventContext } from "../context/context";
import api from "./api";
import toast from "react-hot-toast";

const Login = () => {
  const { googleLogin, userLogin } = useEventContext();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("auth/login", loginFormData);

      const { token, user, message } = res.data;

      userLogin({ token, user });
      toast.success(message);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";

      console.error(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1>Login</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <button
          className="button"
          style={{ color: "rebeccapurple" }}
          onClick={googleLogin}
        >
          Login with Google
        </button>

        <p className="login-text">
          Don't have an account? <span className="login-link">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
