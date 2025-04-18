import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./pages/About.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Profile from "./pages/Profille.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import Banquet from "./htmlRoute/Banquet.jsx";
// import Book from "./htmlRoute/Book.jsx";
// import Contact from "./htmlRoute/Contact.jsx";
// import Couple from "./htmlRoute/Couple.jsx";
// import Room from "./htmlRoute/Room.jsx";
// import Jashn from "./htmlRoute/Jashn.jsx";
// import HotelGallery from "./htmlRoute/HotelGallery.jsx";
// import AboutUs from "./htmlRoute/AboutUs.jsx"
// import Policy from "./htmlRoute/Policy.jsx";
// import PrivacyPolicy from "./htmlRoute/PrivacyPolicy.jsx";
// import TermsConditions from "./htmlRoute/TermsConditions.jsx";
// import Thanks from "./htmlRoute/Thanks.jsx";
// import Home from "./htmlRoute/Home.jsx";
import Block from "./htmlRoute/Block.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Block/>}/>
        <Route path="/book" element={<Block/>}/>
        {/* <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/banquet" element={<Banquet/>}/>
        <Route path="/book" element={<Book/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/couple" element={<Couple/>}/>
        <Route path="/hotel-gallery" element={<HotelGallery/>}/>
        <Route path="/jashn" element={<Jashn/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/rooms" element={<Room/>}/>
        <Route path="/terms-conditions" element={<TermsConditions/>}/>
        <Route path="/thanks" element={<Thanks/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}
