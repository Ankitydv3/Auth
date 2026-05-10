import React from "react";
import { Link } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
      
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border-t-8 border-green-500">
        
        {/* ICON */}
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6 drop-shadow-lg animate-bounce" />

        {/* TITLE */}
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Booking Confirmed!
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 mb-8 text-lg leading-relaxed">
          Your ticket has been booked successfully.
          A confirmation email has been sent to your account.
        </p>

        {/* BUTTONS */}
        <div className="space-y-4">
          
          <Link
            to="/user/dashboard"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition duration-300 shadow-lg hover:shadow-green-200"
          >
            View My Tickets
          </Link>

          <Link
            to="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-2xl transition duration-300"
          >
            Discover More Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;