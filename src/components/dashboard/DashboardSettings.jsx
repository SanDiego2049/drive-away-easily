import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { ShieldCheck, Bell, Trash2, Lock } from "lucide-react";

const DashboardSettings = () => {
  const { user } = useUser();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [bookingReminders, setBookingReminders] = useState(true);
  const [passwordChangedAt] = useState("2024-12-10");

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl mb-6 text-gray-900">Settings</h2>

      {/* Section 1: Account Info */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl mb-4 flex flex-wrap items-center gap-2 text-orange-600">
          <ShieldCheck className="w-5 h-5" />
          Account Information
        </h3>
        <p className="text-sm text-gray-700 mb-2">
          Name: {user.first_name} {user.last_name}
        </p>
        <p className="text-sm text-gray-700">Email: {user.email}</p>
        <p className="text-xs text-gray-500 mt-2">
          Password last changed on {passwordChangedAt}
        </p>
      </section>

      {/* Section 2: Notifications */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl mb-4 flex flex-wrap items-center gap-2 text-orange-600">
          <Bell className="w-5 h-5" />
          Notifications
        </h3>
        <label className="flex items-center justify-between text-sm mb-2">
          <span>Email Alerts</span>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts((prev) => !prev)}
            className="accent-orange-500"
          />
        </label>
        <label className="flex items-center justify-between text-sm">
          <span>Booking Reminders</span>
          <input
            type="checkbox"
            checked={bookingReminders}
            onChange={() => setBookingReminders((prev) => !prev)}
            className="accent-orange-500"
          />
        </label>
        {user.role === "admin" && (
          <p className="text-xs mt-3 text-gray-500 italic">
            As an admin, you’ll also receive system alerts for KYC reviews and
            booking issues.
          </p>
        )}
      </section>

      {/* Section 3: Security */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl mb-4 flex flex-wrap items-center gap-2 text-orange-600">
          <Lock className="w-5 h-5" />
          Security
        </h3>
        <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm transition">
          Logout from All Devices
        </button>
        {/* 2FA Placeholder */}
        <p className="text-xs text-gray-500 mt-2 italic">
          Two-Factor Authentication (2FA) coming soon.
        </p>
      </section>

      {/* Section 4: Delete Account (Users Only) */}
      {user.role === "user" && (
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <h3 className="text-xl mb-4 flex flex-wrap items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Permanently delete your account and all associated bookings. This
            action is irreversible.
          </p>
          <button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition">
            Delete My Account
          </button>
        </section>
      )}
    </div>
  );
};

export default DashboardSettings;
