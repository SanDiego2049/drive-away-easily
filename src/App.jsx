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
import MyBookings from "./components/dashboard/MyBookings";

import ProtectedRoute from "./components/route/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import DashboardHome from "./components/dashboard/DashboardHome";
import DashboardProfile from "./components/dashboard/DashboardProfile";
import KycApproval from "./components/dashboard/KycApproval";
import DashboardSettings from "./components/dashboard/DashboardSettings";
import VehicleManagement from "./components/dashboard/VehicleManagement";
import ManageBookings from "./components/dashboard/ManageBookings";
import Payment from "./pages/Payment";

function App() {
  const location = useLocation();
  const { user, loading } = useUser();
  const [showKycModal, setShowKycModal] = useState(false);

  useEffect(() => {
    const hasSeenKycModal = sessionStorage.getItem("hasSeenKycModal");

    if (
      !loading &&
      user &&
      user.role === "user" &&
      !user.hasCompletedKyc &&
      !location.pathname.startsWith("/dashboard") &&
      !hasSeenKycModal
    ) {
      setShowKycModal(true);
      sessionStorage.setItem("hasSeenKycModal", "true");
    }
  }, [loading, user, location.pathname]);

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
        <Route path="/signup" element={<Signup userRole="user" />} />
        <Route path="/login" element={<Login userRole="user" />} />

        {/* Admin Auth Routes */}
        <Route path="/admin/signup" element={<Signup userRole="admin" />} />
        <Route path="/admin/login" element={<Login userRole="admin" />} />

        {/* User dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* user dashboard nested routes */}
          <Route index element={<DashboardHome />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="settings" element={<DashboardSettings />} />
          {/* ... other user dashboard routes */}
        </Route>

        {/* Admin dashboard */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* admin dashboard nested routes */}
          <Route index element={<DashboardHome />} />
          <Route path="kyc-approvals" element={<KycApproval />} />
          <Route path="vehicle-management" element={<VehicleManagement />} />
          <Route path="profile" element={<DashboardProfile />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="bookings" element={<ManageBookings />} />
          {/* ... other admin dashboard routes */}
        </Route>

        {/* Booking route requires login and KYC */}
        <Route
          path="/booking"
          element={
            // <ProtectedRoute requireKyc>
            <Booking />
            // </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/password-reset" element={<ForgotPassword />} />
        <Route path="/cars" element={<AllCarsDisplay />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/payment" element={<Payment />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
