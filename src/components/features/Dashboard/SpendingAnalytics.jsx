const SpendingAnalytics = () => {
	const categories = [
		{ name: "Housing", percentage: 35, color: "bg-purple-700" },
		{ name: "Food", percentage: 25, color: "bg-green-500" },
		{ name: "Entertainment", percentage: 20, color: "bg-blue-500" },
		{ name: "Others", percentage: 20, color: "bg-red-500" },
	];

	const monthlyData = [
		{ month: "Jan", spending: 800 },
		{ month: "Feb", spending: 900 },
		{ month: "Mar", spending: 1000 },
		{ month: "Apr", spending: 1200 },
		{ month: "May", spending: 1100 },
		{ month: "Jun", spending: 950 },
	];

	// Calculate max spending for chart scaling
	const maxSpending = Math.max(...monthlyData.map((d) => d.spending));

	return (
		<div className="bg-white p-6 rounded-lg border border-slate-200">
			<h3 className="text-slate-500 font-medium">Spending Analytics</h3>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
				<div className="flex flex-col items-center">
					<div className="relative w-48 h-48">
						{/* This is a simplified representation of the pie chart */}
						<div className="absolute inset-0 rounded-full border border-slate-200"></div>
						{/* In a real app, you would use a chart library like Chart.js or Recharts */}
					</div>
					<div className="mt-6 space-y-2 w-full">
						{categories.map((category, index) => (
							<div key={index} className="flex items-center">
								<div className={`w-4 h-4 ${category.color} mr-2`}></div>
								<span className="text-sm text-slate-900">
									{category.name} ({category.percentage}%)
								</span>
							</div>
						))}
					</div>
				</div>
				<div>
					<div className="h-48 flex items-end space-x-2">
						{monthlyData.map((data, index) => (
							<div key={index} className="flex-1 flex flex-col items-center">
								<div className="w-full bg-slate-100 rounded-t-sm">
									<div
										className="bg-purple-700 rounded-t-sm"
										style={{
											height: `${(data.spending / maxSpending) * 100}%`,
										}}
									></div>
								</div>
								<p className="text-xs text-slate-500 mt-2">{data.month}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpendingAnalytics;
