import { useAuth } from "../../../hooks/useAuth";

const WelcomeSection = () => {
	const { user } = useAuth();
	
	return (
		<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
			<div>
				<h2 className="text-2xl font-bold text-slate-900 leading-tight">
					Hello, {user?.username || 'User'}! 👋
				</h2>
				<p className="text-slate-500">How's your spending looking today?</p>
			</div>
			
			{!user?.isVerified && (
				<div className="bg-[#effaf2] border border-[#3bb75e]/20 px-4 py-2 rounded-full flex items-center space-x-3 cursor-pointer group">
					<div className="h-6 w-6 bg-[#3bb75e] rounded-full flex items-center justify-center text-[10px] text-white">✓</div>
					<span className="text-xs font-bold text-[#3bb75e] group-hover:underline">Verify BVN to increase limits</span>
				</div>
			)}
		</div>
	);
};

export default WelcomeSection;
