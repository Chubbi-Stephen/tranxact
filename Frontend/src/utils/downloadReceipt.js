import { jsPDF } from "jspdf";

export const downloadReceipt = (transaction, user) => {
	const doc = new jsPDF({ unit: "mm", format: "a5" });
	const W = doc.internal.pageSize.getWidth();

	// Background
	doc.setFillColor(1, 54, 83); // #013653
	doc.rect(0, 0, W, 50, "F");

	// Logo / Brand
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(22);
	doc.setFont("helvetica", "bold");
	doc.text("Tranxact", W / 2, 22, { align: "center" });

	doc.setFontSize(8);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(148, 163, 184);
	doc.text("TRANSACTION RECEIPT", W / 2, 30, { align: "center" });

	// Status badge
	const isDebit = transaction.type === "debit";
	doc.setFillColor(isDebit ? 228 : 59, isDebit ? 87 : 183, isDebit ? 10 : 94);
	doc.roundedRect(W / 2 - 18, 35, 36, 9, 4, 4, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(7);
	doc.setFont("helvetica", "bold");
	doc.text(isDebit ? "DEBIT" : "CREDIT", W / 2, 41, { align: "center" });

	// Amount
	doc.setTextColor(15, 23, 42);
	doc.setFontSize(32);
	doc.setFont("helvetica", "bold");
	const amount = `₦${transaction.amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
	doc.text(amount, W / 2, 68, { align: "center" });

	// Divider
	doc.setDrawColor(226, 232, 240);
	doc.setLineWidth(0.3);
	doc.line(12, 75, W - 12, 75);

	// Transaction details
	const details = [
		["Date", new Date(transaction.createdAt).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })],
		["Category", transaction.category || "Transfer"],
		["Description", transaction.description || "N/A"],
		["Reference", transaction._id?.slice(-10).toUpperCase() || "N/A"],
		["Account Name", `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || "N/A"],
	];

	let y = 87;
	details.forEach(([label, value]) => {
		doc.setFontSize(7);
		doc.setFont("helvetica", "normal");
		doc.setTextColor(100, 116, 139);
		doc.text(label.toUpperCase(), 14, y);

		doc.setFontSize(8);
		doc.setFont("helvetica", "bold");
		doc.setTextColor(15, 23, 42);
		doc.text(String(value), W - 14, y, { align: "right" });

		y += 12;
		doc.setDrawColor(241, 245, 249);
		doc.setLineWidth(0.2);
		doc.line(14, y - 4, W - 14, y - 4);
	});

	// Footer
	doc.setFillColor(248, 250, 252);
	doc.rect(0, doc.internal.pageSize.getHeight() - 20, W, 20, "F");
	doc.setFontSize(7);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(148, 163, 184);
	doc.text("Tranxact Financial Services · tranxxact.vercel.app", W / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });

	const filename = `Tranxact_Receipt_${transaction._id?.slice(-8) || Date.now()}.pdf`;
	doc.save(filename);
};
