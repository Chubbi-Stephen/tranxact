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
import { PieChart, BarChart3, TrendingDown } from "lucide-react";

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

	const COLORS = ["#E4570A", "#013653", "#38BDF8", "#F472B6", "#818CF8", "#A0AEC0"];

	if (loading) return (
        <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center animate-pulse">
            <PieChart className="text-slate-100 mb-4" size={48} />
            <div className="h-4 w-32 bg-slate-50 rounded-full"></div>
        </div>
    );

	if (!data || !data.insights || data.insights.length === 0) {
		return (
			<div className="bg-white p-12 rounded-[3rem] border border-slate-100 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
				    <BarChart3 size={32} className="text-slate-200" />
                </div>
				<h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-2">Spending Analytics</h3>
				<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">Insufficient transaction data to<br/>generate smart insights</p>
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
				hoverOffset: 10,
                borderRadius: 4
			},
		],
	};

	return (
		<div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
			<div className="flex justify-between items-start mb-10">
				<div>
                    <div className="flex items-center space-x-3 mb-2">
					    <h3 className="text-[#013653] font-black text-xs uppercase tracking-widest">Monthly Spending</h3>
                        <div className="flex items-center space-x-1 px-2 py-0.5 bg-orange-50 rounded-full">
                            <TrendingDown size={10} className="text-[#E4570A]" />
                            <span className="text-[8px] font-black text-[#E4570A] uppercase tracking-widest">v1.2 AI</span>
                        </div>
                    </div>
					<p className="text-2xl font-black text-slate-900">₦{data.totalSpent?.toLocaleString()}</p>
				</div>
				<PieChart size={24} className="text-slate-200" />
			</div>
			
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div className="relative flex justify-center">
					<div className="w-full max-w-[200px]">
						<Doughnut data={doughnutData} options={{ cutout: "82%", plugins: { legend: { display: false } } }} />
					</div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Total Spent</p>
                        <p className="text-sm font-black text-slate-900">{data.insights.length} Cats</p>
                    </div>
				</div>

				<div className="space-y-4">
                    {data.insights.slice(0, 4).map((i, idx) => (
                        <div key={i.category} className="group">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">{i.category}</span>
                                </div>
                                <span className="text-xs font-black text-slate-900">₦{i.amount.toLocaleString()}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${i.percentage}%`, backgroundColor: COLORS[idx] }}
                                ></div>
                            </div>
                        </div>
                    ))}
				</div>
			</div>
		</div>
	);
};

export default SpendingAnalytics;
