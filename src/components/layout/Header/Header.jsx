import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
	const { user } = useAuth();

	return (
		<header className="bg-[#013653] m-3 mt-2 rounded-2xl text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center">
					<div className="bg-[#E4570A] h-10 w-10 flex justify-center items-center rounded-full mr-3">
						<span className="text-2xl flex justify-center items-center">T</span>
					</div>
					<h1 className="font-bold text-2xl">Tranxact</h1>
				</div>
				<div className="flex items-center">
					<div className="bg-slate-700 px-4 py-1 rounded-full flex items-center mr-4">
						<div className="bg-green-600 h-2 w-2 rounded-full mr-2"></div>
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
