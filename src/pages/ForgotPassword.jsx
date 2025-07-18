import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Send,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Lock,
} from "lucide-react";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState("email"); // "email", "otp", "password", "success"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  // Step 1: Send OTP to email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://roadsphere.vercel.app/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            assigned_for: "email verification",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setCurrentStep("otp");
      setOtpTimer(300);
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://roadsphere.vercel.app/api/auth/verify-reset-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp_code: otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      setOtpToken(data.otp_token);
      setCurrentStep("password");
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Password validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://roadsphere.vercel.app/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: newPassword,
            otp_token: otpToken,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      setCurrentStep("success");
    } catch (err) {
      setError(err.message || "Reset failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setError("");
    setIsLoading(true);
    setOtp("");

    try {
      const res = await fetch(
        "https://roadsphere.vercel.app/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, assigned_for: "email verification" }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to resend OTP");
      }

      setOtpTimer(300);
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // -- STEP 1: Email Input --
  if (currentStep === "email") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-sm shadow-lg bg-white/80 max-w-md w-full rounded-lg p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <h2 className="text-xl sm:text-2xl text-gray-900 mb-2 sm:mb-3">
              Forgot Password?
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Enter your email address and we'll send you a verification code to
              reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs sm:text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 shadow-sm ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Code...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Verification Code
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Remember your password?{" "}
              <button
                onClick={navigateToLogin}
                className="text-orange-500 hover:text-orange-600 cursor-pointer font-medium transition-colors duration-200"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -- STEP 2: OTP Verification --
  if (currentStep === "otp") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-sm shadow-lg bg-white/80 max-w-md w-full rounded-lg p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl text-gray-900 mb-2 sm:mb-3">
              Verify Your Email
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              We've sent a 6-digit verification code to{" "}
              <span className="font-medium text-gray-900 break-words">
                {email}
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOtpSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm text-center text-xl sm:text-2xl tracking-widest"
                placeholder="000000"
                inputMode="numeric"
                pattern="\d{6}"
              />
            </div>

            {/* Timer */}
            {otpTimer > 0 && (
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Code expires in{" "}
                  <span className="font-medium text-gray-900">
                    {formatTimer(otpTimer)}
                  </span>
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs sm:text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 shadow-sm ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Verify Code
                </>
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendOtp}
                disabled={otpTimer > 0 || isLoading}
                className={`font-medium transition-colors duration-200 ${
                  otpTimer > 0 || isLoading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-orange-500 hover:text-orange-600"
                }`}
              >
                Resend Code
              </button>
            </p>
          </div>

          {/* Back to Email */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <button
              onClick={() => setCurrentStep("email")}
              className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Use different email address
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -- STEP 3: Password Reset --
  if (currentStep === "password") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-sm shadow-lg bg-white/80 max-w-md w-full rounded-lg p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl text-gray-900 mb-2 sm:mb-3">
              Set New Password
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              Create a strong password for your account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-10 pl-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10 pl-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs sm:text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 shadow-sm ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Reset Password
                </>
              )}
            </button>
          </form>

          {/* Back to OTP */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <button
              onClick={() => setCurrentStep("otp")}
              className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Verify Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -- STEP 4: Success --
  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-sm shadow-lg bg-white/80 max-w-md w-full rounded-lg p-6 sm:p-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl text-gray-900 mb-2 sm:mb-3">
            Password Reset Successful!
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm mx-auto mb-6">
            Your password has been reset successfully. You can now log in with
            your new password.
          </p>
          <button
            onClick={navigateToLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-medium transition-colors duration-200 shadow-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Default fallback (should not happen)
  return null;
};

export default ForgotPassword;
