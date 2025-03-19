// const QuickActions = () => {
// 	const actions = [
// 		{ icon: "↑", label: "Send", action: () => console.log("Send") },
// 		{ icon: "↓", label: "Receive", action: () => console.log("Receive") },
// 		{ icon: "$", label: "Pay", action: () => console.log("Pay") },
// 		{ icon: "⋮", label: "More", action: () => console.log("More") },
// 	];

// 	return (
// 		<div className="bg-white p-6 rounded-lg border border-slate-200">
// 			<h3 className="text-slate-500 font-medium">Quick Actions</h3>
// 			<div className="grid grid-cols-4 gap-4 mt-4">
// 				{actions.map((action, index) => (
// 					<button
// 						key={index}
// 						className="flex flex-col items-center"
// 						onClick={action.action}
// 					>
// 						<div className="bg-slate-100 h-16 w-16 rounded-lg flex items-center justify-center mb-2">
// 							<span className="text-xl">{action.icon}</span>
// 						</div>
// 						<span className="text-sm text-slate-900">{action.label}</span>
// 					</button>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default QuickActions;
