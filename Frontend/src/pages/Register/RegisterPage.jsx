import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { login } = useAuth(); // We'll use this to auto-login after registration
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		// Validate passwords match
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			// Here you would typically make an API call to register the user
			// For now, we'll simulate a successful registration
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Auto-login after successful registration
			await login(email, password);
			navigate("/");
		} catch (err) {
			setError("Registration failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<div className="flex justify-center mb-8">
					<div className="bg-purple-700 h-16 w-16 rounded-full"></div>
				</div>
				<h1 className="text-2xl font-bold text-center mb-6">
					Create an Account
				</h1>

				{error && (
					<p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>
				)}

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block text-slate-700 mb-2" htmlFor="firstName">
								First Name
							</label>
							<input
								id="firstName"
								type="text"
								className="w-full p-3 border border-slate-300 rounded"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label className="block text-slate-700 mb-2" htmlFor="lastName">
								Last Name
							</label>
							<input
								id="lastName"
								type="text"
								className="w-full p-3 border border-slate-300 rounded"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="email">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full p-3 border border-slate-300 rounded"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="password">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="w-full p-3 border border-slate-300 rounded"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-slate-700 mb-2"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							className="w-full p-3 border border-slate-300 rounded"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-purple-700 text-white p-3 rounded font-medium"
						disabled={loading}
					>
						{loading ? "Creating account..." : "Create Account"}
					</button>
				</form>

				<p className="text-center mt-6">
					Already have an account?{" "}
					<Link to="/login" className="text-purple-700">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
