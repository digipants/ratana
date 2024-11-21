import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../components/Google.jsx";

export default function Signup() {
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handlechnage = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror(false);
      const response = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      setloading(false);
      if (data.success === false) {
        seterror(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      setloading(false);
      seterror(true);
      console.log(seterror);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7"> Signup</h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handlechnage}
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handlechnage}
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handlechnage}
        ></input>
        <button className="bg-slate-800 rounded-lg uppercase hover:opacity-75 text-white p-3">
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Google />
      </form>
      <div className="flex gap-2 mt-1 ">
        <p>Have an Account?</p>
        <span className="text-blue-900 ">
          <Link to="/signin">Sign In</Link>
        </span>
      </div>
      <p className="text-red-800">{error && "Something went wrong"}</p>
    </div>
  );
}
