import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
	const { user } = useAuth();

	return (
		<header className="bg-slate-900 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center">
					<div className="bg-purple-700 h-10 w-10 rounded-full mr-3"></div>
					<h1 className="font-bold text-xl">Transact</h1>
				</div>
				<div className="flex items-center">
					<div className="bg-slate-700 px-4 py-1 rounded-full flex items-center mr-4">
						<div className="bg-green-500 h-2 w-2 rounded-full mr-2"></div>
						<span className="text-xs">Active</span>
					</div>
					<div className="bg-slate-700 h-10 w-10 rounded-full flex items-center justify-center">
						<span className="font-bold">{user?.initials || "JD"}</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
