import {GoogleAuthProvider,getAuth, signInWithRedirect} from 'firebase/auth'
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signinsuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleafterSignInSucces=()=>{
    window.location.href='/home.html'
  }
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithRedirect(auth, provider);
      const res = await fetch('/backend/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signinsuccess(data));
      // navigate('/');
      handleafterSignInSucces();
    } catch (error) {
      console.log('could not login with google', error);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}

