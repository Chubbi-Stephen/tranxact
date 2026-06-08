import { useState } from "react";
import Modal from "./Modal";
import { transactionsApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const AddMoneyModal = ({ onClose, onRefresh }) => {
	const [amount, setAmount] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { refreshUser } = useAuth();

	const paymentMethods = [
		{ id: "bank", name: "Bank Transfer", icon: "🏦" },
		{ id: "card", name: "Debit/Credit Card", icon: "💳" },
		{ id: "crypto", name: "Cryptocurrency", icon: "₿" },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);
			const idempotencyKey = crypto.randomUUID();
			
			await transactionsApi.create({
				amount: parseFloat(amount),
				type: "credit",
				category: "Income",
				description: `Added via ${selectedMethod?.name || "Manual Deposit"}`,
			}, { "X-Idempotency-Key": idempotencyKey });

			await refreshUser();
			if (onRefresh) onRefresh();

			onClose();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to add money.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Add Money" onClose={onClose}>
			<form onSubmit={handleSubmit}>
				{error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded text-sm">{error}</div>}
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
				</div>

				<div className="mb-6">
					<label className="block text-slate-700 mb-2">Payment Method</label>
					<div className="space-y-2">
						{paymentMethods.map((method) => (
							<label
								key={method.id}
								className={`flex items-center p-3 border rounded cursor-pointer ${
									paymentMethod === method.id
										? "border-[#E4570A] bg-[#E5E3DC]"
										: "border-slate-200"
								}`}
							>
								<input
									type="radio"
									name="paymentMethod"
									value={method.id}
									checked={paymentMethod === method.id}
									onChange={() => setPaymentMethod(method.id)}
									className="mr-2 accent-[#1E293B]"
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
						className="px-6 py-2 bg-[#E4570A] text-white rounded-full"
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
