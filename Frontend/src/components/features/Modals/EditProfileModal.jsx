import { useState } from "react";
import { User, Phone, Save, Loader2, X } from "lucide-react";
import Modal from "./Modal";
import { authApi } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const EditProfileModal = ({ onClose }) => {
	const { user, refreshUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		phone: user?.phone || "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await authApi.updateProfile(formData);
			await refreshUser();
			toast.success("Profile updated successfully!");
			onClose();
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to update profile");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal title="Edit Profile" onClose={onClose}>
			<form onSubmit={handleSubmit} className="p-6 space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
						<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">First Name</label>
						<input
							type="text"
							className="w-full bg-transparent font-bold text-sm outline-none text-slate-900"
							value={formData.firstName}
							onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
							required
						/>
					</div>
					<div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
						<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Last Name</label>
						<input
							type="text"
							className="w-full bg-transparent font-bold text-sm outline-none text-slate-900"
							value={formData.lastName}
							onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
							required
						/>
					</div>
				</div>

				<div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
					<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Phone Number</label>
					<div className="flex items-center space-x-2">
						<Phone size={14} className="text-slate-300" />
						<input
							type="tel"
							className="w-full bg-transparent font-bold text-sm outline-none text-slate-900"
							placeholder="+234..."
							value={formData.phone}
							onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-5 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform"
				>
					{loading ? <Loader2 className="animate-spin" size={18} /> : (
						<>
							<Save size={16} />
							<span>Save Changes</span>
						</>
					)}
				</button>
			</form>
		</Modal>
	);
};

export default EditProfileModal;
