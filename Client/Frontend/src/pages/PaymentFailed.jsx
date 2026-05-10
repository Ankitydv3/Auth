import React from "react";
import { Link } from "react-router-dom";

import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border-t-8 border-red-500">
        {/* ICON */}
        <FaTimesCircle className="text-red-500 text-7xl mx-auto mb-6 drop-shadow-lg animate-pulse" />

        {/* TITLE */}
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Booking Failed
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-8 text-lg leading-relaxed">
          We couldn't process your payment or booking request. Please try again
          or contact support if the issue continues.
        </p>

        {/* BUTTONS */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition duration-300 shadow-lg hover:shadow-red-200"
          >
            Return to Events
          </Link>

          <Link
            to="/user/dashboard"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-2xl transition duration-300"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
