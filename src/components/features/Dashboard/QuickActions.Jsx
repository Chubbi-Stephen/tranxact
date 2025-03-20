import { useState } from "react";
import SendMoneyModal from "../Modals/SendMoneyModal";
import ReceiveMoneyModal from "../Modals/RecieveMoneyModal";
import PaymentModal from "../Modals/PaymentModal";
import MoreActionsModal from "../Modals/MoreActionsModal";

const QuickActions = () => {
	const [activeModal, setActiveModal] = useState(null);

	const actions = [
		{
			icon: "↑",
			label: "Send",
			action: () => setActiveModal("send"),
			bgColor: "bg-blue-100",
			textColor: "text-blue-600",
		},
		{
			icon: "↓",
			label: "Receive",
			action: () => setActiveModal("receive"),
			bgColor: "bg-green-100",
			textColor: "text-green-600",
		},
		{
			icon: "$",
			label: "Pay",
			action: () => setActiveModal("pay"),
			bgColor: "bg-purple-100",
			textColor: "text-purple-600",
		},
		{
			icon: "⋮",
			label: "More",
			action: () => setActiveModal("more"),
			bgColor: "bg-orange-100",
			textColor: "text-orange-600",
		},
	];

	const closeModal = () => setActiveModal(null);

	return (
		<>
			<div className="bg-[#F5F5F5] p-6 rounded-lg border border-slate-200">
				<h3 className="text-slate-500 font-medium">Quick Actions</h3>
				<div className="grid grid-cols-4 gap-4 mt-4">
					{actions.map((action, index) => (
						<button
							key={index}
							className="flex flex-col items-center"
							onClick={action.action}
						>
							<div
								className={`${action.bgColor} h-16 w-16 rounded-lg flex items-center justify-center mb-2`}
							>
								<span className={`text-xl ${action.textColor}`}>
									{action.icon}
								</span>
							</div>
							<span className="text-sm text-slate-900">{action.label}</span>
						</button>
					))}
				</div>
			</div>

			{activeModal === "send" && <SendMoneyModal onClose={closeModal} />}
			{activeModal === "receive" && <ReceiveMoneyModal onClose={closeModal} />}
			{activeModal === "pay" && <PaymentModal onClose={closeModal} />}
			{activeModal === "more" && <MoreActionsModal onClose={closeModal} />}
		</>
	);
};

export default QuickActions;
