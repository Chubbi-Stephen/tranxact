import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { authApi } from "../services/api";

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) return setError("Passwords do not match");
		if (password.length < 6) return setError("Password must be at least 6 characters");

		setLoading(true);
		setError("");
		try {
			await authApi.resetPassword(token, password);
			setSuccess(true);
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			setError(err.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
			<div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
				<div className="absolute top-0 left-0 w-64 h-64 bg-[#E4570A] opacity-5 -ml-32 -mt-32 blur-[80px]"></div>

				<div className="relative z-10 text-center">
					{success ? (
						<div className="animate-in zoom-in-95">
							<div className="bg-green-50 p-6 rounded-[2rem] text-[#3bb75e] w-fit mx-auto mb-8">
								<CheckCircle2 size={48} />
							</div>
							<h1 className="text-3xl font-black text-slate-900 mb-4">Success!</h1>
							<p className="text-slate-500 font-medium mb-12">
								Your password has been reset successfully. Redirecting you to login...
							</p>
							<Link
								to="/login"
								className="inline-block text-sm font-black text-[#E4570A] uppercase tracking-widest"
							>
								Click here if not redirected
							</Link>
						</div>
					) : (
						<>
							<div className="bg-slate-50 p-4 rounded-3xl text-slate-400 w-fit mx-auto mb-8">
								<Lock size={32} />
							</div>
							<h1 className="text-3xl font-black text-slate-900 mb-2">New Password</h1>
							<p className="text-sm font-medium text-slate-400 mb-10">
								Choose a strong password to protect your account.
							</p>

							<form onSubmit={handleSubmit} className="text-left space-y-6">
								{error && (
									<div className="p-4 bg-red-50 text-red-500 rounded-2xl flex items-center space-x-3">
										<AlertCircle size={18} />
										<span className="text-[10px] font-black uppercase tracking-wider">{error}</span>
									</div>
								)}

								<div className="space-y-4">
									<div className="relative">
										<label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 ml-4">New Password</label>
										<input
											type={showPass ? "text" : "password"}
											className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:border-[#E4570A] outline-none text-sm font-bold pr-14 shadow-inner"
											placeholder="••••••••"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<button
											type="button"
											onClick={() => setShowPass(!showPass)}
											className="absolute right-6 top-[2.4rem] text-slate-300 hover:text-slate-600"
										>
											{showPass ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>

									<div>
										<label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 ml-4">Confirm Password</label>
										<input
											type="password"
											className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:border-[#E4570A] outline-none text-sm font-bold shadow-inner"
											placeholder="••••••••"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</div>
								</div>

								<button
									type="submit"
									disabled={loading}
									className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-2px] transition-all disabled:opacity-50"
								>
									{loading ? "Updating..." : "Update Password"}
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
