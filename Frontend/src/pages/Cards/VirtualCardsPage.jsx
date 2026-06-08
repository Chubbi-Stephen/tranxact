import { useState, useEffect } from "react";
import { Plus, ShieldCheck, Globe, CreditCard, LayoutGrid, ChevronRight, Eye, EyeOff, Lock, Zap } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const VirtualCardsPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNumbers, setShowNumbers] = useState({});

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/api/cards", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCards(data);
        } catch (err) {
            toast.error("Failed to load cards");
        } finally {
            setLoading(false);
        }
    };

    const toggleNumber = (id) => {
        setShowNumbers(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-32">
            {/* Header */}
            <div className="bg-white px-6 pt-16 pb-8 border-b border-slate-100 sticky top-0 z-30">
                <div className="flex justify-between items-center max-w-lg mx-auto">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">My Cards</h1>
                        <div className="flex items-center space-x-2">
                            <ShieldCheck size={14} className="text-green-500 fill-green-500/10" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PCI-DSS Compliant</p>
                        </div>
                    </div>
                    <button className="h-14 w-14 bg-[#E4570A] rounded-[1.5rem] flex items-center justify-center text-white shadow-lg shadow-[#E4570A]/20 hover:scale-105 active:scale-95 transition-all">
                        <Plus size={24} />
                    </button>
                </div>
            </div>

            <div className="max-w-lg mx-auto px-6 pt-8 space-y-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Balance</p>
                        <p className="text-xl font-black text-slate-800">₦0.00</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Cards</p>
                        <p className="text-xl font-black text-slate-800">{cards.length}</p>
                    </div>
                </div>

                {/* Cards List */}
                <div className="space-y-6">
                    {loading ? (
                        [1, 2].map(i => <div key={i} className="h-56 bg-slate-200 rounded-[2.5rem] animate-pulse"></div>)
                    ) : cards.length > 0 ? (
                        cards.map((card) => (
                            <div key={card._id} className={`${card.color} p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl group`}>
                                {/* Card Chip & Type */}
                                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-7 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md">
                                                <div className="grid grid-cols-2 gap-1 px-2">
                                                    <div className="h-1 w-2 bg-amber-400/50 rounded-full"></div>
                                                    <div className="h-1 w-2 bg-amber-400/50 rounded-full"></div>
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{card.cardName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black italic tracking-tighter uppercase">{card.cardType}</p>
                                            <div className="flex items-center space-x-1 justify-end">
                                                <Globe size={10} className="text-white/40" />
                                                <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">{card.currency} Virtual</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-mono font-medium tracking-[0.25em]">
                                                {showNumbers[card._id] ? card.cardNumber.match(/.{1,4}/g).join(" ") : "**** **** **** " + card.cardNumber.slice(-4)}
                                            </p>
                                            <button onClick={() => toggleNumber(card._id)} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                                {showNumbers[card._id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        <div className="flex space-x-8 mt-6">
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Expiry</p>
                                                <p className="text-xs font-black">{card.expiryDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">CVV</p>
                                                <p className="text-xs font-black">{showNumbers[card._id] ? card.cvv : "***"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Current Balance</p>
                                            <p className="text-2xl font-black">{card.currency === 'USD' ? '$' : '₦'}{card.balance.toFixed(2)}</p>
                                        </div>
                                        <button className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 flex items-center space-x-2">
                                            <Zap size={14} className="fill-white" />
                                            <span>Fund Card</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-[#E4570A]/5 rounded-full flex items-center justify-center mb-6">
                                <CreditCard size={32} className="text-[#E4570A]" />
                            </div>
                            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-3">No Virtual Cards</h3>
                            <p className="text-sm font-bold text-slate-400 max-w-[200px] leading-relaxed mb-8">
                                Create a virtual USD card to shop internationally with ease.
                            </p>
                            <button className="px-8 py-5 bg-[#E4570A] text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#E4570A]/20">
                                Issue New Card
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualCardsPage;
