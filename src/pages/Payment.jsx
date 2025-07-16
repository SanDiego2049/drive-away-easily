import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import jsPDF from "jspdf";
import paymentSuccess from "../assets/round check mark yellow (Colorized) (Colorized).png";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paid, setPaid] = useState(false);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState({
    user: null,
    bookingDetails: null,
  });

  useEffect(() => {
    const stateData = location.state;
    const storedData = JSON.parse(localStorage.getItem("bookingInfo"));

    if (stateData?.bookingDetails && stateData?.user) {
      setData({
        bookingDetails: stateData.bookingDetails,
        user: stateData.user,
      });
      localStorage.setItem("bookingInfo", JSON.stringify(stateData));
      setReady(true);
    } else if (storedData?.bookingDetails && storedData?.user) {
      setData({
        bookingDetails: storedData.bookingDetails,
        user: storedData.user,
      });
      setReady(true);
    } else {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  if (!ready) return null;

  const { bookingDetails, user } = data;

  const publicKey = "pk_test_aebe0e2a85368c22e3ec0af9f0891af547d54ad1";
  const amount = bookingDetails.price * 100;

  const componentProps = {
    email: user.email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: () => setPaid(true),
    onClose: () => alert("Payment closed."),
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Payment Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 20, 40);
    doc.text(`Email: ${user.email}`, 20, 50);
    doc.text(`Vehicle: ${bookingDetails.name}`, 20, 60);
    doc.text(
      `Rental Period: ${bookingDetails.startDate} to ${bookingDetails.endDate}`,
      20,
      70
    );
    doc.text(`Amount Paid: ₦${bookingDetails.price}`, 20, 80);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 90);
    doc.save("receipt.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {!paid ? (
        <div className="bg-white p-6 sm:p-8 rounded shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl sm:text-3xl mb-4">
            Complete Payment
          </h2>
          <p className="mb-6 text-base sm:text-lg">
            Vehicle: <strong>{bookingDetails.name}</strong>
          </p>
          <p className="mb-6 text-base sm:text-lg">
            Amount: <strong>₦{bookingDetails.price}</strong>
          </p>
          <PaystackButton
            className="cursor-pointer text-orange-500 text-lg sm:text-xl"
            {...componentProps}
          />
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded shadow-md max-w-md w-full text-center">
          <img
            src={paymentSuccess}
            alt="Successful payment"
            className="mx-auto mb-6 w-24 h-24 sm:w-32 sm:h-32"
          />
          <h2 className="text-2xl sm:text-3xl mb-4">
            Payment Successful!
          </h2>
          <p className="mb-6 text-base sm:text-lg">
            Thank you for your payment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={generateReceipt}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded font-medium transition-colors"
            >
              Download Receipt
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded font-medium transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
