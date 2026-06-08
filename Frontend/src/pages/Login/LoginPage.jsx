import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login, loading } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await login(email, password);
			navigate("/");
		} catch (err) {
			const message = err.response?.data?.message || "Invalid email or password";
			setError(message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
			<div className="bg-[#E5E3DC] p-8 rounded-lg border border-slate-200 shadow-md w-full max-w-md">
				<div className="flex justify-center mb-8">
					<div className="bg-[#E4570A] h-16 w-16 rounded-full flex justify-center items-center">
						<span className="text-white text-3xl font-bold">T</span>
					</div>
				</div>
				<h1 className="text-2xl font-bold text-center mb-6">Login to Tranxact</h1>

				{error && (
					<p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoComplete="email"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-slate-700 mb-2" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete="current-password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[#E4570A] text-white p-3 rounded font-medium hover:bg-[#c94508] transition-colors disabled:opacity-60"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="text-center mt-6 text-sm">
					Don&apos;t have an account?{" "}
					<Link to="/register" className="text-[#E4570A] font-medium hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
