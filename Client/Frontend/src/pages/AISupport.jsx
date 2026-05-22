import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaBrain,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaLightbulb,
  FaComments,
  FaStar,
} from "react-icons/fa";

export default function AISupport() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !description) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        {
          subject,
          description,
        },
      );
      setResult(response.data.data);
    } catch (error) {
      console.log("AI FRONTEND ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 mx-4 md:mx-8 mt-6 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-2 rounded-full mb-6">
            <FaRobot className="text-white" />
            <span className="text-white font-medium">AI Powered Support</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            AI Ticket Assistant
          </h1>
          <p className="text-pink-100 text-xl max-w-2xl mx-auto">
            Get instant answers and intelligent support for all your
            event-related queries
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                <FaComments className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Describe Your Issue
                </h2>
                <p className="text-gray-500 text-sm">
                  Our AI will analyze and provide intelligent solutions
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ticket Booking Issue, Event Cancellation, Payment Problem"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Provide detailed information about your issue..."
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-pink-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading || !subject || !description}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FaBrain />
                    Analyze Issue
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                <FaLightbulb className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  AI Analysis
                </h2>
                <p className="text-gray-500 text-sm">
                  Intelligent insights and recommendations
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4">
                    <FaRobot className="text-pink-500 text-5xl" />
                  </div>
                  <p className="text-gray-500">
                    Enter your issue above to get AI-powered assistance
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-gray-600 mt-4">
                    AI is analyzing your issue...
                  </p>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
                    <div className="flex items-center gap-3 mb-3">
                      <FaChartLine className="text-pink-500 text-xl" />
                      <h3 className="font-semibold text-gray-800">Category</h3>
                    </div>
                    <p className="text-2xl font-bold text-pink-600">
                      {result.category}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
                    <div className="flex items-center gap-3 mb-3">
                      <FaClock className="text-pink-500 text-xl" />
                      <h3 className="font-semibold text-gray-800">
                        Priority Level
                      </h3>
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        result.priority === "High"
                          ? "text-red-500"
                          : result.priority === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    >
                      {result.priority}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
                    <div className="flex items-center gap-3 mb-3">
                      <FaCheckCircle className="text-pink-500 text-xl" />
                      <h3 className="font-semibold text-gray-800">
                        AI Response
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {result.response}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl p-4 flex items-center gap-3">
                    <FaStar className="text-pink-500 text-xl" />
                    <p className="text-sm text-gray-700">
                      Need more help? Our support team is available 24/7
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
