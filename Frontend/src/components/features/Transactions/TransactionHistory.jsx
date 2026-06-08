import { useState, useEffect, useCallback } from "react";
import TransactionItem from "./TransactionItem";
import { transactionsApi } from "../../../services/api";

const TransactionHistory = ({ limit, refreshTrigger }) => {
	const [filter, setFilter] = useState("all");
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchTransactions = useCallback(async () => {
		try {
			setLoading(true);
			const params = {
				limit: limit || 50,
			};
			if (filter !== "all") {
				params.type = filter === "incoming" ? "credit" : "debit";
			}
			const { data } = await transactionsApi.getAll(params);
			setTransactions(data);
		} catch (error) {
			console.error("Failed to fetch transactions:", error);
		} finally {
			setLoading(false);
		}
	}, [limit, filter]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions, refreshTrigger]);

	return (
		<div className="bg-[#E5E3DC] p-6 rounded-lg border border-slate-200">
			<h3 className="text-slate-500 font-medium">Recent Transactions</h3>
			<div className="flex gap-2 mt-4 overflow-x-auto pb-2">
				<button
					className={`px-6 py-2 rounded-full text-sm whitespace-nowrap ${
						filter === "all"
							? "bg-slate-900 text-white"
							: "bg-white text-slate-500 border border-slate-200"
					}`}
					onClick={() => setFilter("all")}
				>
					All
				</button>
				<button
					className={`px-6 py-2 rounded-full text-sm whitespace-nowrap ${
						filter === "incoming"
							? "bg-slate-900 text-white"
							: "bg-white text-slate-500 border border-slate-200"
					}`}
					onClick={() => setFilter("incoming")}
				>
					Incoming
				</button>
				<button
					className={`px-6 py-2 rounded-full text-sm whitespace-nowrap ${
						filter === "outgoing"
							? "bg-slate-900 text-white"
							: "bg-white text-slate-500 border border-slate-200"
					}`}
					onClick={() => setFilter("outgoing")}
				>
					Outgoing
				</button>
			</div>
			<div className="mt-4 space-y-3">
				{loading ? (
					<div className="py-8 text-center text-slate-500">Loading transactions...</div>
				) : transactions.length > 0 ? (
					transactions.map((transaction) => (
						<TransactionItem key={transaction._id} transaction={transaction} />
					))
				) : (
					<div className="py-8 text-center text-slate-500">No transactions found.</div>
				)}
			</div>
		</div>
	);
};

export default TransactionHistory;
