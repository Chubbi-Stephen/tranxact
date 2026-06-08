import { useState } from "react";
import { Lock, Save, Loader2, KeyRound } from "lucide-react";
import Modal from "./Modal";
import { authApi } from "../../../services/api";
import toast from "react-hot-toast";

const ChangePasswordModal = ({ onClose }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.newPassword !== formData.confirmPassword) return toast.error("New passwords do not match");
		if (formData.newPassword.length < 6) return toast.error("Password must be at least 6 characters");

		setLoading(true);
		try {
			await authApi.changePassword({
				oldPassword: formData.oldPassword,
				newPassword: formData.newPassword
			});
			toast.success("Password changed successfully!");
			onClose();
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to change password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Change Password" onClose={onClose}>
			<form onSubmit={handleSubmit} className="p-6 space-y-6">
				<div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
					<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Current Password</label>
					<input
						type="password"
						className="w-full bg-transparent font-bold text-sm outline-none text-slate-900"
						value={formData.oldPassword}
						onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
						required
					/>
				</div>

				<div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
					<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">New Password</label>
					<input
						type="password"
						className="w-full bg-transparent font-bold text-sm outline-none text-slate-900"
						value={formData.newPassword}
						onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
						required
					/>
				</div>

				<div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
					<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Confirm New Password</label>
					<input
						type="password"
						className="w-full bg-transparent font-bold text-sm outline-none text-slate-900"
						value={formData.confirmPassword}
						onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
						required
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform"
				>
					{loading ? <Loader2 className="animate-spin" size={18} /> : (
						<>
							<KeyRound size={16} />
							<span>Update Password</span>
						</>
					)}
				</button>
			</form>
		</Modal>
	);
};

export default ChangePasswordModal;
