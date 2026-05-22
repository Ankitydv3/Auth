import { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaRegSmile,
  FaRegClock,
  FaSpinner,
  FaCheckCircle,
  FaUserCircle,
  FaBrain,
  FaMagic,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import api from "../utils/axios";

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

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
      const response = await api.post(`/ai/analyze`, {
        subject: message,
        description: message,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text:
            response.data.data.response || "Could you provide more details?",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Technical issue. Please try again. 🙏",
          timestamp: new Date(),
        },
      ]);
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
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        className="chat-button"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
          transition: "all 0.3s",
          transform: open ? "rotate(90deg)" : "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = open ? "rotate(90deg)" : "none")
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {open ? (
            <FaTimes style={{ color: "white", fontSize: "28px" }} />
          ) : (
            <FaRobot style={{ color: "white", fontSize: "28px" }} />
          )}
        </div>
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "120px",
            right: "30px",
            width: "420px",
            height: "650px",
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px 24px",
              background: "white",
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaBrain style={{ color: "white", fontSize: "24px" }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>
                  Eventora AI
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#48bb78",
                      borderRadius: "50%",
                    }}
                  ></span>
                  <span style={{ fontSize: "12px", color: "#718096" }}>
                    Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: "32px",
                height: "32px",
                border: "none",
                background: "#f3f4f6",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#fafbfc",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "20px",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background:
                        msg.sender === "bot"
                          ? "linear-gradient(135deg, #667eea, #764ba2)"
                          : "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: msg.sender === "bot" ? "white" : "#4a5568",
                    }}
                  >
                    {msg.sender === "bot" ? <FaRobot /> : <FaUserCircle />}
                  </div>
                </div>
                <div style={{ flex: 1, maxWidth: "calc(100% - 48px)" }}>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "18px",
                      background:
                        msg.sender === "bot"
                          ? "white"
                          : "linear-gradient(135deg, #667eea, #764ba2)",
                      border:
                        msg.sender === "bot" ? "1px solid #e2e8f0" : "none",
                      color: msg.sender === "user" ? "white" : "inherit",
                      borderBottomLeftRadius:
                        msg.sender === "bot" ? "4px" : "18px",
                      borderBottomRightRadius:
                        msg.sender === "user" ? "4px" : "18px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
                      {msg.text}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#a0aec0",
                      marginTop: "4px",
                      textAlign: msg.sender === "user" ? "right" : "left",
                    }}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{ display: "flex", gap: "12px", marginBottom: "20px" }}
              >
                <div>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <FaRobot />
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      padding: "16px 20px",
                      background: "white",
                      borderRadius: "18px",
                      borderBottomLeftRadius: "4px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "#cbd5e0",
                          borderRadius: "50%",
                          animation: "typing 1.4s infinite",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "#cbd5e0",
                          borderRadius: "50%",
                          animation: "typing 1.4s infinite 0.2s",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "#cbd5e0",
                          borderRadius: "50%",
                          animation: "typing 1.4s infinite 0.4s",
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #e2e8f0",
                background: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <BsStars style={{ color: "#fbbf24" }} />
                <span>Suggested Questions</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMessage(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                    style={{
                      padding: "8px 16px",
                      background: "#f7fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "20px",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaMagic style={{ fontSize: "10px", color: "#667eea" }} />
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div
            style={{
              padding: "16px 20px",
              background: "white",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                background: "#f7fafc",
                borderRadius: "24px",
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                rows="1"
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  resize: "none",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "none",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  borderRadius: "50%",
                  color: "white",
                  cursor: message.trim() ? "pointer" : "not-allowed",
                  opacity: message.trim() ? 1 : 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isTyping ? (
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "12px",
                fontSize: "10px",
                color: "#a0aec0",
              }}
            >
              <FaCheckCircle style={{ fontSize: "10px", color: "#48bb78" }} />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
