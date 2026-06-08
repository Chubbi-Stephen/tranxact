import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import Modal from "./Modal";
import { pinApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const SetPinModal = ({ onClose, onSuccess }) => {
	const [pin, setPin] = useState("");
	const [confirmPin, setConfirmPin] = useState("");
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { refreshUser } = useAuth();

	const handleComplete = async (value) => {
		if (step === 1) {
			setPin(value);
			setStep(2);
		} else {
			if (value !== pin) {
				setError("PINs do not match. Try again.");
				setPin("");
				setStep(1);
				return;
			}
			
			setLoading(true);
			try {
				await pinApi.set(value);
				await refreshUser();
				onSuccess();
			} catch (err) {
				setError("Failed to set PIN. Please try again.");
				setPin("");
				setStep(1);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-[360px] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
				<div className="p-8 text-center">
					<div className="flex justify-between items-center mb-8">
						<div className="w-10 h-10"></div>
						<div className="bg-green-50 p-3 rounded-2xl text-[#3bb75e]">
							<ShieldCheck size={24} />
						</div>
						<button onClick={onClose} className="p-2 text-slate-300">
							<X size={24} />
						</button>
					</div>

					<h3 className="text-xl font-black text-slate-900 mb-2">
						{step === 1 ? "Create Transaction PIN" : "Confirm Your PIN"}
					</h3>
					<p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 px-4 leading-relaxed">
						{step === 1 
							? "Set a 4-digit PIN to secure your transfers and payments." 
							: "Please enter the same 4 digits again to confirm."}
					</p>

					{error && <p className="text-red-500 text-[10px] font-bold uppercase mb-4">{error}</p>}

					<div className="flex justify-center space-x-4 mb-12">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className={`h-4 w-4 rounded-full bg-slate-100 transition-all shadow-inner`}></div>
						))}
					</div>

					<PinPad onComplete={handleComplete} loading={loading} />
				</div>
			</div>
		</div>
	);
};

// Internal mini-component for the numbers
const PinPad = ({ onComplete, loading }) => {
	const [input, setInput] = useState("");

	const handleClick = (n) => {
		if (input.length < 4) {
			const newInput = input + n;
			setInput(newInput);
			if (newInput.length === 4) {
				onComplete(newInput);
				setInput(""); // Reset for next step
			}
		}
	};

	return (
		<div className="grid grid-cols-3 gap-4 max-w-[240px] mx-auto pb-4">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "delete"].map((n, i) => {
				if (n === "") return <div key={i}></div>;
				if (n === "delete") return (
					<button key={i} onClick={() => setInput(input.slice(0, -1))} className="h-14 w-14 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-colors">
						✕
					</button>
				);
				return (
					<button 
						key={i} 
						onClick={() => handleClick(n)}
						disabled={loading}
						className="h-14 w-14 mx-auto rounded-2xl text-xl font-black text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-all flex items-center justify-center border border-transparent active:border-slate-100"
					>
						{n}
					</button>
				);
			})}
		</div>
	);
};

export default SetPinModal;
