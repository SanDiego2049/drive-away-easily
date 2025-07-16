import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({
  children,
  requireKyc = false,
  allowedRoles = [],
}) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!user) {
    const isAdminPath = location.pathname.startsWith("/admin");
    return (
      <Navigate
        to={isAdminPath ? "/admin/login" : "/login"}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Disallow role access if not in allowedRoles
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return user.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  // Enforce KYC if required
  if (requireKyc && user.role === "user" && !user.hasCompletedKyc) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
