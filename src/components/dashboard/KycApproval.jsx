// src/components/dashboard/KycApproval.jsx
import { useState } from "react";

const KycApproval = () => {
  const [kycSubmissions, setKycSubmissions] = useState([
    {
      id: 101,
      first_name: "Daniel",
      last_name: "Okafor",
      email: "daniel@example.com",
      kycStatus: "pending",
    },
    {
      id: 102,
      first_name: "Amaka",
      last_name: "Johnson",
      email: "amaka@example.com",
      kycStatus: "pending",
    },
  ]);

  const handleKycAction = (id, status) => {
    setKycSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === id ? { ...submission, kycStatus: status } : submission
      )
    );
  };

  return (
    <section className="mt-8">
      <h3 className="text-2xl sm:text-3xl mb-6">KYC Approvals</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-100 text-orange-800 p-4 rounded-lg text-center">
          <p className="text-sm">Total Submissions</p>
          <p className="text-xl font-bold">{kycSubmissions.length}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
          <p className="text-sm">Verified</p>
          <p className="text-xl font-bold">
            {kycSubmissions.filter((s) => s.kycStatus === "verified").length}
          </p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
          <p className="text-sm">Rejected</p>
          <p className="text-xl font-bold">
            {kycSubmissions.filter((s) => s.kycStatus === "rejected").length}
          </p>
        </div>
      </div>

      {kycSubmissions.length === 0 ? (
        <p className="text-gray-500">No pending KYC requests.</p>
      ) : (
        kycSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="flex justify-between items-center bg-gray-50 border rounded-md p-4 mb-2"
          >
            <div>
              <p className="text-sm font-medium">
                {submission.first_name} {submission.last_name} –{" "}
                {submission.email}
              </p>
              <p className="text-xs text-gray-500">
                Status: {submission.kycStatus}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleKycAction(submission.id, "verified")}
                className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleKycAction(submission.id, "rejected")}
                className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default KycApproval;
