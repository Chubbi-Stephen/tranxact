const BalanceCard = () => {
	return (
		<div className="bg-white p-6 rounded-lg border border-slate-200">
			<h3 className="text-slate-500 font-medium">Total Balance</h3>
			<p className="text-3xl font-bold text-slate-900 mt-4">$12,480.55</p>
			<p className="text-green-500 text-sm mt-1">+$245.23 (1.9%) this month</p>
			<div className="flex gap-4 mt-6">
				<button className="bg-purple-700 text-white px-6 py-2 rounded-full text-sm">
					Add Money
				</button>
				<button className="border border-purple-700 text-purple-700 px-6 py-2 rounded-full text-sm">
					Withdraw
				</button>
			</div>
		</div>
	);
};

export default BalanceCard;
