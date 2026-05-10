import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

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
  FaGlobe,
  FaMusic,
  FaLaptopCode,
  FaMicrophoneAlt,
  FaPaintBrush,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { GiRunningShoe, GiFilmStrip } from "react-icons/gi";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/event?search=${search}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
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
    { name: "Music", icon: <FaMusic />, color: "from-purple-500 to-pink-500" },
    {
      name: "Tech",
      icon: <FaLaptopCode />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Workshop",
      icon: <FaMicrophoneAlt />,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Art",
      icon: <FaPaintBrush />,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Sports",
      icon: <GiRunningShoe />,
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative mx-4 md:mx-8 mt-6 mb-20">
        <div className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Background Image with Parallax Effect */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center transform scale-105 transition-transform duration-1000"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1495749592104-58456a83f4b0?q=80&w=3000&auto=format&fit=crop')",
            }}
          ></div>

          {/* Glass Morphism Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/90 backdrop-blur-sm"></div>

          {/* Hero Content */}
          <div className="relative z-10 text-center flex flex-col items-center py-28 px-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20 mb-8 animate-fade-in-down">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Experience the Extraordinary
              </span>
              <FaStar className="text-yellow-400 text-sm" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight animate-fade-in-up">
              <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Discover Your
              </span>
              <br />
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Next Adventure
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up animation-delay-200">
              Join thousands of experience seekers in discovering extraordinary
              events that inspire, connect, and transform. Your journey begins
              here.
            </p>

            {/* Premium Search Bar */}
            <div className="w-full max-w-3xl mx-auto relative animate-fade-in-up animation-delay-400">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group">
                <FaSearch className="absolute left-6 text-gray-400 text-xl group-hover:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for concerts, conferences, workshops..."
                  className="w-full pl-16 pr-6 py-5 rounded-full text-lg bg-transparent text-white placeholder-gray-400 focus:outline-none font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="absolute right-2 bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                  Explore
                </button>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-gray-400 text-sm">Live Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-gray-400 text-sm">Happy Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-gray-400 text-sm">Cities Worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 md:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Explore by Category
          </h2>
          <p className="text-gray-500 text-lg">
            Find events that match your passion
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-white to-gray-50 p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
            >
              <div
                className={`absolute inset-0 bg-linear-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
              <div
                className={`text-4xl mb-3 inline-block p-3 rounded-full bg-linear-to-r ${category.color} bg-clip-text text-transparent`}
              >
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
              <div className="mt-2 text-xs text-gray-400 group-hover:text-purple-500 transition-colors">
                124 events
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 md:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaRegClock />,
              title: "Instant Booking",
              desc: "Secure your tickets in seconds with our streamlined checkout process",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: <FaShieldAlt />,
              title: "Secure Payments",
              desc: "Bank-grade security for all your transactions and personal data",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: <FaUsers />,
              title: "Community Driven",
              desc: "Join a growing community of event enthusiasts and creators",
              color: "from-green-500 to-emerald-500",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div
                className={`absolute inset-0 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-r ${feature.color} flex items-center justify-center text-white text-2xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Events Section Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 px-4 md:px-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <p className="text-gray-500 text-lg">
            Don't miss out on these amazing experiences
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="h-px w-12 bg-linear-to-r from-purple-500 to-pink-500"></div>
          <span className="text-purple-500 font-semibold">
            {events.length}+ Events Available
          </span>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
            >
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-32 px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
            <FaSearch className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or browse all events
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
          {events.map((event) => (
            <Link key={event._id} to={`/event/${event._id}`}>
              <div
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
                onMouseEnter={() => setHoveredEvent(event._id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      event.imageUrl ||
                      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={event.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-linear-to-r from-gray-900 to-gray-800 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    {getCategoryIcon(event.category)}
                    <span>{event.category || "Event"}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {event.ticketPrice === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span className="text-gray-900">
                        ₹{event.ticketPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <FaShare className="text-gray-600 hover:text-purple-500 transition-colors" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendarAlt className="text-purple-400" />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h2>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="text-purple-400" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {event.description}
                  </p>

                  <button className="w-full bg-linear-to-r from-gray-900 to-gray-800 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span>Get Tickets</span>
                    <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Newsletter Section */}
      <div className="mx-4 md:mx-8 my-20">
        <div className="relative bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 py-16 px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss an Event
            </h3>
            <p className="text-purple-100 text-lg mb-8 max-w-md mx-auto">
              Subscribe to get the latest updates on upcoming events and
              exclusive offers
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-purple-200 border border-white/30 focus:outline-none focus:border-white transition-colors"
              />
              <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="bg-linear-to-b from-gray-900 to-black text-white mt-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaTicketAlt className="text-purple-400 text-3xl" />
                <span className="text-2xl font-bold bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  Eventora
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Creating unforgettable experiences through exceptional events
                and seamless booking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Host an Event
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
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
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-500 transition-all duration-300"
                    >
                      <span className="text-sm">{social[0]}</span>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Eventora. All rights reserved. Crafted
            with <span className="text-red-400">❤️</span> for experience
            seekers.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
