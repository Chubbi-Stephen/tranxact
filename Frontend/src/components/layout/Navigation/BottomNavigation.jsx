import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
	return (
		<nav className="fixed bottom-0 w-full bg-[#013653] border-t border-slate-200">
			<div className="container mx-auto flex justify-around items-center py-3">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`flex flex-col items-center ${
							isActive ? "text-white" : "text-[#7C94B3]"
						}`
					}
				>
					<div className="bg-[#E4570A] h-12 w-12 rounded-full flex items-center justify-center mb-1">
						<span>H</span>
					</div>
					<span className="text-xs">Home</span>
				</NavLink>
				<NavLink
					to="/wallet"
					className={({ isActive }) =>
						`flex flex-col items-center ${
							isActive ? "text-white" : "text-[#7C94B3]"
						}`
					}
				>
					<div className="bg-[#E4570A] h-12 w-12 rounded-full flex items-center justify-center mb-1">
						<span>W</span>
					</div>
					<span className="text-xs">Wallet</span>
				</NavLink>
				<NavLink
					to="/transactions"
					className={({ isActive }) =>
						`flex flex-col items-center ${
							isActive ? "text-white" : "text-[#7C94B3]"
						}`
					}
				>
					<div className="bg-[#E4570A] h-12 w-12 rounded-full flex items-center justify-center mb-1">
						<span>T</span>
					</div>
					<span className="text-xs">Transactions</span>
				</NavLink>
				<NavLink
					to="/profile"
					className={({ isActive }) =>
						`flex flex-col items-center ${
							isActive ? "text-white" : "text-[#7C94B3]"
						}`
					}
				>
					<div className="bg-[#E4570A] h-12 w-12 rounded-full flex items-center justify-center mb-1">
						<span>P</span>
					</div>
					<span className="text-xs">Profile</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default BottomNavigation;
