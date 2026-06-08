import { useState } from "react";
import { Shield, Calendar, Lock, CheckCircle2 } from "lucide-react";
import Modal from "./Modal";
import { savingsApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const CreateSafelockModal = ({ onClose, onSuccess }) => {
	const [title, setTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [days, setDays] = useState("30");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user, refreshUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numAmount = parseFloat(amount);
		if (numAmount < 1000) return setError("Minimum Safelock amount is ₦1,000");
		if (numAmount > user.balance) return setError("Insufficient balance.");

		setLoading(true);
		setError("");

		try {
			const maturityDate = new Date();
			maturityDate.setDate(maturityDate.getDate() + parseInt(days));

			await savingsApi.create({
				title,
				amount: numAmount,
				maturityDate: maturityDate.toISOString(),
			}, { "X-Idempotency-Key": crypto.randomUUID() });

			await refreshUser();
			onSuccess();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create Safelock");
		} finally {
			setLoading(false);
		}
	};

	const interest = amount ? (parseFloat(amount) * 0.1).toLocaleString() : "0";

	return (
		<Modal title="Create Safelock" onClose={onClose}>
			<form onSubmit={handleSubmit} className="space-y-6 pb-4">
				{error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-wider">{error}</div>}
				
				<div className="bg-[#effaf2] p-4 rounded-2xl flex items-center space-x-4 border border-[#3bb75e]/10">
					<div className="bg-[#3bb75e] text-white p-2 rounded-lg"><Shield size={18} /></div>
					<div>
						<p className="text-[10px] font-black uppercase tracking-widest text-[#3bb75e]">Interest Rate</p>
						<p className="text-sm font-bold text-slate-800">Earn 10.0% p.a. on your locked funds</p>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">What is this for?</label>
						<input
							className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-sm font-bold"
							placeholder="e.g. Christmas, New Car"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>

					<div className="flex gap-4">
						<div className="flex-1">
							<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Amount (₦)</label>
							<input
								type="number"
								className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-sm font-bold"
								placeholder="0"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
						</div>
						<div className="flex-1">
							<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Interest</label>
							<div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[#3bb75e] font-black text-sm">
								+ ₦{interest}
							</div>
						</div>
					</div>
				</div>

				<div>
					<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Select Maturity</label>
					<div className="grid grid-cols-3 gap-3">
						{[30, 60, 90].map((d) => (
							<button
								key={d}
								type="button"
								onClick={() => setDays(d.toString())}
								className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
									days === d.toString() 
										? 'border-[#E4570A] bg-[#E4570A] text-white shadow-lg shadow-[#E4570A]/20' 
										: 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
								}`}
							>
								{d} Days
							</button>
						))}
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-4 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center space-x-3 transition-transform hover:translate-y-[-2px] disabled:opacity-50"
				>
					<Lock size={14} />
					<span>{loading ? "Locking..." : "Enable Safelock"}</span>
				</button>
			</form>
		</Modal>
	);
};

export default CreateSafelockModal;
