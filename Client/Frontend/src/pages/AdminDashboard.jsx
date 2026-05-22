import React, { useEffect, useState, useContext } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaPlus,
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaChartLine,
  FaCrown,
  FaUserTie,
  FaEye,
  FaStar,
  FaGem,
  FaEdit,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      // Check if user is authenticated
      const token = localStorage.getItem("token");
      console.log("Auth token exists:", !!token);
      console.log("User object:", user);

      if (!token) {
        setError("Please login to access dashboard");
        setLoading(false);
        return;
      }

      // Fetch events with error handling
      let eventsData = [];
      try {
        const eventRes = await api.get("/events"); // Try /events first (plural)
        console.log("Events API Response (full):", eventRes.data);
        console.log("Events API Response type:", typeof eventRes.data);
        console.log("Is array:", Array.isArray(eventRes.data));

        // Handle different response structures
        if (Array.isArray(eventRes.data)) {
          eventsData = eventRes.data;
        } else if (
          eventRes.data?.events &&
          Array.isArray(eventRes.data.events)
        ) {
          eventsData = eventRes.data.events;
        } else if (eventRes.data?.data && Array.isArray(eventRes.data.data)) {
          eventsData = eventRes.data.data;
        } else if (eventRes.data && typeof eventRes.data === "object") {
          // If it's a single object, wrap in array
          eventsData = [eventRes.data];
        }
      } catch (eventErr) {
        console.error("Events fetch error:", eventErr);
        // Try alternate endpoint /event (singular)
        try {
          const eventRes2 = await api.get("/event");
          if (Array.isArray(eventRes2.data)) {
            eventsData = eventRes2.data;
          } else if (eventRes2.data?.events) {
            eventsData = eventRes2.data.events;
          } else if (eventRes2.data?.data) {
            eventsData = eventRes2.data.data;
          }
        } catch (eventErr2) {
          console.error("Both event endpoints failed:", eventErr2);
        }
      }

      console.log("Processed events data:", eventsData);
      setEvents(eventsData);

      // Fetch bookings
      let bookingsData = [];
      try {
        const bookingRes = await api.get("/bookings"); // Try /bookings first (plural)
        console.log("Bookings API Response:", bookingRes.data);

        if (Array.isArray(bookingRes.data)) {
          bookingsData = bookingRes.data;
        } else if (
          bookingRes.data?.bookings &&
          Array.isArray(bookingRes.data.bookings)
        ) {
          bookingsData = bookingRes.data.bookings;
        } else if (
          bookingRes.data?.data &&
          Array.isArray(bookingRes.data.data)
        ) {
          bookingsData = bookingRes.data.data;
        }
      } catch (bookingErr) {
        console.error("Bookings fetch error:", bookingErr);
        // Try alternate endpoint /booking (singular)
        try {
          const bookingRes2 = await api.get("/booking");
          if (Array.isArray(bookingRes2.data)) {
            bookingsData = bookingRes2.data;
          } else if (bookingRes2.data?.bookings) {
            bookingsData = bookingRes2.data.bookings;
          }
        } catch (bookingErr2) {
          console.error("Both booking endpoints failed:", bookingErr2);
        }
      }

      console.log("Processed bookings data:", bookingsData);
      setBookings(bookingsData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      console.error("Error response:", err.response);
      console.error("Error message:", err.response?.data?.message);

      // Retry logic
      if (retryCount < 2) {
        console.log(`Retrying... Attempt ${retryCount + 1}`);
        setRetryCount((prev) => prev + 1);
        setTimeout(() => fetchDashboard(), 2000);
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load dashboard. Please refresh the page.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const eventData = {
        title,
        category,
        description,
        date,
        location,
        totalSeats: parseInt(totalSeats),
        availableSeats: parseInt(totalSeats),
        ticketPrice: parseInt(ticketPrice) || 0,
        imageUrl: imageUrl || null,
      };

      console.log("Creating event:", eventData);

      const { data } = await api.post("/events", eventData);
      setEvents([data, ...events]);
      setSuccess("Event created successfully");

      // Reset form
      setTitle("");
      setCategory("");
      setDescription("");
      setDate("");
      setLocation("");
      setTotalSeats("");
      setTicketPrice("");
      setImageUrl("");
      setShowCreateForm(false);

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Create event error:", err);
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      setSuccess("Event deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Delete event error:", err);
      setError(err.response?.data?.message || "Failed to delete event");
    }
  };

  const confirmBooking = async (id) => {
    if (!window.confirm("Confirm this booking?")) return;
    try {
      const { data } = await api.put(`/bookings/${id}/confirm`, {
        status: "confirmed",
        paymentStatus: "completed",
      });
      setSuccess("Booking confirmed successfully");
      fetchDashboard(); // Refresh data
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Confirm booking error:", err);
      setError(err.response?.data?.message || "Failed to confirm booking");
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.put(`/bookings/${id}/cancel`, {
        status: "cancelled",
      });
      setSuccess("Booking cancelled successfully");
      fetchDashboard(); // Refresh data
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Cancel booking error:", err);
      setError(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (bookingFilter === "all") return true;
    return booking.status?.toLowerCase() === bookingFilter;
  });

  const totalRevenue = bookings.reduce(
    (acc, booking) => acc + (booking.amount || booking.totalAmount || 0),
    0,
  );
  const confirmedBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "confirmed",
  ).length;
  const pendingBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "pending",
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === "cancelled",
  ).length;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return {
          bg: "bg-gradient-to-r from-green-400 to-emerald-400",
          label: "Confirmed",
          icon: <FaCheckCircle />,
        };
      case "pending":
        return {
          bg: "bg-gradient-to-r from-yellow-400 to-orange-400",
          label: "Pending",
          icon: <FaClock />,
        };
      case "cancelled":
        return {
          bg: "bg-gradient-to-r from-gray-400 to-gray-500",
          label: "Cancelled",
          icon: <FaTimesCircle />,
        };
      default:
        return {
          bg: "bg-gradient-to-r from-pink-300 to-pink-400",
          label: status || "Unknown",
          icon: null,
        };
    }
  };

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <FaMoneyBillWave />,
      trend: "+12.5%",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings,
      icon: <FaCheckCircle />,
      trend: "+8.2%",
    },
    {
      title: "Pending Approvals",
      value: pendingBookings,
      icon: <FaClock />,
      trend: "-3.1%",
    },
    {
      title: "Total Events",
      value: events.length,
      icon: <FaTicketAlt />,
      trend: "+5 new",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 animate-pulse"></div>
          </div>
          <p className="mt-6 text-xl font-semibold text-gray-700">
            Loading Dashboard...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching events and bookings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-4 md:mx-8 mt-6"
      >
        <div className="relative bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <FaCrown className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-pink-100 text-lg mt-1">
                    Manage events, bookings, and analytics
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 text-pink-100">
                  <FaUserTie />
                  <span>{user?.name || user?.username || "Administrator"}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white"></div>
                <div className="flex items-center gap-2 text-white">
                  <FaGem />
                  <span>Premium Access</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2"
            >
              <FaPlus className="text-lg" />
              {showCreateForm ? "Cancel" : "Create New Event"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 mt-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group cursor-pointer"
          >
            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white text-xl shadow-md">
                  {stat.icon}
                </div>
                <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 md:mx-8 mt-6"
          >
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl font-semibold flex items-center justify-between">
              <span>⚠️ {error}</span>
              <button
                onClick={() => fetchDashboard()}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 md:mx-8 mt-6"
          >
            <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-2xl font-semibold">
              ✓ {success}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Event Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mx-4 md:mx-8 mt-6"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                  <FaStar className="text-white text-sm" />
                </div>
                Create New Event
              </h2>
              <form onSubmit={handleCreateEvent} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Event Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category *"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                    required
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-pink-200 rounded-xl p-4 text-gray-800 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Location *"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Total Seats *"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                    className="border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Ticket Price (0 for free)"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    className="border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                />
                <textarea
                  rows="5"
                  placeholder="Event Description *"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                >
                  Publish Event
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-8 p-4 md:p-8">
        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden"
        >
          <div className="p-6 border-b border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaTicketAlt className="text-pink-500" />
                  All Events ({events.length})
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your event listings
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-pink-600">
                <FaChartLine />
                <span>
                  {events.filter((e) => new Date(e.date) > new Date()).length}{" "}
                  Upcoming
                </span>
              </div>
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto p-6 space-y-4 custom-scroll">
            {events.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-gray-400 mb-2">No events created yet.</div>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="text-pink-500 hover:text-pink-600 font-semibold"
                >
                  Create your first event →
                </button>
              </div>
            ) : (
              events.map((event, idx) => (
                <motion.div
                  key={event._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-5 border border-pink-100 hover:border-pink-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <FaCalendarAlt className="text-pink-500" />
                          {event.date
                            ? new Date(event.date).toLocaleDateString()
                            : "Date TBA"}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <FaMapMarkerAlt className="text-pink-500" />
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-sm text-gray-600">
                          {event.availableSeats || event.totalSeats}/
                          {event.totalSeats} seats
                        </span>
                        {event.ticketPrice === 0 ? (
                          <span className="text-pink-600 font-bold text-sm">
                            FREE
                          </span>
                        ) : (
                          <span className="text-pink-600 font-bold">
                            ₹{event.ticketPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-50 hover:bg-red-100 text-red-500 p-3 rounded-xl transition"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Bookings Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden"
        >
          <div className="p-6 border-b border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaUsers className="text-pink-500" />
                  Booking Requests
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage and confirm bookings
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="border border-pink-200 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:border-pink-400"
                >
                  <option value="all">All ({bookings.length})</option>
                  <option value="pending">Pending ({pendingBookings})</option>
                  <option value="confirmed">
                    Confirmed ({confirmedBookings})
                  </option>
                  <option value="cancelled">
                    Cancelled ({cancelledBookings})
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto p-6 space-y-4 custom-scroll">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No booking requests found.
              </div>
            ) : (
              filteredBookings.map((booking, idx) => {
                const statusBadge = getStatusBadge(booking.status);
                return (
                  <motion.div
                    key={booking._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-5 border border-pink-100 hover:border-pink-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {booking.eventId?.title ||
                            booking.eventTitle ||
                            "Event Deleted"}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {booking.userId?.name ||
                            booking.userName ||
                            "Unknown User"}{" "}
                          (
                          {booking.userId?.email ||
                            booking.userEmail ||
                            "No email"}
                          )
                        </p>
                      </div>
                      <span
                        className={`${statusBadge.bg} px-4 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-1 shadow-sm`}
                      >
                        {statusBadge.icon} {statusBadge.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <p className="text-xs text-gray-500">Booking Date</p>
                        <p className="text-gray-700 text-sm">
                          {booking.createdAt || booking.bookingDate
                            ? new Date(
                                booking.createdAt || booking.bookingDate,
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Event Date</p>
                        <p className="text-gray-700 text-sm">
                          {booking.eventId?.date || booking.eventDate
                            ? new Date(
                                booking.eventId?.date || booking.eventDate,
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-gray-700 text-sm">
                          {booking.eventId?.location ||
                            booking.location ||
                            "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="text-gray-700 text-sm">
                          {booking.paymentStatus || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-bold text-2xl text-pink-600">
                        ₹{booking.amount || booking.totalAmount || 0}
                      </p>
                      <div className="flex gap-2">
                        {booking.status?.toLowerCase() === "pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => confirmBooking(booking._id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition flex items-center gap-1 shadow-md"
                            >
                              <FaCheckCircle /> Confirm
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => cancelBooking(booking._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition flex items-center gap-1 shadow-md"
                            >
                              <FaTimesCircle /> Cancel
                            </motion.button>
                          </>
                        )}
                        {booking.status?.toLowerCase() === "confirmed" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => cancelBooking(booking._id)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl transition shadow-md"
                          >
                            Cancel Booking
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #fce7f3;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #ec4899;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
