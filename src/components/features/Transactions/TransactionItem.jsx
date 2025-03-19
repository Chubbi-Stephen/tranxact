const TransactionItem = ({ transaction }) => {
	const { name, date, time, amount, status, type } = transaction;

	return (
		<div className="border-b border-slate-100 py-4">
			<div className="flex items-center">
				<div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mr-4">
					<span>{type === "incoming" ? "↓" : "↑"}</span>
				</div>
				<div className="flex-1">
					<p className="font-medium text-slate-900">{name}</p>
					<p className="text-sm text-slate-500">
						{date} • {time}
					</p>
				</div>
				<div className="text-right">
					<p
						className={`font-medium ${
							amount > 0 ? "text-green-500" : "text-red-500"
						}`}
					>
						{amount > 0 ? "+" : ""}
						{amount.toFixed(2)}
					</p>
					<p className="text-sm text-slate-500">{status}</p>
				</div>
			</div>
		</div>
	);
};

export default TransactionItem;
