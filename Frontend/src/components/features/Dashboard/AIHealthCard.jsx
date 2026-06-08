import { useState, useEffect } from "react";
import { Activity, TrendingUp, Lightbulb } from "lucide-react";
import { aiApi } from "../../../services/api";

const AIHealthCard = ({ refreshTrigger }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHealth = async () => {
			try {
				setLoading(true);
				const { data: result } = await aiApi.analyze();
				setData(result);
			} catch (error) {
				console.error("Failed to fetch AI health:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchHealth();
	}, [refreshTrigger]);

	if (loading) return (
		<div className="bg-[#013653] text-white p-6 rounded-[2rem] animate-pulse h-[160px]"></div>
	);

	if (!data) return null;

	return (
		<div className="bg-[#013653] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8">
			{/* Decorative Elements */}
			<div className="absolute top-0 right-0 w-64 h-64 bg-[#E4570A] opacity-10 blur-[100px] -mr-32 -mt-32"></div>

			<div className="flex flex-col items-center justify-center space-y-3 relative z-10">
				<div className="relative w-28 h-28 flex items-center justify-center">
					<svg className="w-full h-full transform -rotate-90">
						<circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
						<circle
							cx="56"
							cy="56"
							r="48"
							stroke="currentColor"
							strokeWidth="8"
							strokeDasharray={301.6}
							strokeDashoffset={301.6 - (301.6 * data.healthScore) / 100}
							strokeLinecap="round"
							fill="transparent"
							className="text-[#E4570A] transition-all duration-1000"
						/>
					</svg>
					<div className="absolute flex flex-col items-center">
						<span className="text-3xl font-black">{data.healthScore}</span>
						<Activity size={12} className="text-[#E4570A]" />
					</div>
				</div>
				<span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/40">Health Metric</span>
			</div>

			<div className="flex-1 space-y-6 relative z-10">
				<div className="flex items-start space-x-4">
					<div className="bg-white/10 p-2 rounded-lg"><TrendingUp size={18} className="text-[#E4570A]" /></div>
					<div>
						<h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Weekly Forecast</h3>
						<p className="text-lg font-bold leading-tight tracking-tight">{data.forecast}</p>
					</div>
				</div>
				
				<div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
					<div className="flex items-start space-x-4">
						<Lightbulb size={20} className="text-[#E4570A] mt-1" />
						<div>
							<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E4570A] mb-1">AI Recommendation</h4>
							<p className="text-xs text-white/60 leading-relaxed font-medium">
								{data.recommendation}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AIHealthCard;
