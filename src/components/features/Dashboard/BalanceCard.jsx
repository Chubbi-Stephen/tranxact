import { useState } from "react";
import AddMoneyModal from "../Modals/AddMoneyModal";
import WithdrawModal from "../Modals/WithdrawModal";

const BalanceCard = () => {
	const [activeModal, setActiveModal] = useState(null);
	const [showBalance, setShowBalance] = useState(true);

	const closeModal = () => setActiveModal(null);

	return (
		<>
			<div className="bg-[#E5E3DC] p-6 rounded-lg border border-slate-200">
				<div className="flex justify-between items-center">
					<h3 className="text-slate-500 font-medium">Total Balance</h3>
					<button
						onClick={() => setShowBalance(!showBalance)}
						className="text-[#E4570A] text-sm"
					>
						{showBalance ? "Hide" : "Show"}
					</button>
				</div>
				<p className="text-3xl font-bold text-slate-900 mt-4">
					{showBalance ? "$12,480.55" : "********"}
				</p>
				<p className="text-green-600 text-sm mt-1">
					+$245.23 (1.9%) this month
				</p>
				<div className="flex gap-4 mt-6">
					<button
						className="bg-[#E4570A] text-white px-6 py-2 rounded-full text-sm"
						onClick={() => setActiveModal("add")}
					>
						Add Money
					</button>
					<button
						className="border border-[#E4570A] text-[#E4570A] px-6 py-2 rounded-full text-sm"
						onClick={() => setActiveModal("withdraw")}
					>
						Withdraw
					</button>
				</div>
			</div>

			{activeModal === "add" && <AddMoneyModal onClose={closeModal} />}
			{activeModal === "withdraw" && <WithdrawModal onClose={closeModal} />}
		</>
	);
};

export default BalanceCard;
