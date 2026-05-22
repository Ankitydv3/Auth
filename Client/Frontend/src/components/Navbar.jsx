import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaTicketAlt,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBell,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New booking received" },
    { id: 2, message: "AI classified ticket" },
  ]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Events" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

          :root {
            --pink: #ec4899;
            --pink-light: #f472b6;
            --pink-dark: #db2777;
            --pink-soft: #fce7f3;
            --pink-bg: #fff5f8;
            --obsidian: #1a1a2e;
            --surface: #ffffff;
            --surface-2: #fafafa;
            --surface-3: #f5f5f5;
            --text-primary: #1f2937;
            --text-muted: #6b7280;
            --border: rgba(236, 72, 153, 0.15);
          }

          .nav-root {
            font-family: 'DM Sans', sans-serif;
          }

          .nav-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .nav-bar.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-bottom: 1px solid var(--border);
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(236, 72, 153, 0.05);
          }

          .nav-bar.top {
            background: transparent;
          }

          .notification-wrap {
            position: relative;
          }

          .notification-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid var(--border);
            background: var(--surface-2);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            color: var(--pink);
            transition: all 0.3s;
          }

          .notification-btn:hover {
            border-color: var(--pink);
            background: var(--pink-bg);
          }

          .notification-count {
            position: absolute;
            top: -4px;
            right: -4px;
            background: linear-gradient(135deg, var(--pink), var(--pink-dark));
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: white;
            font-weight: bold;
          }

          .notification-dropdown {
            position: absolute;
            top: 50px;
            right: 0;
            width: 280px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            z-index: 999;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .notification-item {
            padding: 12px;
            border-bottom: 1px solid var(--border);
            font-size: 14px;
            color: var(--text-primary);
            transition: background 0.2s;
          }

          .notification-item:hover {
            background: var(--pink-bg);
          }

          .nav-inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
          }

          /* Logo */
          .logo-wrap {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            flex-shrink: 0;
          }

          .logo-icon-ring {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.35);
            transition: all 0.4s ease;
          }

          .logo-wrap:hover .logo-icon-ring {
            box-shadow: 0 0 32px rgba(236, 72, 153, 0.6);
            transform: rotate(-5deg) scale(1.05);
          }

          .logo-icon-ring svg {
            color: white;
            font-size: 18px;
          }

          .logo-name {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.6rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            background: linear-gradient(135deg, var(--pink-light) 0%, var(--pink) 50%, var(--pink-dark) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Nav Links */
          .nav-links {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-link {
            text-decoration: none;
            color: var(--text-muted);
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            position: relative;
            transition: color 0.3s ease;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--pink), transparent);
            transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .nav-link:hover,
          .nav-link.active {
            color: var(--pink);
          }

          .nav-link:hover::after,
          .nav-link.active::after {
            width: 60%;
          }

          /* Right Actions */
          .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .btn-ghost {
            padding: 0.5rem 1.25rem;
            border-radius: 8px;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.04em;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            transition: all 0.3s ease;
          }

          .btn-ghost:hover {
            border-color: var(--pink);
            color: var(--pink);
            background: var(--pink-bg);
          }

          .btn-pink {
            padding: 0.5rem 1.5rem;
            border-radius: 8px;
            background: linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%);
            border: none;
            color: white;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
          }

          .btn-pink::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--pink-light) 0%, var(--pink) 100%);
            opacity: 0;
            transition: opacity 0.3s;
          }

          .btn-pink:hover::before {
            opacity: 1;
          }

          .btn-pink:hover {
            box-shadow: 0 6px 28px rgba(236, 72, 153, 0.5);
            transform: translateY(-1px);
          }

          .btn-pink span { 
            position: relative; 
            z-index: 1; 
          }

          /* User Menu */
          .user-menu-wrap {
            position: relative;
          }

          .user-trigger {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px 6px 6px;
            border-radius: 40px;
            border: 1px solid var(--border);
            background: var(--surface-2);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .user-trigger:hover {
            border-color: var(--pink);
            background: var(--pink-bg);
          }

          .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Cormorant Garamond', serif;
            font-size: 0.875rem;
            font-weight: 700;
            color: white;
            flex-shrink: 0;
          }

          .user-name {
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-primary);
            max-width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .chevron {
            color: var(--text-muted);
            font-size: 0.65rem;
            transition: transform 0.3s ease;
          }

          .chevron.open { transform: rotate(180deg); }

          .user-dropdown {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            width: 220px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.1);
            animation: dropIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes dropIn {
            from { opacity: 0; transform: translateY(-8px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          .dropdown-header {
            padding: 1rem 1.25rem 0.75rem;
            border-bottom: 1px solid var(--border);
          }

          .dropdown-role {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--pink);
            font-weight: 600;
            margin-bottom: 2px;
          }

          .dropdown-email {
            font-size: 0.75rem;
            color: var(--text-muted);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0.75rem 1.25rem;
            text-decoration: none;
            color: var(--text-muted);
            font-size: 0.875rem;
            font-weight: 400;
            cursor: pointer;
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
            font-family: 'DM Sans', sans-serif;
            transition: all 0.2s ease;
          }

          .dropdown-item:hover {
            background: var(--pink-bg);
            color: var(--pink);
          }

          .dropdown-item.danger:hover {
            background: rgba(220, 38, 38, 0.08);
            color: #ef4444;
          }

          .dropdown-item svg {
            font-size: 0.8rem;
            flex-shrink: 0;
          }

          .dropdown-divider {
            height: 1px;
            background: var(--border);
            margin: 0;
          }

          /* Mobile Hamburger */
          .hamburger {
            display: none;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            border-radius: 8px;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .hamburger:hover {
            border-color: var(--pink);
            color: var(--pink);
            background: var(--pink-bg);
          }

          /* Mobile Drawer */
          .mobile-overlay {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 9998;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            animation: fadeIn 0.3s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .mobile-drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 300px;
            background: white;
            border-left: 1px solid var(--border);
            z-index: 9999;
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            box-shadow: -24px 0 64px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }

          .mobile-close {
            align-self: flex-end;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            border-radius: 8px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 1rem;
          }

          .mobile-close:hover {
            border-color: var(--pink);
            color: var(--pink);
          }

          .mobile-link {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: var(--text-muted);
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 0.06em;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            border: 1px solid transparent;
            transition: all 0.3s;
          }

          .mobile-link:hover {
            color: var(--pink);
            border-color: var(--border);
            background: var(--pink-bg);
          }

          .mobile-spacer { flex: 1; }

          /* Announcement bar */
          .announce-bar {
            background: linear-gradient(90deg, var(--pink-dark) 0%, var(--pink) 50%, var(--pink-dark) 100%);
            background-size: 200% 100%;
            animation: shimmerBG 4s linear infinite;
            text-align: center;
            padding: 6px 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
          }

          @keyframes shimmerBG {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          .nav-bar {
            top: 33px;
          }

          @media (max-width: 768px) {
            .nav-links { display: none; }
            .nav-actions .btn-ghost,
            .nav-actions .btn-pink,
            .nav-actions .user-menu-wrap { display: none; }
            .hamburger { display: flex; }
            .mobile-overlay.open { display: block; }
          }
        `}
      </style>

      <div className="nav-root">
        {/* Main Navbar */}
        <nav className={`nav-bar ${scrolled ? "scrolled" : "top"}`}>
          <div className="nav-inner">
            {/* Logo */}
            <Link to="/" className="logo-wrap">
              <div className="logo-icon-ring">
                <FaTicketAlt />
              </div>
              <span className="logo-name">Eventora</span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Actions */}
            <div className="nav-actions">
              {user ? (
                <>
                  {/* Notification Bell */}
                  <div className="notification-wrap">
                    <button
                      className="notification-btn"
                      onClick={() => setNotificationOpen(!notificationOpen)}
                    >
                      <FaBell />
                      {notifications.length > 0 && (
                        <div className="notification-count">
                          {notifications.length}
                        </div>
                      )}
                    </button>

                    {notificationOpen && (
                      <div className="notification-dropdown">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="notification-item"
                          >
                            {notification.message}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* User Menu */}
                  <div className="user-menu-wrap">
                    <div
                      className="user-trigger"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      <div className="user-avatar">
                        {user.name ? user.name[0].toUpperCase() : <FaUser />}
                      </div>
                      <span className="user-name">
                        {user.name || "Account"}
                      </span>
                      <FaChevronDown
                        className={`chevron ${userMenuOpen ? "open" : ""}`}
                      />
                    </div>

                    {userMenuOpen && (
                      <div className="user-dropdown">
                        <div className="dropdown-header">
                          <div className="dropdown-role">
                            {user.role || "Member"}
                          </div>
                          <div className="dropdown-email">{user.email}</div>
                        </div>

                        <Link
                          to={
                            user.role === "admin"
                              ? "/admin/dashboard"
                              : "/dashboard"
                          }
                          className="dropdown-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <FaTachometerAlt />
                          Dashboard
                        </Link>

                        <div className="dropdown-divider" />

                        <button
                          className="dropdown-item danger"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-pink">
                    <span>Join Free</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button className="hamburger" onClick={() => setMobileOpen(true)}>
              <FaBars />
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <>
            <div
              className="mobile-overlay open"
              onClick={() => setMobileOpen(false)}
            />
            <div className="mobile-drawer">
              <button
                className="mobile-close"
                onClick={() => setMobileOpen(false)}
              >
                <FaTimes />
              </button>

              <Link
                to="/"
                className="logo-wrap"
                style={{ marginBottom: "1rem" }}
              >
                <div className="logo-icon-ring">
                  <FaTicketAlt />
                </div>
                <span className="logo-name">Eventora</span>
              </Link>

              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="mobile-link">
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to={
                      user.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }
                    className="mobile-link"
                  >
                    <FaTachometerAlt style={{ fontSize: "0.875rem" }} />
                    Dashboard
                  </Link>
                  <div className="mobile-spacer" />
                  <button
                    onClick={handleLogout}
                    className="btn-ghost"
                    style={{ justifyContent: "center", padding: "0.75rem" }}
                  >
                    <FaSignOutAlt style={{ marginRight: 8 }} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="mobile-spacer" />
                  <Link
                    to="/login"
                    className="btn-ghost"
                    style={{ justifyContent: "center", padding: "0.75rem" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-pink"
                    style={{ justifyContent: "center", padding: "0.875rem" }}
                  >
                    <span>Join Free</span>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Spacer for fixed nav + announce bar */}
      <div style={{ height: "105px" }} />
    </>
  );
};

export default Navbar;
