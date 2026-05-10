import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserCircle,
} from "react-icons/fa";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data } = await api.get("/booking/my");
        // Ensure data is an array
        setBookings(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          setTimeout(() => logout(), 2000);
        } else if (err.response?.status === 404) {
          setError("Bookings endpoint not found. Please check your API.");
        } else {
          setError(err.response?.data?.message || "Failed to load bookings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, logout]);

  // STATUS COLORS
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // If no user (while redirecting), show loading
  if (!user && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-gray-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-5xl">
              <FaUserCircle />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">
                Welcome, {user?.name || "User"}
              </h1>
              <p className="text-gray-300 mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/"
              className="bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Browse Events
            </Link>
            <button
              onClick={() => logout()}
              className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Bookings</p>
                <h2 className="text-4xl font-extrabold mt-2">
                  {bookings.length}
                </h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">
                <FaTicketAlt />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Confirmed</p>
                <h2 className="text-4xl font-extrabold mt-2 text-green-600">
                  {
                    bookings.filter(
                      (b) => b.status?.toLowerCase() === "confirmed",
                    ).length
                  }
                </h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Pending</p>
                <h2 className="text-4xl font-extrabold mt-2 text-yellow-500">
                  {
                    bookings.filter(
                      (b) => b.status?.toLowerCase() === "pending",
                    ).length
                  }
                </h2>
              </div>
              <div className="w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-3xl">
                <FaClock />
              </div>
            </div>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <FaTimesCircle className="text-6xl text-red-400 mx-auto mb-4" />
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black"
              >
                Try Again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20">
              <FaTimesCircle className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-500 mb-6">
                Explore amazing events and reserve your seat.
              </p>
              <Link
                to="/"
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-2xl p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {booking.eventId?.title || "Event Unavailable"}
                      </h3>
                      <p className="text-gray-500 mt-1 text-sm">
                        Booking ID: {booking._id}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {booking.status || "Unknown"}
                    </span>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaCalendarAlt className="text-purple-500" />
                      <span>
                        {booking.eventId?.date
                          ? new Date(booking.eventId.date).toLocaleDateString()
                          : "Date TBA"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>{booking.eventId?.location || "Location TBA"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                      <FaMoneyBillWave className="text-green-500" />
                      <span>
                        Payment:{" "}
                        <strong>{booking.paymentStatus || "N/A"}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Booked on{" "}
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </span>
                    <Link
                      to={`/event/${booking.eventId?._id}`}
                      className="bg-gray-900 text-white px-5 py-2 rounded-xl font-semibold hover:bg-black transition"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
