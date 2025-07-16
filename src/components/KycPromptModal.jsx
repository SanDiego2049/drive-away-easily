// components/KycPromptModal.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KycPromptModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/40 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl mb-4">Complete Your KYC</h2>
        <p className="text-gray-600 mb-6">
          To continue using your account, please verify your identity.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              onClose();
              navigate("/dashboard/profile");
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Go to KYC
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default KycPromptModal;
