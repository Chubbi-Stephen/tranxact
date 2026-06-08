import { useState, useEffect } from "react";
import { Phone, ArrowRight, CheckCircle2, ChevronRight, Zap, Database, Smartphone } from "lucide-react";
import Modal from "./Modal";
import PinModal from "./PinModal";
import SetPinModal from "./SetPinModal";
import { billsApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const CARRIERS = [
	{ name: "MTN", color: "bg-yellow-400", prefixes: ["0803", "0806", "0703", "0706", "0813", "0816", "0903", "0906", "0810", "0814"] },
	{ name: "Airtel", color: "bg-red-500", prefixes: ["0802", "0808", "0701", "0708", "0812", "0902", "0901", "0907"] },
	{ name: "Glo", color: "bg-green-600", prefixes: ["0805", "0807", "0705", "0815", "0811", "0905"] },
	{ name: "9mobile", color: "bg-emerald-800", prefixes: ["0809", "0817", "0818", "0909", "0908"] },
];

const DATA_PLANS = [
	{ id: 1, label: "1.5GB", price: 1000, duration: "30 Days" },
	{ id: 2, label: "2GB", price: 1200, duration: "30 Days" },
	{ id: 3, label: "3GB", price: 1500, duration: "30 Days" },
	{ id: 4, label: "5GB", price: 2500, duration: "30 Days" },
	{ id: 5, label: "10GB", price: 4000, duration: "30 Days" },
	{ id: 6, label: "20GB", price: 6000, duration: "30 Days" },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

const AirtimeModal = ({ onClose, onRefresh }) => {
	const { user, refreshUser } = useAuth();
	const [type, setType] = useState("airtime"); // airtime or data
	const [step, setStep] = useState(1); // 1: Form, 2: PIN, 3: Success
	const [loading, setLoading] = useState(false);
	
	const [formData, setFormData] = useState({
		phone: user?.phone?.replace("+234", "0") || "",
		amount: "",
		planId: null,
		carrier: null
	});

	// Auto-detect carrier
	useEffect(() => {
		if (formData.phone.length >= 4) {
			const prefix = formData.phone.slice(0, 4);
			const carrier = CARRIERS.find(c => c.prefixes.includes(prefix));
			setFormData(prev => ({ ...prev, carrier: carrier || null }));
		} else {
			setFormData(prev => ({ ...prev, carrier: null }));
		}
	}, [formData.phone]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const finalAmount = type === "airtime" ? parseFloat(formData.amount) : DATA_PLANS.find(p => p.id === formData.planId)?.price;
		
		if (!finalAmount || finalAmount <= 0) return toast.error("Please select an amount");
		if (finalAmount > user?.balance) return toast.error("Insufficient balance");
		
		if (!user?.isPinSet) {
			setStep(4); // 4: Set PIN
		} else {
			setStep(2);
		}
	};

	const handlePinSuccess = async (pin) => {
		setLoading(true);
		const finalAmount = type === "airtime" ? parseFloat(formData.amount) : DATA_PLANS.find(p => p.id === formData.planId)?.price;
		const description = type === "airtime" 
			? `Airtime Recharge (${formData.carrier?.name || 'Mobile'}) - ${formData.phone}`
			: `Data Subscription (${DATA_PLANS.find(p => p.id === formData.planId)?.label}) - ${formData.phone}`;

		try {
			if (type === "airtime") {
				await billsApi.buyAirtime({
					phone: formData.phone,
					amount: finalAmount,
					carrier: formData.carrier?.name || "Mobile",
					pin
				});
			} else {
				const plan = DATA_PLANS.find(p => p.id === formData.planId);
				await billsApi.buyData({
					phone: formData.phone,
					plan: plan.label,
					amount: finalAmount,
					pin
				});
			}
			
			await refreshUser();
			setStep(3);
			if (onRefresh) onRefresh();
		} catch (err) {
			toast.error(err.response?.data?.message || "Transaction failed");
			setStep(1);
		} finally {
			setLoading(false);
		}
	};

	if (step === 3) {
		return (
			<Modal onClose={onClose}>
				<div className="p-10 text-center animate-in zoom-in-95 duration-300">
					<div className="w-20 h-20 bg-green-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-green-500 shadow-inner">
						<CheckCircle2 size={40} />
					</div>
					<h3 className="text-3xl font-black text-slate-900 mb-2">Success!</h3>
					<p className="text-sm font-medium text-slate-400 mb-10">
						Your {type} purchase for {formData.phone} was successful.
					</p>
					<button
						onClick={onClose}
						className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em]"
					>
						Done
					</button>
				</div>
			</Modal>
		);
	}

	if (step === 4) {
		return (
			<SetPinModal 
				onClose={() => setStep(1)} 
				onSuccess={() => setStep(2)}
			/>
		);
	}

	if (step === 2) {
		const amount = type === "airtime" ? formData.amount : DATA_PLANS.find(p => p.id === formData.planId)?.price;
		return (
			<PinModal 
				onClose={() => setStep(1)} 
				onSuccess={handlePinSuccess}
				title={`Confirm ${type.toUpperCase()}`}
				amount={amount}
			/>
		);
	}

	return (
		<Modal title="Buy Airtime & Data" onClose={onClose}>
			<div className="p-6 space-y-8">
				{/* Type Switcher */}
				<div className="flex bg-slate-100 p-1.5 rounded-[1.2rem] border border-slate-200">
					<button
						onClick={() => setType("airtime")}
						className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${type === "airtime" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
					>
						Airtime
					</button>
					<button
						onClick={() => setType("data")}
						className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${type === "data" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
					>
						Data Bundle
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Phone Input with Carrier Detection */}
					<div className="bg-slate-50 p-5 rounded-[1.8rem] border border-slate-100 shadow-inner relative">
						<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Phone Number</label>
						<div className="flex items-center">
							<input
								type="tel"
								maxLength={11}
								className="flex-1 bg-transparent font-black tracking-widest text-xl outline-none text-slate-900 placeholder:text-slate-200"
								placeholder="0803 000 0000"
								value={formData.phone}
								onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
								required
							/>
							{formData.carrier && (
								<div className={`px-3 py-1.5 rounded-lg text-white text-[9px] font-black uppercase tracking-tighter animate-in fade-in zoom-in-95 ${formData.carrier.color}`}>
									{formData.carrier.name}
								</div>
							)}
						</div>
					</div>

					{type === "airtime" ? (
						<div className="space-y-6">
							{/* Quick Amounts */}
							<div className="grid grid-cols-3 gap-3">
								{QUICK_AMOUNTS.map(amt => (
									<button
										key={amt}
										type="button"
										onClick={() => setFormData({ ...formData, amount: amt.toString() })}
										className={`py-4 rounded-2xl border-2 transition-all font-black text-sm ${formData.amount === amt.toString() ? "border-[#E4570A] bg-orange-50 text-[#E4570A]" : "border-slate-50 bg-white text-slate-600 hover:border-slate-200"}`}
									>
										₦{amt}
									</button>
								))}
							</div>

							<div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner text-center">
								<label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">Custom Amount</label>
								<div className="flex items-center justify-center space-x-2">
									<span className="text-2xl font-bold text-slate-300">₦</span>
									<input
										type="number"
										className="bg-transparent text-4xl font-black text-slate-900 outline-none w-48 text-center"
										placeholder="0"
										value={formData.amount}
										onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
										required={type === "airtime"}
									/>
								</div>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
							{DATA_PLANS.map(plan => (
								<button
									key={plan.id}
									type="button"
									onClick={() => setFormData({ ...formData, planId: plan.id })}
									className={`flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all ${formData.planId === plan.id ? "border-[#E4570A] bg-orange-50" : "border-slate-50 bg-white"}`}
								>
									<div className="flex items-center space-x-4 text-left">
										<div className={`p-3 rounded-xl ${formData.planId === plan.id ? "bg-[#E4570A] text-white" : "bg-slate-50 text-slate-400"}`}>
											<Database size={20} />
										</div>
										<div>
											<p className="font-black text-sm text-slate-900">{plan.label}</p>
											<p className="text-[10px] font-bold text-slate-400">{plan.duration}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-black text-sm text-slate-900 tracking-tight">₦{plan.price.toLocaleString()}</p>
									</div>
								</button>
							))}
						</div>
					)}

					<button
						type="submit"
						disabled={!formData.phone || (type === 'airtime' ? !formData.amount : !formData.planId)}
						className="w-full py-5 bg-[#E4570A] text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:translate-y-[-2px] transition-all disabled:opacity-30 disabled:translate-y-0 flex items-center justify-center space-x-3"
					>
						<span>Purchase {type}</span>
						<Zap size={16} />
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default AirtimeModal;
