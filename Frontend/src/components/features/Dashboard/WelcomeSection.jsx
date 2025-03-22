import { useAuth } from "../../../hooks/useAuth";

const WelcomeSection = () => {
	const { user } = useAuth();

	return (
		<div className="bg-[#F5F5F5] p-6 rounded-lg">
			<h2 className="text-2xl font-bold text-slate-900">
				Welcome back, {user?.firstName || "John"}!
			</h2>
			<p className="text-slate-600 mt-2">Your financial overview</p>
		</div>
	);
};

export default WelcomeSection;
