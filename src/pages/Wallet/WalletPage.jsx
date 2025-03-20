import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const WalletPage = () => {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState("cards");

	// Mock wallet data
	const walletData = {
		totalBalance: 12480.55,
		cards: [
			{
				id: 1,
				type: "Visa",
				last4: "4242",
				expiryDate: "09/28",
				balance: 8735.42,
				color: "bg-[#013653]",
			},
			{
				id: 2,
				type: "Mastercard",
				last4: "5678",
				expiryDate: "12/26",
				balance: 3745.13,
				color: "bg-[#E4570A]",
			},
		],
		accounts: [
			{
				id: 1,
				name: "Main Account",
				accountNumber: "****2345",
				balance: 10250.75,
				type: "Checking",
			},
			{
				id: 2,
				name: "Savings",
				accountNumber: "****8976",
				balance: 2229.8,
				type: "Savings",
			},
		],
	};

	return (
		<div className="space-y-6">
			<div className="bg-slate-100 p-6 rounded-lg">
				<h2 className="text-2xl font-bold text-slate-900">Your Wallet</h2>
				<p className="text-slate-600 mt-2">Manage your cards and accounts</p>
			</div>

			<div className="bg-white p-6 rounded-lg border border-slate-200">
				<h3 className="text-slate-500 font-medium">Total Balance</h3>
				<p className="text-3xl font-bold text-slate-900 mt-4">
					$
					{walletData.totalBalance.toLocaleString("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
				<div className="flex gap-4 mt-6">
					<button className="bg-[#E4570A] text-white px-6 py-2 rounded-full text-sm">
						Add Money
					</button>
					<button className="border border-[#E4570A] text-[#E4570A] px-6 py-2 rounded-full text-sm">
						Send Money
					</button>
				</div>
			</div>

			<div className="bg-white rounded-lg border border-slate-200">
				<div className="flex border-b border-slate-200">
					<button
						className={`flex-1 py-4 text-center font-medium ${
							activeTab === "cards"
								? "text-[#E4570A] border-b-2 border-[#E4570A]"
								: "text-slate-500"
						}`}
						onClick={() => setActiveTab("cards")}
					>
						Cards
					</button>
					<button
						className={`flex-1 py-4 text-center font-medium ${
							activeTab === "accounts"
								? "text-[#E4570A] border-b-2 border-[#E4570A]"
								: "text-slate-500"
						}`}
						onClick={() => setActiveTab("accounts")}
					>
						Accounts
					</button>
				</div>

				<div className="p-6">
					{activeTab === "cards" ? (
						<div className="space-y-6">
							{walletData.cards.map((card) => (
								<div
									key={card.id}
									className={`${card.color} text-white p-6 rounded-lg`}
								>
									<div className="flex justify-between items-start">
										<div>
											<p className="text-xs opacity-80">Balance</p>
											<p className="text-2xl font-bold mt-1">
												$
												{card.balance.toLocaleString("en-US", {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})}
											</p>
										</div>
										<p className="font-bold">{card.type}</p>
									</div>
									<div className="mt-8">
										<p className="font-mono text-lg tracking-wider">
											•••• •••• •••• {card.last4}
										</p>
										<div className="flex justify-between items-center mt-4">
											<div>
												<p className="text-xs opacity-80">Expires</p>
												<p>{card.expiryDate}</p>
											</div>
											<div className="bg-white bg-opacity-20 h-10 w-10 rounded-full"></div>
										</div>
									</div>
								</div>
							))}
							<button className="w-full border border-dashed border-slate-300 p-6 rounded-lg text-slate-500 flex items-center justify-center">
								<span className="mr-2">+</span> Add New Card
							</button>
						</div>
					) : (
						<div className="space-y-4">
							{walletData.accounts.map((account) => (
								<div
									key={account.id}
									className="border border-slate-200 rounded-lg p-4"
								>
									<div className="flex justify-between items-center">
										<div>
											<p className="font-medium text-slate-900">
												{account.name}
											</p>
											<p className="text-sm text-slate-500">
												{account.type} • {account.accountNumber}
											</p>
										</div>
										<p className="font-bold text-slate-900">
											$
											{account.balance.toLocaleString("en-US", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</p>
									</div>
								</div>
							))}
							<button className="w-full border border-dashed border-slate-300 p-4 rounded-lg text-slate-500 flex items-center justify-center">
								<span className="mr-2">+</span> Add New Account
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default WalletPage;
