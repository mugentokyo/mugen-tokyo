import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

api.interceptors.request.use((config) => {
  const auth = useAuthStore();

  if (auth.user) {
    config.headers["x-user"] = JSON.stringify({
      id: auth.user._id,
      username: auth.user.username,
      role: auth.user.role,
    });
  }

  return config;
});

export default api;
