import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    preference: "",
    roles: ["user"],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      setMessage("User registered successfully");
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 bg-brown-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-gray-500"> BookRecs</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-50">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="input input-bordered w-full h-10"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-50">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="input input-bordered w-full h-10"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-gray-50">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="input input-bordered w-full h-10"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-50">
                Preference
              </span>
            </label>
            <input
              type="text"
              name="preference"
              placeholder="Enter preference"
              className="input input-bordered w-full h-10"
              value={formData.preference}
              onChange={handleChange}
            />
          </div>

          <a
            href="#"
            className="text-sm hover:underline hover:text-green-300 mt-2 inline-block"
          >
            Already have an account?
          </a>
          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2">
              Sign Up
            </button>
          </div>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
