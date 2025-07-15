import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import AllCarsDisplay from "./pages/AllCarsDisplay";
import Booking from "./pages/Booking";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

import KycPromptModal from "./components/KycPromptModal";
import { useUser } from "./components/contexts/UserContext";

import ProtectedRoute from "./components/route/ProtectedRoute";

import Dashboard from "./pages/Dashboard"; 
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const { user, loading } = useUser();
  const [showKycModal, setShowKycModal] = useState(false);

  useEffect(() => {
    if (
      !loading &&
      user &&
      !user.hasCompletedKyc &&
      !location.pathname.startsWith("/dashboard")
    ) {
      setShowKycModal(true);
    } else {
      setShowKycModal(false);
    }
  }, [user, loading, location]);

  return (
    <>
      {!loading && (
        <KycPromptModal
          show={showKycModal}
          onClose={() => setShowKycModal(false)}
        />
      )}

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Customer Auth Routes */}
        <Route path="/signup" element={<Signup userRole="customer" />} />
        <Route path="/login" element={<Login userRole="customer" />} />

        {/* Admin Auth Routes */}
        <Route path="/admin/signup" element={<Signup userRole="admin" />} />
        <Route path="/admin/login" element={<Login userRole="admin" />} />

        {/* Single Protected Dashboard for both user roles */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Booking route requires login and KYC */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute requireKyc>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/password-reset" element={<ForgotPassword />} />
        <Route path="/cars" element={<AllCarsDisplay />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
