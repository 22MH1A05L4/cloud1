// axios instance for backend API calls
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api",
});

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/agent/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Network error" };
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
