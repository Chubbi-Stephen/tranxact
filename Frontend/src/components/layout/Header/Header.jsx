import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const { user } = useAuth();
	
	const getInitials = () => {
		if (user?.firstName && user?.lastName) {
			return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
		}
		if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
		return "JD";
	};

	return (
		<header className="bg-[#013653] m-3 mt-4 rounded-[1.5rem] text-white p-4 shadow-lg">
			<div className="container mx-auto flex justify-between items-center px-2">
				<div className="flex items-center">
					<div className="bg-[#E4570A] h-10 w-10 flex justify-center items-center rounded-xl mr-3 shadow-lg shadow-[#E4570A]/20">
						<span className="text-xl font-black">T</span>
					</div>
					<h1 className="font-black text-xl tracking-tight">Tranxact</h1>
				</div>
				<div className="flex items-center">
					<div className="hidden sm:flex bg-white/5 border border-white/10 px-4 py-2 rounded-full items-center mr-4">
						<div className="bg-green-400 h-2 w-2 rounded-full mr-2 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
						<span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Active</span>
					</div>
					<div
						className="bg-white/10 h-10 w-10 rounded-full flex items-center justify-center border border-white/20 shadow-inner"
						role="button"
					>
						<span className="font-black text-xs tracking-tighter">{getInitials()}</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
