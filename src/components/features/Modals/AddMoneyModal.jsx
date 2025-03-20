import { useState } from "react";
import Modal from "./Modal";

const AddMoneyModal = ({ onClose }) => {
	const [amount, setAmount] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const [loading, setLoading] = useState(false);

	const paymentMethods = [
		{ id: "bank", name: "Bank Transfer", icon: "🏦" },
		{ id: "card", name: "Debit/Credit Card", icon: "💳" },
		{ id: "crypto", name: "Cryptocurrency", icon: "₿" },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Here you would add the API call to add money
			console.log("Adding money", { amount, paymentMethod });

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Close modal on success
			onClose();

			// Show success notification
			alert(`$${amount} added successfully!`);
		} catch (error) {
			console.error("Error adding money:", error);
			alert("Failed to add money. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Add Money" onClose={onClose}>
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
				</div>

				<div className="mb-6">
					<label className="block text-slate-700 mb-2">Payment Method</label>
					<div className="space-y-2">
						{paymentMethods.map((method) => (
							<label
								key={method.id}
								className={`flex items-center p-3 border rounded cursor-pointer ${
									paymentMethod === method.id
										? "border-purple-700 bg-purple-50"
										: "border-slate-200"
								}`}
							>
								<input
									type="radio"
									name="paymentMethod"
									value={method.id}
									checked={paymentMethod === method.id}
									onChange={() => setPaymentMethod(method.id)}
									className="mr-2"
									required
								/>
								<span className="mr-2">{method.icon}</span>
								<span>{method.name}</span>
							</label>
						))}
					</div>
				</div>

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
						disabled={loading || !amount || !paymentMethod}
					>
						{loading ? "Processing..." : "Add Money"}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default AddMoneyModal;
