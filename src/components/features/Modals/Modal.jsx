import { useEffect } from "react";

const Modal = ({ title, onClose, children }) => {
	// Close modal when escape key is pressed
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [onClose]);

	// Prevent scrolling when modal is open
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
		>
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md">
				<div className="flex justify-between items-center p-4 border-b border-slate-200">
					<h3 className="text-xl font-bold text-slate-900">{title}</h3>
					<button
						onClick={onClose}
						className="text-slate-500 hover:text-slate-700"
					>
						✕
					</button>
				</div>
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
