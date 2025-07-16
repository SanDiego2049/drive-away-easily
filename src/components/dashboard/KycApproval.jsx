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
    <section className="mt-8 px-4 sm:px-0">
      <h3 className="text-2xl sm:text-3xl mb-6 text-center sm:text-left">
        KYC Approvals
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-100 text-orange-800 p-4 rounded-lg text-center">
          <p className="text-sm">Total Submissions</p>
          <p className="text-xl">{kycSubmissions.length}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
          <p className="text-sm">Verified</p>
          <p className="text-xl">
            {kycSubmissions.filter((s) => s.kycStatus === "verified").length}
          </p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
          <p className="text-sm">Rejected</p>
          <p className="text-xl">
            {kycSubmissions.filter((s) => s.kycStatus === "rejected").length}
          </p>
        </div>
      </div>

      {kycSubmissions.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">
          No pending KYC requests.
        </p>
      ) : (
        kycSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 border rounded-md p-4 mb-3 gap-3"
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

            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <button
                onClick={() => handleKycAction(submission.id, "verified")}
                className="bg-green-100 text-green-700 px-4 py-1.5 rounded hover:bg-green-200 text-sm w-full sm:w-auto"
              >
                Approve
              </button>
              <button
                onClick={() => handleKycAction(submission.id, "rejected")}
                className="bg-red-100 text-red-700 px-4 py-1.5 rounded hover:bg-red-200 text-sm w-full sm:w-auto"
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
