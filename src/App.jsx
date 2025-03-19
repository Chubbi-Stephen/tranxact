import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import WalletPage from "./pages/Wallet/WalletPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/" element={<Layout />}>
						<Route
							index
							element={
								<ProtectedRoute>
									<HomePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="wallet"
							element={
								<ProtectedRoute>
									<WalletPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="transactions"
							element={
								<ProtectedRoute>
									<TransactionsPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="profile"
							element={
								<ProtectedRoute>
									<ProfilePage />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
