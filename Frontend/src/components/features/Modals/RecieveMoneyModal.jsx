import Modal from "./Modal";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const ReceiveMoneyModal = ({ onClose }) => {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState("qr");
	const [copySuccess, setCopySuccess] = useState("");

	// Mock payment link - in a real app this would be generated from the backend
	const paymentLink = `https://transact.com/pay/${user?.id || "123"}`;

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(paymentLink)
			.then(() => {
				setCopySuccess("Copied!");
				setTimeout(() => setCopySuccess(""), 2000);
			})
			.catch((err) => {
				console.error("Failed to copy:", err);
			});
	};

	return (
		<Modal title="Receive Money" onClose={onClose}>
			<div className="flex border-b border-slate-200 mb-4">
				<button
					className={`pb-2 px-4 ${
						activeTab === "qr"
							? "border-b-2 border-[#E4570A] text-[#E4570A]"
							: "text-slate-500"
					}`}
					onClick={() => setActiveTab("qr")}
				>
					QR Code
				</button>
				<button
					className={`pb-2 px-4 ${
						activeTab === "link"
							? "border-b-2 border-[#E4570A] text-[#E4570A]"
							: "text-slate-500"
					}`}
					onClick={() => setActiveTab("link")}
				>
					Payment Link
				</button>
			</div>

			{activeTab === "qr" && (
				<div className="flex flex-col items-center">
					<div className="bg-[#E5E3DC] w-64 h-64 flex items-center justify-center mb-4">
						{/* This would be a real QR code in a production app */}
						<div className="text-center">
							<p className="text-slate-500">QR Code</p>
							<p className="text-xs text-slate-400">
								Scan to send money to {user?.firstName || "John"}
							</p>
						</div>
					</div>
					<p className="text-slate-500 text-center">
						Have the sender scan this code to send you money instantly
					</p>
				</div>
			)}

			{activeTab === "link" && (
				<div>
					<p className="text-slate-500 mb-4">
						Share this link with anyone who wants to send you money:
					</p>
					<div className="flex">
						<input
							type="text"
							value={paymentLink}
							readOnly
							className="flex-1 p-3 border border-slate-300 rounded-l"
						/>
						<button
							onClick={copyToClipboard}
							className="bg-[#E4570A] text-white px-4 rounded-r"
						>
							{copySuccess || "Copy"}
						</button>
					</div>
					<div className="mt-6">
						<p className="text-slate-500 mb-2">Share via:</p>
						<div className="flex space-x-4">
							<button
								className="bg-blue-500 text-white p-2 px-4 rounded-xl"
								style={{
									background: "linear-gradient(to right, #464f5E, #823C16)",
								}}
							>
								WhatsApp
							</button>
							<button
								className="bg-blue-600 text-white p-2 px-4 rounded-xl"
								style={{
									background: "linear-gradient(to right, #464f5E, #823C16)",
								}}
							>
								Facebook
							</button>
							<button
								className="bg-sky-500 text-white p-2 px-4 rounded-xl"
								style={{
									background: "linear-gradient(to right, #464f5E, #823C16)",
								}}
							>
								Twitter
							</button>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default ReceiveMoneyModal;
