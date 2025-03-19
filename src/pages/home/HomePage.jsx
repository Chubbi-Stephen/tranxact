import WelcomeSection from "../../components/features/Dashboard/WelcomeSection";
import BalanceCard from "../../components/features/Dashboard/BalanceCard";
// import QuickActions from "../../components/features/Dashboard/QuickActions";
import TransactionHistory from "../../components/features/Transactions/TransactionHistory";
import SpendingAnalytics from "../../components/features/Dashboard/SpendingAnalytics";

const HomePage = () => {
	return (
		<div className="space-y-6">
			<WelcomeSection />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<BalanceCard />
				{/* <QuickActions /> */}
			</div>
			<TransactionHistory limit={4} />
			<SpendingAnalytics />
		</div>
	);
};

export default HomePage;
