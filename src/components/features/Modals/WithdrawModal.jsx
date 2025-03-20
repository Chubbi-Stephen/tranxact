import { useState } from "react";
import Modal from "./Modal";

const WithdrawModal = ({ onClose }) => {
	const [amount, setAmount] = useState("");
	const [withdrawMethod, setWithdrawMethod] = useState("");
	const [loading, setLoading] = useState(false);

	const withdrawMethods = [
		{ id: "bank", name: "Bank Account", icon: "🏦" },
		{ id: "card", name: "Credit/Debit Card", icon: "💳" },
		{ id: "cash", name: "Cash Pickup", icon: "💵" },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Here you would add the API call to withdraw money
			console.log("Withdrawing money", { amount, withdrawMethod });

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Close modal on success
			onClose();

			// Show success notification
			alert(`$${amount} withdrawal initiated successfully!`);
		} catch (error) {
			console.error("Error withdrawing money:", error);
			alert("Failed to withdraw money. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Withdraw Money" onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label className="block text-slate-700 mb-2" htmlFor="amount">
						Amount ($)
					</label>
					<input
						id="amount"
						type="number"
						step="0.01"
						min="0.01"
						className="w-full p-3 border border-slate-300 rounded text-2xl"
						placeholder="0.00"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
					<p className="text-sm text-slate-500 mt-1">
						Available balance: $12,480.55
					</p>
				</div>

				<div className="mb-6">
					<label className="block text-slate-700 mb-2">Withdraw Method</label>
					<div className="space-y-2">
						{withdrawMethods.map((method) => (
							<label
								key={method.id}
								className={`flex items-center p-3 border rounded cursor-pointer ${
									withdrawMethod === method.id
										? "border-purple-700 bg-purple-50"
										: "border-slate-200"
								}`}
							>
								<input
									type="radio"
									name="withdrawMethod"
									value={method.id}
									checked={withdrawMethod === method.id}
									onChange={() => setWithdrawMethod(method.id)}
									className="mr-2"
									required
								/>
								<span className="mr-2">{method.icon}</span>
								<span>{method.name}</span>
							</label>
						))}
					</div>
				</div>

				{withdrawMethod === "bank" && (
					<div className="mb-6">
						<label className="block text-slate-700 mb-2" htmlFor="bankAccount">
							Bank Account
						</label>
						<select
							id="bankAccount"
							className="w-full p-3 border border-slate-300 rounded"
							required
						>
							<option value="">Select a bank account</option>
							<option value="1">Bank of America - ****1234</option>
							<option value="2">Chase - ****5678</option>
							<option value="3">+ Add new bank account</option>
						</select>
					</div>
				)}

				<div className="flex justify-end space-x-3">
					<button
						type="button"
						className="px-6 py-2 border border-slate-300 rounded-full text-slate-700"
						onClick={onClose}
						disabled={loading}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-6 py-2 bg-purple-700 text-white rounded-full"
						disabled={loading || !amount || !withdrawMethod}
					>
						{loading ? "Processing..." : "Withdraw"}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default WithdrawModal;
