import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signinstart,
  signinsuccess,
  signinfailure
} from "../redux/user/userSlice.js"
import { useDispatch, useSelector } from "react-redux";
import Google from "../components/Google.jsx";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinstart())
      const res = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinfailure(data));
        return;
      }
      dispatch(signinsuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(signinfailure(error));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <Google/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/signup'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
        
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  );
}


//   devs
//  rYqA55GUiGN0flKd