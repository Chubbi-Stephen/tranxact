import { useState } from "react";
import { Gift, Copy, Share2, Check, ArrowRight } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ReferralCard = () => {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);

    const referralCode = user?.referralCode || "TRANXACT";
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        toast.success("Referral code copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join Tranxact',
                text: `Use my code ${referralCode} to join Tranxact and get ₦500 bonus!`,
                url: referralLink,
            });
        } else {
            handleCopy();
        }
    };

    return (
        <div className="bg-[#013653] p-7 rounded-[2.5rem] text-white relative overflow-hidden group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-all duration-700">
                <Gift size={120} />
            </div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#E4570A]/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-[#E4570A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E4570A]/20">
                        <Gift size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-[#E4570A]">Refer & Earn</h3>
                        <p className="text-[10px] font-bold text-slate-400">Invite friends and get ₦500 bonus</p>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 mb-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">Your Referral Code</p>
                    <div className="flex items-center justify-between bg-black/20 rounded-2xl p-4 border border-white/5">
                        <span className="text-xl font-black tracking-[0.3em] ml-2 uppercase">{referralCode}</span>
                        <button 
                            onClick={handleCopy}
                            className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all active:scale-95"
                        >
                            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-[#013653] bg-slate-800 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                            </div>
                        ))}
                        <div className="pl-4">
                            <p className="text-[10px] font-black text-slate-300 tracking-tight">12,400+ users earning</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleShare}
                        className="flex items-center space-x-2 px-6 py-4 bg-white text-[#013653] rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:translate-y-[-2px] active:scale-95 transition-all"
                    >
                        <span>Share</span>
                        <Share2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReferralCard;
