import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Plus, CreditCard, ChevronRight, Eye, EyeOff, LayoutGrid, Copy, Check, Lock, Smartphone, RefreshCw } from "lucide-react";
import { cardsApi } from "../../services/api";
import toast from "react-hot-toast";

const WalletPage = () => {
    const { user, refreshUser } = useAuth();
    const [viewMode, setViewMode] = useState("cards"); // cards, account
    const [showBalance, setShowBalance] = useState(true);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const { data } = await cardsApi.getAll();
            setCards(data);
        } catch (err) {
            toast.error("Failed to load cards");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success("Card Number copied!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleCreateCard = async () => {
        // This would open a modal in a real app, but for now we'll do an instant creation
        if (user.balance < 1000) return toast.error("₦1,000 fee required for a new card");
        
        const loadingToast = toast.loading("Issuing your virtual card...");
        try {
            await cardsApi.create({
                cardType: "Visa",
                currency: "NGN",
                color: "bg-[#013653]"
            });
            await fetchCards();
            await refreshUser();
            toast.success("Card issued successfully!", { id: loadingToast });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create card", { id: loadingToast });
        }
    };

    const StatusBadge = ({ status }) => (
        <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
            status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
            {status}
        </span>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
            {/* Header section with Balance Sync */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Wallet</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Available Balance</p>
                    <div className="flex items-center space-x-4 mt-2">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                            {showBalance ? `₦${user?.balance?.toLocaleString()}` : "••••••"}
                        </span>
                        <button 
                            onClick={() => setShowBalance(!showBalance)}
                            className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm"
                        >
                            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button 
                        onClick={handleCreateCard}
                        className="flex items-center space-x-2 px-6 py-4 bg-[#E4570A] text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Plus size={16} />
                        <span>Add New Card</span>
                    </button>
                </div>
            </div>

            {/* Selector Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-2xl w-fit border border-slate-200">
                <button 
                    onClick={() => setViewMode("cards")}
                    className={`px-8 py-3 rounded-[1rem] font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'cards' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Cards
                </button>
                <button 
                    onClick={() => setViewMode("account")}
                    className={`px-8 py-3 rounded-[1rem] font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'account' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Bank Accounts
                </button>
            </div>

            {viewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {loading ? (
                        [1, 2].map(i => (
                            <div key={i} className="h-56 w-full bg-slate-100 rounded-[2.5rem] animate-pulse"></div>
                        ))
                    ) : cards.length > 0 ? (
                        cards.map((card) => (
                            <div 
                                key={card._id}
                                className={`relative h-60 w-full ${card.color} rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden group hover:translate-y-[-4px] transition-all duration-300`}
                            >
                                {/* Glass shine effect */}
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="h-10 w-16 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center font-black italic text-xs">
                                        {card.cardType}
                                    </div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Card Balance</p>
                                        <p className="text-3xl font-black tracking-tight mt-1">₦{card.balance.toLocaleString()}</p>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flex items-center space-x-3 mb-1">
                                            <p className="text-lg font-mono tracking-[0.25em] font-black italic">
                                                {showBalance ? card.cardNumber.match(/.{1,4}/g).join(' ') : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
                                            </p>
                                            <button 
                                                onClick={() => handleCopy(card._id, card.cardNumber)}
                                                className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                                            >
                                                {copiedId === card._id ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="opacity-40" />}
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Card Holder</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest">{card.cardName}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Expires</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest">{card.expiryDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/10 backdrop-blur-sm border-t border-white/5 flex justify-between items-center px-8">
                                    <StatusBadge status={card.status} />
                                    <button className="text-[9px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 flex items-center space-x-2">
                                        <span>Settings</span>
                                        <ChevronRight size={10} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                <CreditCard size={28} className="text-slate-300" />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 mb-1">No Active Cards</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issuing a new card takes less than 30 seconds</p>
                            <button 
                                onClick={handleCreateCard}
                                className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
                            >
                                Issue Virtual Card
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#E4570A] transition-all cursor-pointer">
                        <div className="flex items-center space-x-6">
                            <div className="h-16 w-16 bg-slate-50 rounded-[1.2rem] flex items-center justify-center text-[#E4570A]">
                                <Smartphone size={28} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-sm">Main Account (Kuda Bank)</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Checking • **** 4242</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-black text-slate-900 text-lg">₦{user?.balance?.toLocaleString()}</p>
                            <span className="text-[8px] font-black uppercase tracking-widest text-[#E4570A] bg-orange-50 px-2 py-0.5 rounded-full">Primary</span>
                        </div>
                    </div>

                    <button 
                        className="w-full py-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300 hover:border-[#E4570A] hover:bg-slate-50/50 transition-all group"
                        onClick={() => toast.error("Bank Account linking is a high-level feature.")}
                    >
                        <Plus size={24} className="mb-2 group-hover:scale-125 transition-all" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Link New Bank Account</span>
                    </button>
                </div>
            )}
            
            {/* Quick Stats Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Max Card Limit</p>
                    <p className="text-xl font-black text-slate-900">₦500,000.00</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Daily Card Spend</p>
                    <p className="text-xl font-black text-slate-900">₦0.00</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Controls</p>
                    <div className="flex items-center space-x-2 mt-1">
                        <Lock size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-900">Freeze Enabled</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
