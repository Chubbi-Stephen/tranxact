import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import BottomNavigation from "./Navigation/BottomNavigation";

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen bg-slate-50">
			<Header />
			<main className="flex-1 p-4 pb-24">
				<Outlet />
			</main>
			<BottomNavigation />
		</div>
	);
};

export default Layout;
