import { useState } from "react";
import Modal from "./Modal";
// import Custom from "./Custom/CustomDropdown";
import CustomDropdown from "./Custom/CustomDropdown";

const WithdrawModal = ({ onClose }) => {
	const [amount, setAmount] = useState("");
	const [withdrawMethod, setWithdrawMethod] = useState("");
	const [selectedBankAccount, setSelectedBankAccount] = useState("");
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
						className="w-full p-3 border border-[#E4570A] rounded text-2xl"
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
										? "border-[#E4570A] bg-[#E5E3DC]"
										: "border-slate-200"
								}`}
							>
								<input
									type="radio"
									name="withdrawMethod"
									value={method.id}
									checked={withdrawMethod === method.id}
									onChange={() => setWithdrawMethod(method.id)}
									className="mr-2 accent-[#1E293B]"
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
						{withdrawMethod === "bank" && (
							<div className="mb-6">
								<label
									className="block text-slate-700 mb-2"
									htmlFor="bankAccount"
								>
									Bank Account
								</label>
								<CustomDropdown
									options={[
										{ value: "", label: "Select a bank account" },
										{ value: "1", label: "Bank of America - ****1234" },
										{ value: "2", label: "Chase - ****5678" },
										{ value: "3", label: "+ Add new bank account" },
									]}
									selectedOption={selectedBankAccount}
									onSelect={(value) => setSelectedBankAccount(value)}
								/>
							</div>
						)}
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
						className="px-6 py-2 bg-[#E4570A] text-white rounded-full"
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
