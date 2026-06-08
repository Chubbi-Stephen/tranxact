import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, FileText, CheckCircle2 } from "lucide-react";

const TransactionItem = ({ transaction }) => {
	const isCredit = transaction.type === "credit";
	const date = new Date(transaction.createdAt);
	const formattedDate = date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
	const formattedTime = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	const [showReceipt, setShowReceipt] = useState(false);

	return (
		<>
			<div 
				onClick={() => setShowReceipt(true)}
				className="flex justify-between items-center p-4 hover:bg-white hover:shadow-md hover:scale-[1.01] rounded-2xl transition-all cursor-pointer group"
			>
				<div className="flex items-center space-x-4">
					<div
						className={`h-11 w-11 rounded-full flex items-center justify-center transition-colors ${
							isCredit ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
						}`}
					>
						{isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
					</div>
					<div>
						<p className="font-bold text-slate-900 group-hover:text-[#E4570A] transition-colors text-sm">
							{transaction.description || transaction.category}
						</p>
						<p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
							{formattedDate} • {formattedTime}
						</p>
					</div>
				</div>
				<div className="text-right">
					<p className={`font-bold text-sm ${isCredit ? "text-green-600" : "text-slate-900"}`}>
						{isCredit ? "+" : "-"}₦{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
					</p>
					<p className="text-[9px] uppercase tracking-[0.1em] text-slate-300 font-black mt-1">
						{transaction.status}
					</p>
				</div>
			</div>

			{showReceipt && (
				<div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
					<div className="bg-white w-full max-w-[360px] p-8 rounded-[2rem] relative animate-in zoom-in-95 duration-200">
						<button 
							onClick={() => setShowReceipt(false)}
							className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors"
						>✕</button>
						
						<div className="text-center mb-8 pt-4">
							<div className="h-16 w-16 bg-[#E4570A] text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-4 italic shadow-lg shadow-[#E4570A]/30">T</div>
							<h4 className="font-black text-slate-900 uppercase tracking-[0.2em] text-[10px]">Transaction Receipt</h4>
							<p className="text-[10px] text-slate-400 mt-1">Tranxact Fintech Nigeria</p>
						</div>

						<div className="space-y-4 border-t border-b border-dashed py-6 border-slate-100">
							<div className="flex justify-between text-sm">
								<span className="text-slate-400 font-medium">Amount</span>
								<span className="font-bold text-slate-900">₦{transaction.amount.toLocaleString()}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-slate-400 font-medium">Reference</span>
								<span className="font-mono text-[10px] text-slate-500 uppercase">{transaction.reference || 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-slate-400 font-medium">Date & Time</span>
								<span className="font-bold text-slate-900 text-[11px]">{formattedDate} {formattedTime}</span>
							</div>
						</div>

						<div className="mt-8 text-center bg-green-50 p-4 rounded-2xl">
							<p className="text-[#3bb75e] text-[10px] font-black uppercase tracking-[0.1em] flex items-center justify-center">
								<CheckCircle2 size={14} className="mr-2" /> 
								Payment Successful
							</p>
						</div>
						
						<button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
							<FileText size={14} />
							<span>Download PDF</span>
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default TransactionItem;
