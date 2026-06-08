import { useState } from "react";
import Modal from "./Modal";
import { transactionsApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

const SendMoneyModal = ({ onClose, onRefresh }) => {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { user, refreshUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numAmount = parseFloat(amount);

		if (numAmount > user.balance) {
			setError("Insufficient balance.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const idempotencyKey = crypto.randomUUID();
			await transactionsApi.create({
				amount: numAmount,
				type: "debit",
				category: "Transfer",
				description: `Transfer to ${recipient}${note ? `: ${note}` : ""}`,
			}, { "X-Idempotency-Key": idempotencyKey });

			// Refresh global user state (balance) and local page state
			await refreshUser();
			if (onRefresh) onRefresh();

			onClose();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to send money.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Send Money" onClose={onClose}>
			<form onSubmit={handleSubmit}>
				{error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded text-sm">{error}</div>}
				<div className="mb-4">
					<label className="block text-slate-700 mb-2" htmlFor="recipient">
						Recipient
					</label>
					<input
						id="recipient"
						type="text"
						className="w-full p-3 border border-[#E4570A] rounded"
						placeholder="Email or Phone Number"
						value={recipient}
						onChange={(e) => setRecipient(e.target.value)}
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-slate-700 mb-2" htmlFor="amount">
						Amount ($)
					</label>
					<input
						id="amount"
						type="number"
						step="0.5"
						min="0.5"
						className="w-full p-3 border border-[#E4570A] rounded"
						placeholder="0.00"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
				</div>
				<div className="mb-6">
					<label className="block text-slate-700 mb-2" htmlFor="note">
						Note (Optional)
					</label>
					<textarea
						id="note"
						className="w-full p-3 border border-[#E4570A] rounded"
						placeholder="What's this for?"
						value={note}
						onChange={(e) => setNote(e.target.value)}
						rows="3"
					/>
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
						disabled={loading}
					>
						{loading ? "Sending..." : "Send Money"}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default SendMoneyModal;
