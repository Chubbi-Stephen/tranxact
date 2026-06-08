import { useState } from "react";
import { ShieldCheck, CreditCard, ArrowRight, Building2, X } from "lucide-react";
import Modal from "./Modal";
import { transactionsApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const FundWalletModal = ({ onClose, onRefresh }) => {
	const [amount, setAmount] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [showPaystack, setShowPaystack] = useState(false);
	const { refreshUser } = useAuth();

	const handleInitiate = (e) => {
		e.preventDefault();
		if (parseFloat(amount) < 100) return alert("Minimum fund amount is ₦100");
		setShowPaystack(true);
	};

	const handleSuccess = async () => {
		setIsProcessing(true);
		try {
			await transactionsApi.create({
				amount: parseFloat(amount),
				type: "credit",
				category: "Income",
				description: `Wallet Funding via Card/Bank`,
			}, { "X-Idempotency-Key": crypto.randomUUID() });

			await refreshUser();
			if (onRefresh) onRefresh();
			onClose();
		} catch (err) {
			alert("Funding failed. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<>
			{!showPaystack ? (
				<Modal title="Fund Wallet" onClose={onClose}>
					<form onSubmit={handleInitiate} className="pb-4">
						<div className="mb-8">
							<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">Enter Funding Amount</label>
							<div className="flex items-center justify-center space-x-2">
								<span className="text-2xl font-black text-slate-300">₦</span>
								<input
									type="number"
									className="w-full max-w-[200px] bg-transparent outline-none text-4xl font-black text-slate-900 text-center"
									placeholder="0.00"
									autoFocus
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									required
								/>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3 mb-8">
							{[1000, 5000, 10000].map(val => (
								<button 
									key={val} 
									type="button"
									onClick={() => setAmount(val.toString())}
									className="py-3 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 hover:bg-[#E4570A]/5 hover:text-[#E4570A] transition-all border border-slate-100"
								>
									+₦{val.toLocaleString()}
								</button>
							))}
						</div>

						<button
							type="submit"
							className="w-full py-4 bg-[#09a5db] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#09a5db]/20 flex items-center justify-center space-x-3 transition-transform hover:translate-y-[-2px]"
						>
							<span>Secure Checkout</span>
							<ArrowRight size={14} />
						</button>
					</form>
				</Modal>
			) : (
				<div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
					<div className="bg-white w-full max-w-[380px] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
						<div className="bg-[#f2f4f7] p-6 border-b flex justify-between items-center">
							<div className="flex items-center space-x-2 text-[#09a5db]">
								<ShieldCheck size={20} strokeWidth={3} />
								<span className="font-black text-[10px] uppercase tracking-[0.2em]">Paystack Checkout</span>
							</div>
							<button onClick={() => setShowPaystack(false)} className="bg-white p-2 rounded-full text-slate-400 hover:text-slate-900">
								<X size={16} />
							</button>
						</div>

						<div className="p-10 text-center">
							<p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Payable</p>
							<p className="text-4xl font-black text-slate-900 mb-10 tracking-tight">₦{parseFloat(amount).toLocaleString()}</p>
							
							<div className="space-y-4">
								<button 
									onClick={handleSuccess}
									disabled={isProcessing}
									className="w-full py-4 bg-[#3bb75e] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center space-x-3 shadow-lg shadow-[#3bb75e]/20"
								>
									<CreditCard size={16} />
									<span>{isProcessing ? "Processing..." : "Pay with Card"}</span>
								</button>
								<button className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center space-x-3 border border-slate-100">
									<Building2 size={16} />
									<span>Bank Transfer</span>
								</button>
							</div>
							
							<p className="mt-10 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
								Secured by <span className="text-[#09a5db]">Paystack</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FundWalletModal;
