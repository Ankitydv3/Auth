import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaSearch,
  FaRegClock,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaShieldAlt,
  FaMusic,
  FaLaptopCode,
  FaMicrophoneAlt,
  FaPaintBrush,
  FaHeart,
  FaShare,
  FaGem,
  FaCrown,
} from "react-icons/fa";
import { GiRunningShoe, GiFilmStrip } from "react-icons/gi";
import api from "../utils/axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [hoveredEvent, setHoveredEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/event?search=${search}&category=${category}`,
      );
      setEvents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Music: <FaMusic className="text-2xl" />,
      "Tech Conference": <FaLaptopCode className="text-2xl" />,
      Workshop: <FaMicrophoneAlt className="text-2xl" />,
      Art: <FaPaintBrush className="text-2xl" />,
      Sports: <GiRunningShoe className="text-2xl" />,
      Film: <GiFilmStrip className="text-2xl" />,
    };
    return icons[category] || <FaStar className="text-2xl" />;
  };

  const categories = [
    { name: "Music", icon: <FaMusic />, events: "128" },
    { name: "Tech", icon: <FaLaptopCode />, events: "94" },
    { name: "Workshop", icon: <FaMicrophoneAlt />, events: "76" },
    { name: "Art", icon: <FaPaintBrush />, events: "52" },
    { name: "Sports", icon: <GiRunningShoe />, events: "43" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 mx-4 md:mx-8 mt-6 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative z-10 text-center py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-2 rounded-full mb-8"
          >
            <FaStar className="text-yellow-300" />
            <span className="text-white font-medium">
              Experience the Extraordinary
            </span>
            <FaStar className="text-yellow-300" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6"
          >
            Discover Your
            <br />
            <span className="bg-white/20 backdrop-blur px-4 py-2 rounded-2xl inline-block mt-2">
              Next Adventure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-pink-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            Join thousands of experience seekers in discovering extraordinary
            events that inspire, connect, and transform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto relative"
          >
            <div className="relative flex items-center bg-white rounded-full shadow-2xl">
              <FaSearch className="absolute left-6 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search for concerts, conferences, workshops..."
                className="w-full pl-16 pr-32 py-5 rounded-full text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => fetchEvents()}
                className="absolute right-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Explore
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/20"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-pink-100 text-sm">Live Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-pink-100 text-sm">Happy Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">25+</div>
              <div className="text-pink-100 text-sm">Cities Worldwide</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="px-4 md:px-8 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 text-gray-700"
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Tech Conference">Tech Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Art">Art</option>
            <option value="Sports">Sports</option>
            <option value="Film">Film</option>
          </select>
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
            className="px-6 py-3 text-pink-600 hover:text-pink-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Events Section */}
      <div className="px-4 md:px-8 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-lg">
              Don't miss out on these amazing experiences
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <div className="h-px w-12 bg-gradient-to-r from-pink-500 to-pink-600"></div>
            <span className="text-pink-600 font-semibold">
              {events.length}+ Events Available
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="h-64 bg-pink-100"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-pink-100 rounded w-1/3"></div>
                    <div className="h-6 bg-pink-100 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-pink-100 rounded w-full"></div>
                      <div className="h-4 bg-pink-100 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : events.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-pink-50 mb-6">
                <FaSearch className="text-4xl text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or browse all events
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                }}
                className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="events"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {events.map((event) => (
                <motion.div
                  key={event._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/event/${event._id}`}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-pink-100">
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={
                            event.imageUrl ||
                            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                          }
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <span>{event.category || "Event"}</span>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          {event.ticketPrice === 0 ? (
                            <span className="text-pink-600">FREE</span>
                          ) : (
                            <span className="text-gray-800">
                              ₹{event.ticketPrice?.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <FaCalendarAlt className="text-pink-400" />
                          <span>
                            {event.date &&
                              new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <FaMapMarkerAlt className="text-pink-400" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {event.description}
                        </p>
                        <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                          Get Tickets <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Newsletter Section */}
      <div className="mx-4 md:mx-8 my-20">
        <div className="relative bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-white/10"></div>
          <div className="relative z-10 py-16 px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss an Event
            </h3>
            <p className="text-pink-100 text-lg mb-8 max-w-md mx-auto">
              Subscribe to get the latest updates on upcoming events and
              exclusive offers
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 backdrop-blur text-white placeholder-pink-200 border border-white/30 focus:outline-none focus:border-white"
              />
              <button className="px-8 py-3 bg-white text-pink-600 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-500 to-pink-600 text-white mt-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaTicketAlt className="text-white text-3xl" />
                <span className="text-2xl font-bold">Eventora</span>
              </div>
              <p className="text-pink-100 text-sm">
                Creating unforgettable experiences through exceptional events
                and seamless booking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-pink-100 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition">
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="hover:text-white transition">
                    Host an Event
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-pink-100 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {["Twitter", "Instagram", "Facebook", "LinkedIn"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <span className="text-sm">{social[0]}</span>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 text-center text-pink-100 text-sm">
            © {new Date().getFullYear()} Eventora. All rights reserved. Crafted
            with <span className="text-red-300">❤️</span> for experience
            seekers.
          </div>
        </div>
      </footer>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
