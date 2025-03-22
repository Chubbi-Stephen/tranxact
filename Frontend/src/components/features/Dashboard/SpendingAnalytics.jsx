import { Bar, Doughnut } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend
);

const SpendingAnalytics = () => {
	const categories = [
		{ name: "Housing", percentage: 35, color: "#6B46C1" }, // Purple
		{ name: "Food", percentage: 25, color: "#48BB78" }, // Green
		{ name: "Entertainment", percentage: 20, color: "#4299E1" }, // Blue
		{ name: "Others", percentage: 20, color: "#F56565" }, // Red
	];

	const monthlyData = [
		{ month: "Jan", spending: 80 },
		{ month: "Feb", spending: 90 },
		{ month: "Mar", spending: 100 },
		{ month: "Apr", spending: 120 },
		{ month: "May", spending: 110 },
		{ month: "Jun", spending: 95 },
	];

	// Bar chart data
	const barChartData = {
		labels: monthlyData.map((data) => data.month),
		datasets: [
			{
				label: "Monthly Spending",
				data: monthlyData.map((data) => data.spending),
				backgroundColor: "#6B46C1", // Purple
				borderRadius: 4,
			},
		],
	};

	// Doughnut chart data
	const doughnutChartData = {
		labels: categories.map((category) => category.name),
		datasets: [
			{
				data: categories.map((category) => category.percentage),
				backgroundColor: categories.map((category) => category.color),
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="bg-[#F5F5F5] p-6 rounded-lg border border-slate-200">
			<h3 className="text-slate-500 font-medium">Spending Analytics</h3>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
				{/* Doughnut Chart */}
				<div className="flex flex-col items-center w-full">
					<h4 className="text-slate-700 font-medium mb-4">
						Category Breakdown
					</h4>
					<div className="w-full max-w-xs aspect-square">
						<Doughnut
							data={doughnutChartData}
							options={{
								responsive: true,
								maintainAspectRatio: true,
							}}
						/>
					</div>
				</div>

				{/* Bar Chart */}
				<div className="w-full">
					<h4 className="text-slate-700 font-medium mb-4">Monthly Spending</h4>
					<div className="w-full aspect-video">
						<Bar
							data={barChartData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpendingAnalytics;
