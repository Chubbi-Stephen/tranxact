import { useState, useEffect } from "react";
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
import { aiApi } from "../../../services/api";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend
);

const SpendingAnalytics = ({ refreshTrigger }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				setLoading(true);
				const { data } = await aiApi.analyze();
				setData(data);
			} catch (error) {
				console.error("Failed to fetch analytics:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchAnalysis();
	}, [refreshTrigger]);

	// Colors for categories
	const COLORS = ["#E4570A", "#013653", "#4A5568", "#2D3748", "#718096", "#A0AEC0"];

	if (loading) return <div className="bg-[#F5F5F5] p-12 rounded-lg text-center text-slate-500">Loading insights...</div>;

	if (!data || !data.insights || data.insights.length === 0) {
		return (
			<div className="bg-[#F5F5F5] p-12 rounded-lg text-center">
				<h3 className="text-slate-500 font-medium mb-2">Spending Analytics</h3>
				<p className="text-slate-400">No spending data to analyze yet.</p>
			</div>
		);
	}

	const doughnutData = {
		labels: data.insights.map((i) => i.category),
		datasets: [
			{
				data: data.insights.map((i) => i.amount),
				backgroundColor: COLORS.slice(0, data.insights.length),
				borderWidth: 0,
				hoverOffset: 4,
			},
		],
	};

	const barData = {
		labels: data.insights.slice(0, 5).map((i) => i.category),
		datasets: [
			{
				label: "Spent Amount ($)",
				data: data.insights.slice(0, 5).map((i) => i.amount),
				backgroundColor: "#E4570A",
				borderRadius: 6,
				barThickness: 32, // Professional, consistent bar width
			},
		],
	};

	return (
		<div className="bg-[#F5F5F5] p-6 rounded-lg border border-slate-200">
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-slate-500 font-medium">Spending Analytics</h3>
					<p className="text-xl font-bold text-slate-900 mt-1">₦{data.totalSpent?.toLocaleString()} spent</p>
				</div>
				<div className="bg-white p-2 rounded-lg text-[10px] uppercase font-bold text-[#E4570A] tracking-widest border border-slate-100 shadow-sm">
					AI Powered
				</div>
			</div>
			
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
				<div className="flex flex-col items-center">
					<h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 w-full text-left">Category Breakdown</h4>
					<div className="w-full max-w-[180px]">
						<Doughnut data={doughnutData} options={{ cutout: "75%", plugins: { legend: { display: false } } }} />
					</div>
					<div className="mt-6 w-full grid grid-cols-2 gap-4">
						{data.insights.slice(0, 4).map((i, idx) => (
							<div key={i.category} className="flex items-center space-x-2 text-sm">
								<div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
								<span className="text-slate-600 truncate">{i.category}</span>
								<span className="text-slate-900 font-bold ml-auto">{i.percentage}%</span>
							</div>
						))}
					</div>
				</div>

				<div className="w-full">
					<h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Volume per Category</h4>
					<div className="h-[200px] w-full"> {/* Fixed height to prevent stretching */}
						<Bar 
							data={barData} 
							options={{ 
								responsive: true, 
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
								scales: { 
									y: { 
										beginAtZero: true, 
										grid: { display: false }, 
										ticks: { color: "#CBD5E0", font: { size: 10 } } 
									},
									x: { 
										grid: { display: false }, 
										ticks: { color: "#718096", font: { size: 10 } } 
									}
								}
							}} 
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpendingAnalytics;
