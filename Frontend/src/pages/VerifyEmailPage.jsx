import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck, XCircle, Loader2 } from "lucide-react";
import { authApi } from "../services/api";

const VerifyEmailPage = () => {
	const { token } = useParams();
	const [status, setStatus] = useState("verifying"); // verifying, success, error
	const [message, setMessage] = useState("");

	useEffect(() => {
		const verify = async () => {
			try {
				await authApi.verifyEmail(token);
				setStatus("success");
			} catch (err) {
				setStatus("error");
				setMessage(err.response?.data?.message || "Invalid or expired token");
			}
		};
		verify();
	}, [token]);

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
			<div className="bg-white w-full max-w-md rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
				{/* Decorative Background Blob */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-[#E4570A] opacity-5 -mr-32 -mt-32 blur-[80px]"></div>

				<div className="relative z-10">
					{status === "verifying" && (
						<div className="flex flex-col items-center">
							<Loader2 className="w-16 h-16 text-[#E4570A] animate-spin mb-6" />
							<h1 className="text-2xl font-black text-slate-900 mb-2">Verifying Email</h1>
							<p className="text-slate-400 font-medium tracking-tight">Please wait while we secure your account...</p>
						</div>
					)}

					{status === "success" && (
						<div className="flex flex-col items-center animate-in zoom-in-95">
							<div className="bg-green-50 p-6 rounded-[2rem] text-[#3bb75e] mb-8">
								<ShieldCheck size={48} />
							</div>
							<h1 className="text-3xl font-black text-slate-900 mb-4">Email Verified!</h1>
							<p className="text-slate-500 font-medium mb-12 px-4">
								Your account is now fully secured and verified. You're ready to start transacting.
							</p>
							<Link
								to="/login"
								className="w-full py-4 bg-[#E4570A] text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#E4570A]/20"
							>
								Continue to Login
							</Link>
						</div>
					)}

					{status === "error" && (
						<div className="flex flex-col items-center animate-in zoom-in-95">
							<div className="bg-red-50 p-6 rounded-[2rem] text-red-500 mb-8">
								<XCircle size={48} />
							</div>
							<h1 className="text-3xl font-black text-slate-900 mb-4">Verification Failed</h1>
							<p className="text-slate-500 font-medium mb-12 px-4">
								{message}. The link might have expired or already been used.
							</p>
							<Link
								to="/login"
								className="w-full py-4 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl"
							>
								Back to Login
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default VerifyEmailPage;
