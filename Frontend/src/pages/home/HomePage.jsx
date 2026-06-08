import { useState } from "react";
import WelcomeSection from "../../components/features/Dashboard/WelcomeSection";
import BalanceCard from "../../components/features/Dashboard/BalanceCard";
import QuickActions from "../../components/features/Dashboard/QuickActions";
import TransactionHistory from "../../components/features/Transactions/TransactionHistory";
import SpendingAnalytics from "../../components/features/Dashboard/SpendingAnalytics";
import AIHealthCard from "../../components/features/Dashboard/AIHealthCard";
import SafelockSection from "../../components/features/Dashboard/SafelockSection";
import ReferralCard from "../../components/features/Dashboard/ReferralCard";
import TVaultCard from "../../components/features/Dashboard/TVaultCard";

const HomePage = () => {
	// Simple trigger to re-fetch data in children after an action
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

	return (
		<div className="space-y-6">
			<WelcomeSection />
			<AIHealthCard refreshTrigger={refreshTrigger} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<BalanceCard onRefresh={handleRefresh} />
				<QuickActions onRefresh={handleRefresh} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<TVaultCard />
				<ReferralCard />
			</div>
			
			<SafelockSection refreshTrigger={refreshTrigger} onRefresh={handleRefresh} />
			
			<TransactionHistory limit={6} refreshTrigger={refreshTrigger} />
			<SpendingAnalytics refreshTrigger={refreshTrigger} />
		</div>
	);
};

export default HomePage;
