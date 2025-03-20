import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await login(email, password);
			navigate("/");
		} catch (err) {
			setError("Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
			<div className="bg-[#E5E3DC] p-8 rounded-lg border border-slate-200 shadow-md w-full max-w-md">
				<div className="flex justify-center mb-8">
					<div className="bg-[#E4570A] h-16 w-16 rounded-full flex justify-center items-center">
						<span className="text-white text-3xl">T</span>
					</div>
				</div>
				<h1 className="text-2xl font-bold text-center mb-6">
					Login to Transact
				</h1>

				{error && (
					<p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full p-3 border border-[#E4570A] rounded"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-slate-700 mb-2" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="w-full p-3 border border-[#E4570A] rounded"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[#E4570A] text-white p-3 rounded font-medium"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="text-center mt-6">
					Don't have an account?{" "}
					<Link to="/register" className="text-[#E4570A]">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
