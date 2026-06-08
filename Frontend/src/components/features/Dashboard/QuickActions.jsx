import { useState } from "react";
import { Send, Download, Plus, CreditCard } from "lucide-react";
import SendMoneyModal from "../Modals/SendMoneyModal";
import ReceiveMoneyModal from "../Modals/RecieveMoneyModal";
import AddMoneyModal from "../Modals/AddMoneyModal";
import FundWalletModal from "../Modals/FundWalletModal";
import BillsModal from "../Modals/BillsModal";

const QuickActions = ({ onRefresh }) => {
	const [activeModal, setActiveModal] = useState(null);

	const ActionButton = ({ icon: Icon, label, onClick, colorClass = "bg-white text-[#E4570A]" }) => (
		<button className="flex flex-col items-center group" onClick={onClick}>
			<div className={`${colorClass} h-14 w-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md transition-all group-hover:translate-y-[-2px] border border-slate-100`}>
				<Icon size={20} strokeWidth={2.5} />
			</div>
			<span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
		</button>
	);

	return (
		<>
			<div className="bg-[#F8F9FA] p-6 rounded-2xl border border-slate-100 shadow-sm">
				<h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">Quick Actions</h3>
				<div className="flex justify-between items-center px-2">
					<ActionButton 
						icon={Send} 
						label="Send" 
						onClick={() => setActiveModal("send")}
					/>
					<ActionButton 
						icon={Download} 
						label="Receive" 
						onClick={() => setActiveModal("receive")}
					/>
					<ActionButton 
						icon={Plus} 
						label="Add" 
						onClick={() => setActiveModal("add")}
					/>
					<ActionButton 
						icon={CreditCard} 
						label="Pay" 
						onClick={() => setActiveModal("pay")}
					/>
				</div>
			</div>

			{activeModal === "send" && (
				<SendMoneyModal onClose={() => setActiveModal(null)} onRefresh={onRefresh} />
			)}
			{activeModal === "add" && (
				<FundWalletModal onClose={() => setActiveModal(null)} onRefresh={onRefresh} />
			)}
			{activeModal === "pay" && (
				<BillsModal onClose={() => setActiveModal(null)} onRefresh={onRefresh} />
			)}
			{activeModal === "receive" && (
				<ReceiveMoneyModal onClose={() => setActiveModal(null)} />
			)}
		</>
	);
};

export default QuickActions;
