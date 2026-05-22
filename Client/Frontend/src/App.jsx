import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EventDetail from "./pages/EventDetail";
import PaymentSuccess from "./pages/PaymentSucess";
import AISupport from "./pages/AISupport";
import AIChatBot from "./components/AIChatBot";
import PaymentFailed from "./pages/PaymentFailed";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./index.css";

function App() {
  return (
    <>
      <Navbar />
      <AIChatBot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />

        <Route path="/event/:id" element={<EventDetail />} />

        <Route path="/payment/success" element={<PaymentSuccess />} />

        <Route path="/payment/failed" element={<PaymentFailed />} />
      </Routes>
    </>
  );
}

export default App;
