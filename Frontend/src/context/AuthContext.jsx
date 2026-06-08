import { createContext, useContext, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext();

const getStoredUser = () => {
	try {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	} catch {
		return null;
	}
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(getStoredUser);
	const [token, setToken] = useState(() => localStorage.getItem("token") || null);
	const [loading, setLoading] = useState(false);

	const _saveSession = (userData, jwtToken) => {
		setUser(userData);
		setToken(jwtToken);
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", jwtToken);
	};

	const _clearSession = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	const login = async (email, password) => {
		setLoading(true);
		try {
			const { data } = await authApi.login({ email, password });
			_saveSession(data.user, data.token);
			return data;
		} finally {
			setLoading(false);
		}
	};

	const register = async (formData) => {
		setLoading(true);
		try {
			const { data } = await authApi.register(formData);
			_saveSession(data.user, data.token);
			return data;
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			await authApi.logout();
		} catch {
			// Still clear session even if the API call fails
		} finally {
			_clearSession();
		}
	};

	const refreshUser = async () => {
		try {
			const { data } = await authApi.getProfile();
			const updated = data.user;
			setUser(updated);
			localStorage.setItem("user", JSON.stringify(updated));
			return updated;
		} catch {
			return null;
		}
	};

	return (
		<AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
