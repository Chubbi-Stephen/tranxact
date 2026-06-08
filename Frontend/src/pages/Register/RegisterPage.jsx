import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage = () => {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const { register, loading } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const { firstName, lastName, username, email, password } = form;
			await register({ firstName, lastName, username, email, password });
			navigate("/");
		} catch (err) {
			const message = err.response?.data?.message || "Registration failed. Please try again.";
			setError(message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
			<div className="bg-[#E5E3DC] p-8 rounded-lg shadow-md w-full max-w-md">
				<div className="flex justify-center mb-8">
					<div className="bg-[#E4570A] h-16 w-16 rounded-full flex justify-center items-center">
						<span className="text-white text-3xl font-bold">T</span>
					</div>
				</div>
				<h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

				{error && (
					<p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>
				)}

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block text-slate-700 mb-2" htmlFor="firstName">First Name</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
								value={form.firstName}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label className="block text-slate-700 mb-2" htmlFor="lastName">Last Name</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
								value={form.lastName}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="username">Username</label>
						<input
							id="username"
							name="username"
							type="text"
							className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
							value={form.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
							value={form.email}
							onChange={handleChange}
							required
							autoComplete="email"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-slate-700 mb-2" htmlFor="password">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
							value={form.password}
							onChange={handleChange}
							required
							autoComplete="new-password"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-slate-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							className="w-full p-3 border border-[#E4570A] rounded focus:outline-none focus:ring-2 focus:ring-[#E4570A]/40"
							value={form.confirmPassword}
							onChange={handleChange}
							required
							autoComplete="new-password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-[#E4570A] text-white p-3 rounded font-medium hover:bg-[#c94508] transition-colors disabled:opacity-60"
						disabled={loading}
					>
						{loading ? "Creating account..." : "Create Account"}
					</button>
				</form>

				<p className="text-center mt-6 text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-[#E4570A] font-medium hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
