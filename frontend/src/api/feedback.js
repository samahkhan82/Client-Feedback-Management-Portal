import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

export const submitFeedback = async (data, token) => {
  return await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFeedbacks = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
