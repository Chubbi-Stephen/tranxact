import { useState } from "react";
import { ShieldCheck, ArrowRight, ShieldAlert, BadgeCheck, Loader2 } from "lucide-react";
import Modal from "./Modal";
import { authApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const KycModal = ({ onClose, onSuccess }) => {
	const [bvn, setBvn] = useState("");
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1); // 1: Info, 2: Input
	const { refreshUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (bvn.length !== 11) return toast.error("BVN must be 11 digits");

		setLoading(true);
		try {
			await authApi.upgradeKyc({ bvn });
			await refreshUser();
			toast.success("Identity Verified Successfully!");
			if (onSuccess) onSuccess();
			onClose();
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to verify BVN");
		} finally {
			setLoading(false);
		}
	};

	if (step === 1) {
		return (
			<Modal title="Account Verification" onClose={onClose}>
				<div className="p-6 text-center">
					<div className="bg-[#effaf2] w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#3bb75e] shadow-inner shadow-[#3bb75e]/10">
						<ShieldCheck size={40} />
					</div>
					
					<h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Upgrade to Tier 2</h3>
					<p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed px-4">
						Link your <span className="text-slate-900 font-bold">Bank Verification Number (BVN)</span> to increase your single transaction limit to <span className="text-slate-900 font-bold tracking-tight">₦500,000</span>.
					</p>

					<div className="space-y-4 mb-10 text-left">
						<div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
							<div className="bg-white p-2 rounded-lg shadow-sm text-[#E4570A]"><BadgeCheck size={18} /></div>
							<span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Locked Features at Tier 1</span>
						</div>
						<div className="space-y-3 px-4">
							<div className="flex items-center space-x-3 text-slate-400">
								<ShieldAlert size={14} />
								<span className="text-[11px] font-bold">Max Transfer: ₦50,000</span>
							</div>
							<div className="flex items-center space-x-3 text-slate-400">
								<ShieldAlert size={14} />
								<span className="text-[11px] font-bold">Daily Limit: ₦100,000</span>
							</div>
						</div>
					</div>

					<button
						onClick={() => setStep(2)}
						className="w-full py-5 bg-[#E4570A] text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#E4570A]/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform"
					>
						<span>Continue to Verify</span>
						<ArrowRight size={16} />
					</button>
				</div>
			</Modal>
		);
	}

	return (
		<Modal title="Verify BVN" onClose={onClose}>
			<form onSubmit={handleSubmit} className="p-6 space-y-10">
				<div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100/50">
					<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-4">Bank Verification Number</label>
					<input
						type="text"
						inputMode="numeric"
						maxLength={11}
						placeholder="222 333 444 55"
						className="w-full bg-transparent text-2xl font-black tracking-[0.2em] text-slate-900 placeholder:text-slate-200 outline-none text-center"
						value={bvn}
						onChange={(e) => setBvn(e.target.value.replace(/\D/g, ""))}
						autoFocus
						required
					/>
				</div>

				<div className="bg-blue-50 p-5 rounded-2xl flex items-start space-x-4 border border-blue-100">
					<div className="mt-1"><ShieldCheck size={18} className="text-blue-500" /></div>
					<p className="text-[11px] font-bold text-blue-600/80 leading-relaxed">
						We use BVN to verify your identity. Your BVN does not give us access to your bank accounts.
					</p>
				</div>

				<button
					type="submit"
					disabled={loading || bvn.length !== 11}
					className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl disabled:opacity-50 flex items-center justify-center space-x-3"
				>
					{loading ? <Loader2 className="animate-spin" size={18} /> : <><span>Verify BVN</span> <BadgeCheck size={18} /></>}
				</button>
			</form>
		</Modal>
	);
};

export default KycModal;
