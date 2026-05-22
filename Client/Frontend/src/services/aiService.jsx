import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const analyzeTicket = async (data) => {
  const response = await axios.post(`${API}/ai/analyze`, data);

  return response.data;
};
