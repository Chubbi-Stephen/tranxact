import { useState, useEffect } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownLeft, ChevronRight, Info, Zap } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const OWealthCard = () => {
    const { user, refreshUser } = useAuth();
    const [owealth, setOwealth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOWealth();
    }, []);

    const fetchOWealth = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/api/savings/owealth", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOwealth(data);
        } catch (err) {
            console.error("Failed to load OWealth data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-48 bg-slate-50 rounded-[2rem] animate-pulse"></div>;

    return (
        <div className="bg-gradient-to-br from-[#013653] to-[#012a41] p-7 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
            {/* Animated accent gradient */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] group-hover:bg-green-500/20 transition-all duration-700"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                            <TrendingUp size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-green-400">OWealth</h3>
                            <div className="flex items-center space-x-2">
                                <p className="text-[10px] font-bold text-slate-400">Daily Interest • 15% APY</p>
                                <Zap size={10} className="text-amber-400 fill-amber-400" />
                            </div>
                        </div>
                    </div>
                    <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                        <Info size={16} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Saved Balance</p>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-black tracking-tight">₦{owealth?.balance?.toLocaleString() || "0.00"}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center space-x-1 text-green-400 font-black text-[9px] uppercase tracking-widest">
                                <TrendingUp size={12} />
                                <span>+₦{owealth?.accruedInterest?.toFixed(2)} Earned</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button className="flex items-center space-x-2 px-6 py-4 bg-white text-[#013653] rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all">
                            <span>Invest</span>
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OWealthCard;
