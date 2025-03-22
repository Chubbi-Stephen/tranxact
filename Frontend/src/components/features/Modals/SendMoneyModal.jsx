import { useState } from "react";
import Modal from "./Modal";

const SendMoneyModal = ({ onClose }) => {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState("");
	const [note, setNote] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Here you would add the API call to send money
			console.log("Sending money", { recipient, amount, note });

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Close modal on success
			onClose();

			// Show success notification (you would implement this)
			alert("Money sent successfully!");
		} catch (error) {
			console.error("Error sending money:", error);
			alert("Failed to send money. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Send Money" onClose={onClose}>
			<form onSubmit={handleSubmit}>
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
