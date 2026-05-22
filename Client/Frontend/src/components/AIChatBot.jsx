import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaMicrophone,
  FaRegSmile,
  FaRegClock,
  FaSpinner,
  FaCheckCircle,
  FaUserCircle,
  FaBrain,
  FaCrown,
  FaMagic,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! 👋 I'm your AI event assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        {
          subject: message,
          description: message,
        },
      );

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          response.data.data.response ||
          "I'm here to help! Could you please provide more details?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "I'm experiencing some technical difficulties. Please try again in a moment. 🙏",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Find events near me",
    "How to book tickets?",
    "Cancel my booking",
    "Event recommendations",
  ];

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chat-button ${open ? "open" : ""} ${isHovered ? "hovered" : ""}`}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="button-glow"></div>
        <div className="button-content">
          {open ? (
            <FaTimes className="button-icon" />
          ) : (
            <>
              <FaRobot className="button-icon" />
              <div className="pulse-ring"></div>
              <div className="notification-dot"></div>
            </>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="header-gradient"></div>
            <div className="header-content">
              <div className="header-left">
                <div className="avatar-wrapper">
                  <div className="avatar-glow"></div>
                  <FaBrain className="avatar-icon" />
                </div>
                <div className="header-info">
                  <h3>Eventora AI</h3>
                  <div className="status">
                    <span className="status-dot"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <div className="header-right">
                <button className="close-btn" onClick={() => setOpen(false)}>
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === "bot" ? (
                    <div className="bot-avatar">
                      <FaRobot />
                    </div>
                  ) : (
                    <div className="user-avatar">
                      <FaUserCircle />
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    {msg.sender === "bot" && (
                      <div className="message-actions">
                        <button className="action-btn">
                          <FaRegSmile />
                        </button>
                        <button className="action-btn">
                          <FaRegClock />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="message-time">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message-avatar">
                  <div className="bot-avatar typing-avatar">
                    <FaRobot />
                  </div>
                </div>
                <div className="message-content">
                  <div className="message-bubble typing-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="suggestions">
              <div className="suggestions-header">
                <BsStars className="stars-icon" />
                <span>Suggested Questions</span>
              </div>
              <div className="suggestions-grid">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    className="suggestion-btn"
                    onClick={() => {
                      setMessage(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                  >
                    <FaMagic className="suggestion-icon" />
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="chat-footer">
            <div className="input-wrapper">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about events..."
                rows="1"
                className="chat-input"
              />
              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={!message.trim()}
              >
                {isTyping ? (
                  <FaSpinner className="spinner" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
            <div className="footer-note">
              <FaCheckCircle className="secure-icon" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.3); opacity: 0; }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Chat Button */
          .chat-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
            height: 70px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }
          
          .chat-button:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
          }
          
          .chat-button.open {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            transform: rotate(90deg);
          }
          
          .button-glow {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .chat-button:hover .button-glow {
            opacity: 0.6;
          }
          
          .button-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .button-icon {
            color: white;
            font-size: 28px;
            transition: transform 0.3s;
          }
          
          .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            animation: pulse 2s infinite;
          }
          
          .notification-dot {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 12px;
            height: 12px;
            background: #f56565;
            border-radius: 50%;
            border: 2px solid white;
          }
          
          /* Chat Window */
          .chat-window {
            position: fixed;
            bottom: 120px;
            right: 30px;
            width: 420px;
            height: 650px;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.3s ease-out;
          }
          
          /* Header */
          .chat-header {
            position: relative;
            background: white;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          }
          
          .header-gradient {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 300% 100%;
            animation: gradientShift 3s ease infinite;
          }
          
          .header-content {
            padding: 20px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .avatar-wrapper {
            position: relative;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .avatar-glow {
            position: absolute;
            inset: -2px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            filter: blur(8px);
            opacity: 0.5;
          }
          
          .avatar-icon {
            position: relative;
            color: white;
            font-size: 24px;
          }
          
          .header-info h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #1a202c;
          }
          
          .status {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: 2px;
          }
          
          .status-dot {
            width: 8px;
            height: 8px;
            background: #48bb78;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          
          .status span {
            font-size: 12px;
            color: #718096;
          }
          
          .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .premium-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            border-radius: 20px;
            color: white;
            font-size: 12px;
            font-weight: 600;
          }
          
          .premium-icon {
            font-size: 12px;
          }
          
          .close-btn {
            width: 32px;
            height: 32px;
            border: none;
            background: #f3f4f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .close-btn:hover {
            background: #e5e7eb;
            transform: rotate(90deg);
          }
          
          /* Body */
          .chat-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #fafbfc;
          }
          
          .chat-body::-webkit-scrollbar {
            width: 6px;
          }
          
          .chat-body::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          
          .chat-body::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 3px;
          }
          
          .message-wrapper {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
            animation: slideIn 0.3s ease-out;
          }
          
          .message-wrapper.user {
            flex-direction: row-reverse;
          }
          
          .message-avatar {
            flex-shrink: 0;
          }
          
          .bot-avatar, .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }
          
          .bot-avatar {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
          }
          
          .user-avatar {
            background: #e2e8f0;
            color: #4a5568;
          }
          
          .message-content {
            flex: 1;
            max-width: calc(100% - 48px);
          }
          
          .message-bubble {
            padding: 12px 16px;
            border-radius: 18px;
            position: relative;
          }
          
          .message-wrapper.bot .message-bubble {
            background: white;
            border: 1px solid #e2e8f0;
            border-bottom-left-radius: 4px;
          }
          
          .message-wrapper.user .message-bubble {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-bottom-right-radius: 4px;
          }
          
          .message-bubble p {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
          }
          
          .message-actions {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }
          
          .action-btn {
            width: 24px;
            height: 24px;
            border: none;
            background: transparent;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .action-btn:hover {
            background: #f3f4f6;
          }
          
          .message-time {
            font-size: 10px;
            color: #a0aec0;
            margin-top: 4px;
            margin-left: 12px;
          }
          
          .message-wrapper.user .message-time {
            text-align: right;
            margin-right: 12px;
            margin-left: 0;
          }
          
          /* Typing Indicator */
          .typing-bubble {
            padding: 16px 20px;
          }
          
          .typing-indicator {
            display: flex;
            gap: 6px;
          }
          
          .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #cbd5e0;
            border-radius: 50%;
            animation: typing 1.4s infinite;
          }
          
          .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
          }
          
          /* Suggestions */
          .suggestions {
            padding: 16px 20px;
            border-top: 1px solid #e2e8f0;
            background: white;
          }
          
          .suggestions-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            font-size: 12px;
            font-weight: 600;
            color: #4a5568;
          }
          
          .stars-icon {
            color: #fbbf24;
          }
          
          .suggestions-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .suggestion-btn {
            padding: 8px 16px;
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            font-size: 12px;
            color: #4a5568;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .suggestion-btn:hover {
            background: #edf2f7;
            border-color: #667eea;
            transform: translateY(-2px);
          }
          
          .suggestion-icon {
            font-size: 10px;
            color: #667eea;
          }
          
          /* Footer */
          .chat-footer {
            padding: 16px 20px;
            background: white;
            border-top: 1px solid #e2e8f0;
          }
          
          .input-wrapper {
            display: flex;
            align-items: flex-end;
            gap: 12px;
            background: #f7fafc;
            border-radius: 24px;
            padding: 8px 12px;
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
          }
          
          .input-wrapper:focus-within {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          
          .chat-input {
            flex: 1;
            border: none;
            background: transparent;
            resize: none;
            font-size: 14px;
            font-family: inherit;
            padding: 6px 0;
            outline: none;
            max-height: 100px;
          }
          
          .send-btn {
            width: 32px;
            height: 32px;
            border: none;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            color: white;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .send-btn:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
          
          .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .spinner {
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .footer-note {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-top: 12px;
            font-size: 10px;
            color: #a0aec0;
          }
          
          .secure-icon {
            font-size: 10px;
            color: #48bb78;
          }
          
          /* Responsive */
          @media (max-width: 640px) {
            .chat-window {
              width: calc(100vw - 40px);
              right: 20px;
              bottom: 100px;
              height: 600px;
            }
            
            .chat-button {
              right: 20px;
              bottom: 20px;
            }
          }
        `}
      </style>
    </>
  );
}
