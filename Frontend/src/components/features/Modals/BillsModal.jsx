import { useState } from "react";
import { Smartphone, Globe, Zap, Tv, ChevronLeft, CheckCircle2 } from "lucide-react";
import Modal from "./Modal";
import { transactionsApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const NETWORKS = [
	{ id: "mtn", name: "MTN", color: "bg-yellow-400" },
	{ id: "airtel", name: "Airtel", color: "bg-red-600" },
	{ id: "glo", name: "Glo", color: "bg-green-600" },
	{ id: "9mobile", name: "9mobile", color: "bg-green-900" },
];

const BillsModal = ({ onClose, onRefresh }) => {
	const [step, setStep] = useState("menu");
	const [network, setNetwork] = useState("");
	const [phone, setPhone] = useState("");
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user, refreshUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (parseFloat(amount) > user.balance) return setError("Insufficient balance.");

		setLoading(true);
		setError("");

		try {
			await transactionsApi.create({
				amount: parseFloat(amount),
				type: "debit",
				category: "Bills",
				description: `${step === 'airtime' ? 'Airtime' : 'Data'} Purchase - ${network.toUpperCase()} (${phone})`,
			}, { "X-Idempotency-Key": crypto.randomUUID() });

			await refreshUser();
			if (onRefresh) onRefresh();
			onClose();
		} catch (err) {
			setError(err.response?.data?.message || "Transaction failed");
		} finally {
			setLoading(false);
		}
	};

	if (step === "menu") {
		return (
			<Modal title="Bills & Utilities" onClose={onClose}>
				<div className="grid grid-cols-2 gap-4 pb-4">
					<button onClick={() => setStep("airtime")} className="group p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#E4570A] transition-all flex flex-col items-center">
						<div className="bg-white p-4 rounded-2xl shadow-sm mb-4 group-hover:bg-[#E4570A] group-hover:text-white transition-colors">
							<Smartphone size={28} />
						</div>
						<span className="text-xs font-black uppercase tracking-widest text-slate-800">Airtime</span>
					</button>
					
					<button onClick={() => setStep("data")} className="group p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#E4570A] transition-all flex flex-col items-center">
						<div className="bg-white p-4 rounded-2xl shadow-sm mb-4 group-hover:bg-[#E4570A] group-hover:text-white transition-colors">
							<Globe size={28} />
						</div>
						<span className="text-xs font-black uppercase tracking-widest text-slate-800">Data</span>
					</button>

					<div className="col-span-2 p-6 bg-slate-100 rounded-[2rem] border border-slate-200/50 opacity-40 flex items-center justify-between px-8">
						<div className="flex items-center space-x-4">
							<Zap size={20} className="text-slate-400" />
							<span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Electricity & TV</span>
						</div>
						<span className="text-[8px] font-black uppercase bg-white px-2 py-1 rounded-full text-slate-400">Coming Soon</span>
					</div>
				</div>
			</Modal>
		);
	}

	return (
		<Modal 
			title={`Buy ${step.toUpperCase()}`} 
			onClose={() => setStep("menu")}
			icon={<ChevronLeft size={20} />}
		>
			<form onSubmit={handleSubmit} className="space-y-6 pb-4">
				{error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-wider">{error}</div>}
				
				<div>
					<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Select Provider</label>
					<div className="grid grid-cols-4 gap-3">
						{NETWORKS.map((n) => (
							<button
								key={n.id}
								type="button"
								onClick={() => setNetwork(n.id)}
								className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
									network === n.id ? 'border-[#E4570A] bg-[#E4570A]/5 shadow-sm' : 'border-slate-50 bg-slate-50'
								}`}
							>
								<div className={`h-8 w-8 ${n.color} rounded-full mb-2 shadow-sm`}></div>
								<span className="text-[8px] font-black uppercase text-slate-600">{n.name}</span>
							</button>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Recipient Phone</label>
						<input
							type="tel"
							className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-sm font-bold"
							placeholder="0801 000 0000"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Amount (₦)</label>
						<input
							type="number"
							className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-[#E4570A] outline-none text-xl font-black"
							placeholder="0"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading || !network}
					className="w-full py-4 bg-[#E4570A] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#E4570A]/20 disabled:opacity-50 flex items-center justify-center space-x-2"
				>
					{loading ? "Processing..." : <><span>Purchase {step}</span> <CheckCircle2 size={14} /></>}
				</button>
			</form>
		</Modal>
	);
};

export default BillsModal;
