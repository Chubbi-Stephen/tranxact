import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
});

// ── Request interceptor: attach JWT on every request ──────────────────────────
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 globally ─────────────────────────────────
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token expired — clear storage and reload to /login
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

// ── Auth endpoints ─────────────────────────────────────────────────────────────
export const authApi = {
	register: (data) => api.post("/auth/register", data),
	login: (data) => api.post("/auth/login", data),
	verify: () => api.get("/auth/verify"),
	getProfile: () => api.get("/auth/profile"),
	verifyEmail: (token) => api.post(`/auth/verify-email/${token}`),
	forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
	resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// ── Transaction endpoints ──────────────────────────────────────────────────────
export const transactionsApi = {
	getAll: (params) => api.get("/transactions", { params }),
	getSummary: () => api.get("/transactions/summary"),
	getById: (id) => api.get(`/transactions/${id}`),
	create: (data, headers = {}) => api.post("/transactions", data, { headers }),
	update: (id, data) => api.put(`/transactions/${id}`, data),
	delete: (id) => api.delete(`/transactions/${id}`),
};

// ── AI endpoints ───────────────────────────────────────────────────────────────
export const aiApi = {
	analyze: () => api.get("/ai/analyze"),
	recommendations: () => api.get("/ai/recommendations"),
	predict: () => api.get("/ai/predict"),
};

// ── Savings (Safelock) endpoints ────────────────────────────────────────────────
export const savingsApi = {
	getAll: () => api.get("/savings"),
	create: (data, headers = {}) => api.post("/savings", data, { headers }),
	withdraw: (id) => api.post(`/savings/${id}/withdraw`),
};

// ── PIN endpoints ──────────────────────────────────────────────────────────────
export const pinApi = {
	set: (pin) => api.post("/pin/set", { pin }),
	verify: (pin) => api.post("/pin/verify", { pin }),
};

export default api;
