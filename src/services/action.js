import axios from "axios";

// const API_URL = "https://eventmanagementbackend-qhj3.onrender.com/api/v1";
const API_URL = import.meta.env.VITE_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const updateUserProfile = async (userData, token) => {
  const response = await axios.patch(`${API_URL}/user/updateuser`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const createMeetng = async (meetingData, token) => {
  const response = await axios.post(`${API_URL}/meeting`, meetingData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getMyMeeting = async (token) => {
  const response = await axios.get(`${API_URL}/meeting`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateMeeting = async (meetinData, token, meetingId) => {
  const response = await axios.patch(
    `${API_URL}/meeting/${meetingId}`,
    meetinData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const deleteMeeting = async (meetingId, token) => {
  const response = await axios.delete(`${API_URL}/meeting/${meetingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getGuestMeeting = async (token) => {
  const response = await axios.get(`${API_URL}/meeting/guests`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const updateGuestMeeting = async (meetingData, token, meetingId) => {
  const response = await axios.patch(
    `${API_URL}/meeting/guests/${meetingId}`,
    meetingData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getMyMeetingById = async (meetingId) => {
  const response = await axios.get(`${API_URL}/copymeeting/${meetingId}`);
  return response.data;
};
