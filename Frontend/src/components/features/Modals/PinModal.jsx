import { useState, useEffect } from "react";
import { Lock, X, Delete } from "lucide-react";

const PinModal = ({ title, onClose, onComplete, loading }) => {
	const [pin, setPin] = useState("");
	
	const handleNumberClick = (num) => {
		if (pin.length < 4) {
			setPin(prev => prev + num);
		}
	};

	const handleDelete = () => {
		setPin(prev => prev.slice(0, -1));
	};

	useEffect(() => {
		if (pin.length === 4) {
			onComplete(pin);
		}
	}, [pin, onComplete]);

	return (
		<div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-[360px] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
				<div className="p-8 text-center">
					<div className="flex justify-between items-center mb-8">
						<div className="w-10 h-10"></div>
						<div className="bg-slate-50 p-3 rounded-2xl text-slate-400">
							<Lock size={24} />
						</div>
						<button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-300">
							<X size={24} />
						</button>
					</div>

					<h3 className="text-xl font-black text-slate-900 mb-2">{title || "Enter Transaction PIN"}</h3>
					<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Confirm authorization</p>

					<div className="flex justify-center space-x-4 mb-12">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className={`h-4 w-4 rounded-full transition-all duration-200 ${
									pin.length >= i ? "bg-[#E4570A] scale-125" : "bg-slate-100"
								}`}
							></div>
						))}
					</div>

					<div className="grid grid-cols-3 gap-y-6 gap-x-4 max-w-[280px] mx-auto pb-4">
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
							<button
								key={n}
								type="button"
								onClick={() => handleNumberClick(n)}
								disabled={loading}
								className="h-16 w-16 mx-auto rounded-full text-2xl font-black text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-center"
							>
								{n}
							</button>
						))}
						<div className="h-16 w-16"></div>
						<button
							type="button"
							onClick={() => handleNumberClick(0)}
							disabled={loading}
							className="h-16 w-16 mx-auto rounded-full text-2xl font-black text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-center"
						>
							0
						</button>
						<button
							type="button"
							onClick={handleDelete}
							disabled={loading}
							className="h-16 w-16 mx-auto rounded-full text-slate-400 hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-center"
						>
							<Delete size={24} />
						</button>
					</div>
				</div>
				
				{loading && (
					<div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
						<div className="h-8 w-8 border-4 border-[#E4570A] border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PinModal;
