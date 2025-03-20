import { useState } from "react";
import TransactionItem from "./TransactionItem";

const TransactionHistory = ({ limit }) => {
	const [filter, setFilter] = useState("all");

	const transactions = [
		{
			id: 1,
			name: "Coffee Shop",
			date: "Mar 19, 2025",
			time: "10:23 AM",
			amount: -4.5,
			status: "Completed",
			type: "outgoing",
		},
		{
			id: 2,
			name: "Paycheck",
			date: "Mar 15, 2025",
			time: "9:00 AM",
			amount: 1250.0,
			status: "Completed",
			type: "incoming",
		},
		{
			id: 3,
			name: "Grocery Store",
			date: "Mar 14, 2025",
			time: "4:17 PM",
			amount: -87.32,
			status: "Completed",
			type: "outgoing",
		},
		{
			id: 4,
			name: "Electricity Bill",
			date: "Mar 10, 2025",
			time: "11:45 AM",
			amount: -124.5,
			status: "Completed",
			type: "outgoing",
		},
	];

	const filteredTransactions = transactions.filter((t) => {
		if (filter === "all") return true;
		return t.type === filter;
	});

	const displayTransactions = limit
		? filteredTransactions.slice(0, limit)
		: filteredTransactions;

	return (
		<div className="bg-[#E5E3DC] p-6 rounded-lg border border-slate-200">
			<h3 className="text-slate-500 font-medium">Recent Transactions</h3>
			<div className="flex gap-4 mt-4">
				<button
					className={`px-6 py-2 rounded-full text-sm ${
						filter === "all"
							? "bg-slate-100 text-slate-900"
							: "bg-white text-slate-500 border border-slate-200"
					}`}
					onClick={() => setFilter("all")}
				>
					All
				</button>
				<button
					className={`px-6 py-2 rounded-full text-sm ${
						filter === "incoming"
							? "bg-slate-100 text-slate-900"
							: "bg-white text-slate-500 border border-slate-200"
					}`}
					onClick={() => setFilter("incoming")}
				>
					Incoming
				</button>
				<button
					className={`px-6 py-2 rounded-full text-sm ${
						filter === "outgoing"
							? "bg-slate-100 text-slate-900"
							: "bg-white text-slate-500 border border-slate-200"
					}`}
					onClick={() => setFilter("outgoing")}
				>
					Outgoing
				</button>
			</div>
			<div className="mt-4">
				{displayTransactions.map((transaction) => (
					<TransactionItem key={transaction.id} transaction={transaction} />
				))}
			</div>
		</div>
	);
};

export default TransactionHistory;
