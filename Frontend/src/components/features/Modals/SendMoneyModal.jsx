import { useState } from "react";
import { ArrowRight, Send, AlertCircle } from "lucide-react";
import Modal from "./Modal";
import PinModal from "./PinModal";
import SetPinModal from "./SetPinModal";
import { transactionsApi, pinApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const SendMoneyModal = ({ onClose, onRefresh }) => {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [step, setStep] = useState("form"); // form, pin, set-pin
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user, refreshUser } = useAuth();

	const handlePreSubmit = (e) => {
		e.preventDefault();
		const numAmount = parseFloat(amount);
		if (numAmount > user.balance) return setError("Insufficient balance.");
		if (numAmount <= 0) return setError("Invalid amount.");

		// Check if PIN is set
		if (!user.isPinSet) {
			setStep("set-pin");
		} else {
			setStep("pin");
		}
	};

	const handlePinComplete = async (pin) => {
		setLoading(true);
		setError("");
		try {
			// 1. Verify PIN
			await pinApi.verify(pin);
			
			// 2. Process Transaction
			const idempotencyKey = crypto.randomUUID();
			await transactionsApi.create({
				amount: parseFloat(amount),
				type: "debit",
				category: "Transfer",
				description: `Transfer to ${recipient}${note ? `: ${note}` : ""}`,
			}, { "X-Idempotency-Key": idempotencyKey });

			await refreshUser();
			if (onRefresh) onRefresh();
			onClose();
		} catch (err) {
			setError(err.response?.data?.message || "Invalid PIN. Please try again.");
			setStep("form"); // Go back to fix it
		} finally {
			setLoading(false);
		}
	};

	if (step === "pin") {
		return (
			<PinModal 
				title={`Authorize ₦${parseFloat(amount).toLocaleString()}`}
				onClose={() => setStep("form")}
				onSuccess={handlePinComplete}
				loading={loading}
			/>
		);
	}

	if (step === "set-pin") {
		return (
			<SetPinModal 
				onClose={() => setStep("form")}
				onSuccess={() => setStep("pin")}
			/>
		);
	}

	return (
		<Modal title="Send Money" onClose={onClose}>
			<form onSubmit={handlePreSubmit} className="space-y-6 pb-4">
				{error && (
					<div className="p-3 bg-red-50 text-red-600 rounded-2xl flex items-center space-x-3">
						<AlertCircle size={16} />
						<span className="text-[10px] font-black uppercase tracking-wider">{error}</span>
					</div>
				)}

				<div className="space-y-4">
					<div>
						<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Recipient Details</label>
						<input
							type="text"
							className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-sm font-bold shadow-inner"
							placeholder="Username, Email or Phone"
							value={recipient}
							onChange={(e) => setRecipient(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Amount (₦)</label>
						<input
							type="number"
							className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-2xl font-black shadow-inner"
							placeholder="0.00"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Add a Note (Optional)</label>
						<input
							type="text"
							className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-xs font-medium italic"
							placeholder="e.g. Lunch from yesterday"
							value={note}
							onChange={(e) => setNote(e.target.value)}
						/>
					</div>
				</div>

				<div className="bg-[#effaf2] p-4 rounded-2xl flex items-center space-x-4 border border-[#3bb75e]/10">
					<div className="bg-[#3bb75e] text-white p-2 rounded-xl"><Send size={18} /></div>
					<div className="flex-1">
						<div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#3bb75e]">
							<span>Instant Transfer</span>
							<span>Free</span>
						</div>
						<p className="text-[10px] font-medium text-slate-400 mt-0.5 whitespace-nowrap">Your friend will receive funds instantly.</p>
					</div>
				</div>

				<button
					type="submit"
					className="w-full py-4 bg-[#E4570A] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#E4570A]/20 flex items-center justify-center space-x-3 transition-all hover:scale-[1.01] active:translate-y-1"
				>
					<span>Review Transaction</span>
					<ArrowRight size={14} />
				</button>
			</form>
		</Modal>
	);
};

export default SendMoneyModal;
