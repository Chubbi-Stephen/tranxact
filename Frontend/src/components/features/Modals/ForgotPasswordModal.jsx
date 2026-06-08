import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Modal from "./Modal";
import { authApi } from "../../../services/api";

const ForgotPasswordModal = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await authApi.forgotPassword(email);
			setSuccess(true);
		} catch (err) {
			setError(err.response?.data?.message || "Failed to send reset email");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<Modal title="Check Email" onClose={onClose}>
				<div className="p-8 text-center animate-in zoom-in-95">
					<div className="bg-green-50 p-6 rounded-[2rem] text-[#3bb75e] w-fit mx-auto mb-8">
						<CheckCircle2 size={48} />
					</div>
					<h3 className="text-xl font-black text-slate-900 mb-2">Instructions Sent!</h3>
					<p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
						We've sent a password reset link to <span className="font-bold text-slate-900">{email}</span>. 
						Please check your spam folder if you don't see it.
					</p>
					<button
						onClick={onClose}
						className="w-full py-4 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em]"
					>
						Back to Login
					</button>
				</div>
			</Modal>
		);
	}

	return (
		<Modal title="Reset Password" onClose={onClose}>
			<form onSubmit={handleSubmit} className="p-4 space-y-8 text-center">
				<div className="bg-slate-50 p-4 rounded-3xl text-slate-400 w-fit mx-auto">
					<Mail size={32} />
				</div>
				
				<div className="px-4">
					<h3 className="text-xl font-black text-slate-900 mb-2">Forgot Password?</h3>
					<p className="text-sm font-medium text-slate-400">
						Enter your registered email address and we'll send you instructions to reset it.
					</p>
				</div>

				<div className="space-y-4 text-left">
					{error && <div className="p-3 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase text-center">{error}</div>}
					
					<div>
						<label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 ml-4">Email Address</label>
						<input
							type="email"
							className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:border-[#E4570A] outline-none text-sm font-bold shadow-inner"
							placeholder="e.g. name@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-4 bg-[#E4570A] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#E4570A]/20 flex items-center justify-center space-x-3"
				>
					<span>{loading ? "Sending..." : "Send Reset Link"}</span>
					<ArrowRight size={14} />
				</button>
			</form>
		</Modal>
	);
};

export default ForgotPasswordModal;
