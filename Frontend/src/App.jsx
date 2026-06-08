import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import WalletPage from "./pages/Wallet/WalletPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<ThemeProvider>
		<AuthProvider>
			<Toaster 
				position="top-center" 
				toastOptions={{
					duration: 4000,
					style: {
						background: '#013653',
						color: '#fff',
						borderRadius: '1rem',
						fontSize: '12px',
						fontWeight: '900',
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						padding: '16px 24px',
						boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
					}
				}} 
			/>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/verify/:token" element={<VerifyEmailPage />} />
					<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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
		</ThemeProvider>
	);
}

export default App;
