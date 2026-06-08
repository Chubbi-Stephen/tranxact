import { useState } from "react";
import { Eye, EyeOff, Plus, ArrowUpRight } from "lucide-react";
import AddMoneyModal from "../Modals/AddMoneyModal";
import WithdrawModal from "../Modals/WithdrawModal";
import { useAuth } from "../../../hooks/useAuth";

const BalanceCard = ({ onRefresh }) => {
	const [activeModal, setActiveModal] = useState(null);
	const [showBalance, setShowBalance] = useState(true);
	const { user } = useAuth();

	const closeModal = () => setActiveModal(null);

	const formattedBalance = user?.balance?.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}) || "0.00";

	return (
		<>
			<div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
				<div className="relative z-10">
					<div className="flex justify-between items-center mb-6">
						<span className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Primary Wallet</span>
						<button
							onClick={() => setShowBalance(!showBalance)}
							className="text-slate-400 hover:text-[#E4570A] transition-colors p-2 bg-slate-50 rounded-full"
						>
							{showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					</div>
					
					<div className="flex items-baseline space-x-2">
						<span className="text-xl font-bold text-slate-400">₦</span>
						<h2 className="text-4xl font-black text-slate-900 tracking-tight">
							{showBalance ? formattedBalance : "••••••"}
						</h2>
					</div>
					
					<div className="mt-8 flex space-x-3">
						<button 
							className="flex-1 bg-[#013653] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 hover:bg-[#012a41] transition-colors shadow-lg shadow-[#013653]/20"
							onClick={() => setActiveModal("add")}
						>
							<Plus size={16} />
							<span>Fund Wallet</span>
						</button>
						<button 
							className="flex-1 bg-[#E4570A] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 hover:bg-[#cf4f09] transition-colors shadow-lg shadow-[#E4570A]/20"
							onClick={() => setActiveModal("withdraw")}
						>
							<ArrowUpRight size={16} />
							<span>Withdraw</span>
						</button>
					</div>
				</div>
				
				<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E4570A]/5 rounded-full blur-2xl"></div>
			</div>

			{activeModal === "add" && <AddMoneyModal onClose={closeModal} onRefresh={onRefresh} />}
			{activeModal === "withdraw" && <WithdrawModal onClose={closeModal} onRefresh={onRefresh} />}
		</>
	);
};

export default BalanceCard;
