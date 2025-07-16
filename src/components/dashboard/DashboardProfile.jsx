import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import {
  UploadCloud,
  UserCheck,
  UserX,
  ShieldCheck,
  Pencil,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

const DashboardProfile = () => {
  const { user, setUser } = useUser();

  // KYC State
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState(
    user?.kycStatus || "not_submitted"
  );
  const [message, setMessage] = useState("");

  // Profile Edit State
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setKycStatus(user?.kycStatus || "not_submitted");
  }, [user]);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const handleSubmitKyc = () => {
    if (!idFront || !idBack || !selfie) {
      setMessage("Please upload all required documents.");
      return;
    }

    setUploading(true);
    setMessage("");

    setTimeout(() => {
      setUploading(false);
      setKycStatus("pending");
      setMessage(
        "KYC documents submitted successfully. Awaiting verification."
      );

      const updatedUser = {
        ...user,
        kycStatus: "pending",
        hasCompletedKyc: false,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }, 2000);
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      first_name: firstName,
      last_name: lastName,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    if (newPassword.trim()) {
      toast.success("Password updated (frontend simulation only)");
    }

    toast.success("Profile updated!");
    setEditing(false);
    setNewPassword("");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl mb-6 text-gray-900">My Profile</h2>

      {/* Profile Info & Editing */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="text-xl">User Information</h3>
          <button
            onClick={() => setEditing((prev) => !prev)}
            className="text-sm cursor-pointer text-orange-500 hover:underline flex gap-1 items-center"
          >
            {editing ? (
              <Save className="w-4 h-4" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {editing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-gray-700">New Password (optional)</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>

            <div className="sm:col-span-2">
              <button
                onClick={handleSaveProfile}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {user.first_name} {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        )}
      </section>

      {/* User-only KYC */}
      {user.role === "user" && (
        <section className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl flex flex-wrap items-center gap-2 mb-4">
            KYC Status:
            {kycStatus === "verified" && (
              <span className="text-green-600 flex items-center gap-1">
                Verified <UserCheck className="w-5 h-5" />
              </span>
            )}
            {kycStatus === "pending" && (
              <span className="text-yellow-600 flex items-center gap-1">
                Pending <ShieldCheck className="w-5 h-5" />
              </span>
            )}
            {kycStatus === "rejected" && (
              <span className="text-red-600 flex items-center gap-1">
                Rejected <UserX className="w-5 h-5" />
              </span>
            )}
            {kycStatus === "not_submitted" && (
              <span className="text-gray-500">Not Submitted</span>
            )}
          </h3>

          {kycStatus !== "verified" && (
            <>
              <p className="text-gray-700">
                Please upload the following documents for KYC verification:
              </p>
              <div className="space-y-4">
                {[
                  { label: "ID Front", file: idFront, setter: setIdFront },
                  { label: "ID Back", file: idBack, setter: setIdBack },
                  { label: "Selfie with ID", file: selfie, setter: setSelfie },
                ].map(({ label, file, setter }) => (
                  <label key={label} className="block">
                    <span className="text-orange-500 cursor-pointer hover:underline">
                      {label}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, setter)}
                      className="file-input mt-1"
                    />
                    {file && (
                      <p className="text-xs mt-1 text-green-600 truncate max-w-full">
                        {file.name}
                      </p>
                    )}
                  </label>
                ))}
              </div>

              {message && (
                <p className="mt-4 text-sm text-red-600 font-medium">
                  {message}
                </p>
              )}

              <button
                disabled={uploading}
                onClick={handleSubmitKyc}
                className="mt-6 w-full inline-flex justify-center items-center gap-2 rounded-md bg-orange-500 px-5 py-2 text-white hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UploadCloud className="w-5 h-5" />
                {uploading ? "Submitting..." : "Submit KYC"}
              </button>
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default DashboardProfile;
