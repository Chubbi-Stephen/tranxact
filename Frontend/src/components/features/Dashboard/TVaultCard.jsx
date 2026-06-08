import { useState, useEffect } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownLeft, ChevronRight, Info, Zap, Lock } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const TVaultCard = () => {
    const { user, refreshUser } = useAuth();
    const [vault, setVault] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVaultData();
    }, []);

    const fetchVaultData = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/api/savings/vault", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVault(data);
        } catch (err) {
            console.error("Failed to load T-Vault data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-48 bg-slate-50 rounded-[2.5rem] animate-pulse"></div>;

    return (
        <div className="bg-gradient-to-br from-[#013653] to-[#012a41] p-7 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
            {/* Animated accent gradient - Vault Gold */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] group-hover:bg-amber-500/20 transition-all duration-700"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Lock size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-amber-400">T-Vault</h3>
                            <div className="flex items-center space-x-2">
                                <p className="text-[10px] font-bold text-slate-400">Daily Growth • 15% APY</p>
                                <TrendingUp size={10} className="text-green-400" />
                            </div>
                        </div>
                    </div>
                    <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                        <Info size={16} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Secured Balance</p>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-black tracking-tight">₦{vault?.balance?.toLocaleString() || "0.00"}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center space-x-1 text-green-400 font-black text-[9px] uppercase tracking-widest">
                                <Zap size={10} className="fill-green-400 text-green-400" />
                                <span>+₦{vault?.accruedInterest?.toFixed(2)} Compounded</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button className="flex items-center space-x-2 px-6 py-4 bg-white text-[#013653] rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all">
                            <span>Manage</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TVaultCard;
