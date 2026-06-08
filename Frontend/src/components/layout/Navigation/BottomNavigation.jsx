import { NavLink } from "react-router-dom";
import { Home, Wallet, CreditCard, UserCircle2 } from "lucide-react";

const BottomNavigation = () => {
    const navItems = [
        { to: "/", label: "Home", icon: Home },
        { to: "/wallet", label: "Wallet", icon: Wallet },
        { to: "/cards", label: "Cards", icon: CreditCard },
        { to: "/profile", label: "Profile", icon: UserCircle2 },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center px-4 py-2 safe-bottom shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center w-20 py-2 transition-all duration-300 ${
                            isActive ? "text-[#E4570A] font-black" : "text-slate-400 font-medium"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <div className="relative">
                                <item.icon 
                                    size={22} 
                                    className="mb-1" 
                                    strokeWidth={isActive ? 2.5 : 2} 
                                />
                                <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E4570A] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                            </div>
                            <span className="text-[10px] uppercase tracking-tighter">{item.label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNavigation;
