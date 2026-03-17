import { useState } from "react";
import TransactionItem from "../../components/features/Transactions/TransactionItem";

const TransactionsPage = () => {
	const [filter, setFilter] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [dateRange, setDateRange] = useState("last30");

	// Mock transaction data
	const transactions = [
		{
			id: 1,
			name: "Coffee Shop",
			date: "Mar 19, 2026",
			time: "10:23 AM",
			amount: -4.5,
			status: "Completed",
			type: "outgoing",
			category: "Food & Drink",
		},
		{
			id: 2,
			name: "Paycheck",
			date: "Mar 15, 2026",
			time: "9:00 AM",
			amount: 1250.0,
			status: "Completed",
			type: "incoming",
			category: "Income",
		},
		{
			id: 3,
			name: "Grocery Store",
			date: "Mar 14, 2026",
			time: "4:17 PM",
			amount: -87.32,
			status: "Completed",
			type: "outgoing",
			category: "Groceries",
		},
		{
			id: 4,
			name: "Electricity Bill",
			date: "Mar 10, 2026",
			time: "11:45 AM",
			amount: -124.5,
			status: "Completed",
			type: "outgoing",
			category: "Utilities",
		},
		{
			id: 5,
			name: "Restaurant",
			date: "Mar 8, 2026",
			time: "7:30 PM",
			amount: -56.2,
			status: "Completed",
			type: "outgoing",
			category: "Food & Drink",
		},
		{
			id: 6,
			name: "Digital Subscription",
			date: "Mar 5, 2026",
			time: "12:00 AM",
			amount: -9.99,
			status: "Completed",
			type: "outgoing",
			category: "Subscriptions",
		},
		{
			id: 7,
			name: "Friend Payment",
			date: "Mar 3, 2026",
			time: "6:15 PM",
			amount: 25.0,
			status: "Completed",
			type: "incoming",
			category: "Transfer",
		},
		{
			id: 8,
			name: "Internet Bill",
			date: "Mar 1, 2026",
			time: "9:30 AM",
			amount: -65.0,
			status: "Completed",
			type: "outgoing",
			category: "Utilities",
		},
	];

	// Apply filters
	const filteredTransactions = transactions.filter((t) => {
		const matchesType = filter === "all" || t.type === filter;
		const matchesSearch =
			searchTerm === "" ||
			t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			t.category.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesType && matchesSearch;
	});

	return (
		<div className="space-y-6">
			<div className="bg-[#E5E3DC] p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
				<p className="text-slate-600 mt-2">
					View and manage your transaction history
				</p>
			</div>

			<div className="bg-white rounded-lg border border-slate-200">
				<div className="p-6 border-b border-slate-200">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search transactions..."
								className="w-full p-3 border border-slate-300 rounded"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className="flex gap-4">
							<select
								className="p-3 border border-slate-300 rounded"
								value={dateRange}
								onChange={(e) => setDateRange(e.target.value)}
							>
								<option value="last7">Last 7 days</option>
								<option value="last30">Last 30 days</option>
								<option value="last90">Last 90 days</option>
								<option value="thisYear">This year</option>
								<option value="allTime">All time</option>
							</select>
							<button
								className="bg-slate-100 text-slate-700 px-4 py-2 rounded"
								onClick={() => alert("Export functionality coming soon!")}
							>
								Export
							</button>
						</div>
					</div>
				</div>

				<div className="p-6 bg-[#E5E3DC]">
					<div className="flex gap-4 mb-6 overflow-x-auto">
						<button
							className={`px-6 py-2 rounded-full text-sm whitespace-nowrap ${
								filter === "all"
									? "bg-slate-100 text-slate-900"
									: "bg-white text-slate-500 border border-slate-200"
							}`}
							onClick={() => setFilter("all")}
						>
							All Transactions
						</button>
						<button
							className={`px-6 py-2 rounded-full text-sm whitespace-nowrap ${
								filter === "incoming"
									? "bg-slate-100 text-slate-900"
									: "bg-white text-slate-500 border border-slate-200"
							}`}
							onClick={() => setFilter("incoming")}
						>
							Incoming
						</button>
						<button
							className={`px-6 py-2 rounded-full text-sm whitespace-nowrap ${
								filter === "outgoing"
									? "bg-slate-100 text-slate-900"
									: "bg-white text-slate-500 border border-slate-200"
							}`}
							onClick={() => setFilter("outgoing")}
						>
							Outgoing
						</button>
					</div>

					<div className="mt-2">
						{filteredTransactions.length > 0 ? (
							<>
								{filteredTransactions.map((transaction) => (
									<TransactionItem
										key={transaction.id}
										transaction={transaction}
									/>
								))}
							</>
						) : (
							<div className="text-center py-8">
								<p className="text-slate-500">No transactions found.</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionsPage;
