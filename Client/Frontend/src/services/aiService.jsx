import axios from "axios";

const API="http://localhost:5000/api";

export const analyzeTicket=async(data)=>{

const response=await axios.post(

`${API}/ai/analyze`,
data

);

return response.data;

};