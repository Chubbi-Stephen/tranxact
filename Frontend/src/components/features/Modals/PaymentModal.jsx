import { useState } from "react";
import Modal from "./Modal";

const PaymentModal = ({ onClose }) => {
	const [activeTab, setActiveTab] = useState("bills");

	const billCategories = [
		{ id: "utilities", name: "Utilities", icon: "💡" },
		{ id: "internet", name: "Internet", icon: "🌐" },
		{ id: "cable", name: "Cable TV", icon: "📺" },
		{ id: "phone", name: "Phone", icon: "📱" },
		{ id: "taxes", name: "Taxes", icon: "📝" },
		{ id: "insurance", name: "Insurance", icon: "🛡️" },
	];

	const merchantCategories = [
		{ id: "grocery", name: "Grocery", icon: "🛒" },
		{ id: "restaurant", name: "Restaurant", icon: "🍽️" },
		{ id: "retail", name: "Retail", icon: "👕" },
		{ id: "entertainment", name: "Entertainment", icon: "🎬" },
		{ id: "travel", name: "Travel", icon: "✈️" },
		{ id: "others", name: "Others", icon: "🔍" },
	];

	return (
		<Modal title="Make a Payment" onClose={onClose}>
			<div className="flex border-b border-slate-200 mb-4">
				<button
					className={`pb-2 px-4 ${
						activeTab === "bills"
							? "border-b-2 border-[#E4570A] text-[#E4570A]"
							: "text-slate-500"
					}`}
					onClick={() => setActiveTab("bills")}
				>
					Pay Bills
				</button>
				<button
					className={`pb-2 px-4 ${
						activeTab === "merchants"
							? "border-b-2 border-[#E4570A] text-[#E4570A]"
							: "text-slate-500"
					}`}
					onClick={() => setActiveTab("merchants")}
				>
					Pay Merchants
				</button>
			</div>

			{activeTab === "bills" && (
				<div>
					<p className="text-slate-500 mb-4">Select a bill category:</p>
					<div className="grid grid-cols-3 gap-3">
						{billCategories.map((category) => (
							<button
								key={category.id}
								className="flex flex-col items-center bg-[#E5E3DC] p-4 rounded border border-slate-200 hover:bg-slate-100"
								onClick={() => console.log(`Selected ${category.name}`)}
							>
								<span className="text-2xl mb-2">{category.icon}</span>
								<span className="text-sm text-slate-700">{category.name}</span>
							</button>
						))}
					</div>
					<div className="mt-6">
						<p className="text-slate-500 mb-2">Recent Bills:</p>
						<div className="space-y-2">
							<div className="flex justify-between items-center p-3 bg-slate-50 rounded">
								<div>
									<p className="font-medium">Electricity</p>
									<p className="text-xs text-slate-500">
										Last paid: Mar 10, 2025
									</p>
								</div>
								<button className="bg-[#E4570A] text-white px-4 py-1 rounded-full text-sm">
									Pay Now
								</button>
							</div>
							<div className="flex justify-between items-center p-3 bg-slate-50 rounded">
								<div>
									<p className="font-medium">Water</p>
									<p className="text-xs text-slate-500">
										Last paid: Feb 15, 2025
									</p>
								</div>
								<button className="bg-[#E4570A] text-white px-4 py-1 rounded-full text-sm">
									Pay Now
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{activeTab === "merchants" && (
				<div>
					<p className="text-slate-500 mb-4">Select a merchant category:</p>
					<div className="grid grid-cols-3 gap-3">
						{merchantCategories.map((category) => (
							<button
								key={category.id}
								className="flex flex-col items-center bg-[#E5E3DC] p-4 rounded border border-slate-200 hover:bg-slate-100"
								onClick={() => console.log(`Selected ${category.name}`)}
							>
								<span className="text-2xl mb-2">{category.icon}</span>
								<span className="text-sm text-slate-700">{category.name}</span>
							</button>
						))}
					</div>
					<div className="mt-6">
						<p className="text-slate-500 mb-2">Recent Merchants:</p>
						<div className="space-y-2">
							<div className="flex justify-between items-center p-3 bg-slate-50 rounded">
								<div>
									<p className="font-medium">Grocery Store</p>
									<p className="text-xs text-slate-500">
										Last paid: Mar 14, 2025
									</p>
								</div>
								<button className="bg-[#E4570A] text-white px-4 py-1 rounded-full text-sm">
									Pay Now
								</button>
							</div>
							<div className="flex justify-between items-center p-3 bg-slate-50 rounded">
								<div>
									<p className="font-medium">Coffee Shop</p>
									<p className="text-xs text-slate-500">
										Last paid: Mar 19, 2025
									</p>
								</div>
								<button className="bg-[#E4570A] text-white px-4 py-1 rounded-full text-sm">
									Pay Now
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default PaymentModal;
