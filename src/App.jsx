import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import AllCarsDisplay from "./pages/AllCarsDisplay";
import Booking from "./pages/Booking";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-reset" element={<ForgotPassword />} />
      <Route path="/cars" element={<AllCarsDisplay />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
