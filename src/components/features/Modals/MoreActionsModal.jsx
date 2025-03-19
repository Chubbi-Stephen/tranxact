import Modal from "./Modal";

const MoreActionsModal = ({ onClose }) => {
	const actions = [
		{ icon: "💰", label: "Loans", action: () => console.log("Loans") },
		{
			icon: "💹",
			label: "Investments",
			action: () => console.log("Investments"),
		},
		{
			icon: "🔄",
			label: "Recurring Payments",
			action: () => console.log("Recurring Payments"),
		},
		{ icon: "💳", label: "Cards", action: () => console.log("Cards") },
		{ icon: "🏦", label: "Savings", action: () => console.log("Savings") },
		{ icon: "🎁", label: "Rewards", action: () => console.log("Rewards") },
		{ icon: "📊", label: "Analytics", action: () => console.log("Analytics") },
		{ icon: "💸", label: "Budget", action: () => console.log("Budget") },
		{
			icon: "🔔",
			label: "Notifications",
			action: () => console.log("Notifications"),
		},
	];

	return (
		<Modal title="More Actions" onClose={onClose}>
			<div className="grid grid-cols-3 gap-4">
				{actions.map((action, index) => (
					<button
						key={index}
						className="flex flex-col items-center p-4 rounded border border-slate-200 hover:bg-slate-50"
						onClick={() => {
							action.action();
							onClose();
						}}
					>
						<span className="text-2xl mb-2">{action.icon}</span>
						<span className="text-sm text-slate-700 text-center">
							{action.label}
						</span>
					</button>
				))}
			</div>
		</Modal>
	);
};

export default MoreActionsModal;
