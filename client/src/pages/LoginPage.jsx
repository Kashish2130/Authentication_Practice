import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("signup called");

    try {
      // API call to the signup endpoint using axios
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        user
      );

      if (response.status === 200) {
        console.log("User created:", response.data);
        console.log("welcome", user.firstname);
        // alert("welcome" ,response.data.user.firstname);
        // Optionally clear the form
        setUser({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });

        localStorage.setItem("token", response.data.token);
      } else {
        setMessage(`Error: ${response.data.message}`);
        console.error("Signup error:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  }; // <-- Closing the handleSignup function here.

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login called");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        user
      );
      console.log("API Response: ", response); // Debugging response data

      if (response.status === 200) {
        setMessage("Login successful!");
        console.log("User logged in:", response.data);

        setUser({
          ...user,
          email: "",
          password: "",
        });

        // Show personalized welcome message
        alert(`Welcome ${response.data.user.email}!`);

        // Optionally, store token in localStorage or sessionStorage
        localStorage.setItem("token", response.data.token);
        navigate("/nextpage");
        // You can also store other details like user ID if needed
        // localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        setMessage(`Error: ${response.data.message}`);
        console.error("Login error:", response.data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage(
        "Failed to login. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full rounded-sm border border-solid border-pink ">
      <form className="space-y-4 border border-solid border-black rounded p-8">
        <div className="flex gap-2 items-center justify-center">
          <label>Firstname:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="border border-gray-300 rounded p-2 flex-1"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <label>Lastname:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="border border-gray-300 rounded p-2 flex-1"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 rounded p-2 flex-1"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300 rounded p-2 flex-1"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSignup}
          >
            SIGNUP
          </button>
        </div>
      </form>
      {message && (
        <div className="mt-4 text-center text-green-500">{message}</div>
      )}
    </div>
  );
};

export default LoginPage;
