import React, { useEffect, useState, useContext } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

import {
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaPlus,
  FaFilter,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bookingFilter, setBookingFilter] = useState("all");

  // EVENT FORM
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const eventRes = await api.get("/event");
      setEvents(
        Array.isArray(eventRes.data)
          ? eventRes.data
          : eventRes.data.events || [],
      );

      const bookingRes = await api.get("/booking");
      setBookings(
        Array.isArray(bookingRes.data)
          ? bookingRes.data
          : bookingRes.data.bookings || [],
      );
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // CREATE EVENT
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await api.post("/event", {
        title,
        category,
        description,
        date,
        location,
        totalSeats: parseInt(totalSeats),
        availableSeats: parseInt(totalSeats),
        ticketPrice: parseInt(ticketPrice) || 0,
        imageUrl,
      });

      setEvents([data, ...events]);
      setSuccess("Event created successfully");

      setTitle("");
      setCategory("");
      setDescription("");
      setDate("");
      setLocation("");
      setTotalSeats("");
      setTicketPrice("");
      setImageUrl("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  // DELETE EVENT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/event/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      setSuccess("Event deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete event");
    }
  };

  // CONFIRM BOOKING
  const confirmBooking = async (id) => {
    if (!window.confirm("Confirm this booking?")) return;

    try {
      await api.put(`/booking/${id}/confirm`, { paymentStatus: "completed" });
      setSuccess("Booking confirmed successfully");
      fetchDashboard();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to confirm booking");
    }
  };

  // CANCEL BOOKING with DELETE
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.put(`/booking/${id}/cancel`);

      setSuccess("Booking cancelled successfully");

      fetchDashboard();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (bookingFilter === "all") return true;
    return booking.status?.toLowerCase() === bookingFilter;
  });

  // STATS
  const totalRevenue = bookings.reduce(
    (acc, booking) => acc + (booking.amount || 0),
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
          bg: "bg-green-100",
          text: "text-green-600",
          label: "Confirmed",
        };
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          label: "Pending",
        };
      case "cancelled":
        return { bg: "bg-red-100", text: "text-red-600", label: "Cancelled" };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          label: status || "Unknown",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <div className="bg-black text-white rounded-3xl mx-6 mt-6 p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-extrabold mb-3">Admin Dashboard</h1>
          <p className="text-gray-300 text-lg">
            Manage events and confirm/cancel booking requests.
          </p>
        </div>
        <a
          href="#create-event"
          className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition inline-block"
        >
          <FaPlus className="inline mr-2" />
          Create New Event
        </a>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 mt-10">
        <div className="bg-white rounded-3xl p-8 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-bold">
                Total Revenue
              </p>
              <h2 className="text-5xl font-extrabold text-green-600 mt-4">
                ₹{totalRevenue.toLocaleString()}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-bold">
                Confirmed
              </p>
              <h2 className="text-5xl font-extrabold text-blue-600 mt-4">
                {confirmedBookings}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-bold">
                Pending
              </p>
              <h2 className="text-5xl font-extrabold text-yellow-500 mt-4">
                {pendingBookings}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-3xl">
              <FaClock />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 uppercase text-sm font-bold">
                Cancelled
              </p>
              <h2 className="text-5xl font-extrabold text-red-600 mt-4">
                {cancelledBookings}
              </h2>
            </div>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl">
              <FaTimesCircle />
            </div>
          </div>
        </div>
      </div>

      {/* ERROR / SUCCESS */}
      {error && (
        <div className="mx-6 mt-6 bg-red-100 text-red-600 p-4 rounded-2xl font-semibold">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="mx-6 mt-6 bg-green-100 text-green-700 p-4 rounded-2xl font-semibold">
          ✓ {success}
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-8 p-6">
        {/* EVENTS */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-3xl font-bold mb-8">
            All Events ({events.length})
          </h2>
          {events.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No events created yet. Create your first event below.
            </div>
          ) : (
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="border rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition"
                >
                  <div>
                    <h3 className="text-2xl font-bold">{event.title}</h3>
                    <p className="text-gray-500 mt-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm mt-2">
                      {event.availableSeats}/{event.totalSeats} seats available
                    </p>
                    {event.ticketPrice === 0 ? (
                      <p className="text-green-600 font-bold mt-1">FREE</p>
                    ) : (
                      <p className="text-gray-700 font-bold mt-1">
                        ₹{event.ticketPrice}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-100 text-red-600 px-4 py-3 rounded-xl hover:bg-red-200 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Booking Requests</h2>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={bookingFilter}
                onChange={(e) => setBookingFilter(e.target.value)}
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
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

          {filteredBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No booking requests found.
            </div>
          ) : (
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {filteredBookings.map((booking) => {
                const statusBadge = getStatusBadge(booking.status);
                return (
                  <div
                    key={booking._id}
                    className="border rounded-2xl p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {booking.eventId?.title || "Event Deleted"}
                        </h3>
                        <p className="text-gray-500 mt-2">
                          {booking.userId?.name || "Unknown User"} (
                          {booking.userId?.email || "No email"})
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Booking ID: {booking._id}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full font-bold text-sm ${statusBadge.bg} ${statusBadge.text}`}
                      >
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Booking Date</p>
                        <p className="font-semibold">
                          {booking.createdAt
                            ? new Date(booking.createdAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Event Date</p>
                        <p className="font-semibold">
                          {booking.eventId?.date
                            ? new Date(
                                booking.eventId.date,
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">
                          {booking.eventId?.location || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className="font-semibold">
                          {booking.paymentStatus || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-bold text-2xl text-green-600">
                        ₹{booking.amount || 0}
                      </p>
                      <div className="flex gap-3">
                        {booking.status?.toLowerCase() === "pending" && (
                          <>
                            <button
                              onClick={() => confirmBooking(booking._id)}
                              className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                            >
                              <FaCheckCircle /> Confirm
                            </button>
                            <button
                              onClick={() => cancelBooking(booking._id)}
                              className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2"
                            >
                              <FaTimesCircle /> Cancel
                            </button>
                          </>
                        )}
                        {booking.status?.toLowerCase() === "confirmed" && (
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2"
                          >
                            <FaTimesCircle /> Cancel Booking
                          </button>
                        )}
                        {booking.status?.toLowerCase() === "cancelled" && (
                          <span className="text-red-500 font-semibold">
                            Booking Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CREATE EVENT */}
      <div
        id="create-event"
        className="bg-white rounded-3xl shadow mx-6 mb-10 p-10"
      >
        <h2 className="text-4xl font-bold mb-10">Create New Event</h2>
        <form onSubmit={handleCreateEvent} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Event Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              placeholder="Category *"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="text"
              placeholder="Location *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="number"
              placeholder="Total Seats *"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <input
              type="number"
              placeholder="Ticket Price (0 for free)"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              className="border p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            rows="5"
            placeholder="Event Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Publish Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
