import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ children, requireKyc = false }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireKyc && !user.hasCompletedKyc) {
    return <Navigate to="/dashboard/kyc" replace />;
  }

  return children;
};

export default ProtectedRoute;
