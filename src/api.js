import axios from "axios";

// ✅ Priority order:
// 1. VITE_API_URL  — set this in GitHub repo secrets as a Pages env var
//                    OR inject via VIA's deploy step for each app
// 2. localhost     — only when actually running on localhost (dev mode)
// 3. window.origin — fallback for same-origin deployments
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : window.location.origin);

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) localStorage.removeItem("via_token");
    return Promise.reject(err);
  }
);

export const getItems   = (params = {}) => api.get("/items", { params });
export const getItem    = (id)            => api.get(`/items/${id}`);
export const createItem = (data)          => api.post("/items", data);
export const updateItem = (id, data)      => api.put(`/items/${id}`, data);
export const deleteItem = (id)            => api.delete(`/items/${id}`);
export const getStats   = ()              => api.get("/stats");

export default api;
