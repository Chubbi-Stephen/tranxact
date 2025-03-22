import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	// Mock login function - replace with actual API call later
	const login = async (email, password) => {
		// Simulate API call
		return new Promise((resolve) => {
			setTimeout(() => {
				// Mock successful login
				const userData = {
					id: "123",
					firstName: "John",
					lastName: "Doe",
					email: email,
					initials: "JD",
				};
				setUser(userData);
				localStorage.setItem("user", JSON.stringify(userData));
				resolve(userData);
			}, 1000);
		});
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
