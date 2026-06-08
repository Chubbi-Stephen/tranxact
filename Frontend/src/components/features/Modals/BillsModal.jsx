import { useState } from "react";
import { X, Smartphone, Zap, Tv, ChevronRight, ArrowLeft, History } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import PinModal from "./PinModal";

const BillsModal = ({ onClose, onRefresh }) => {
    const [step, setStep] = useState("select"); // select, form, pin
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        provider: "",
        meterNumber: "",
        smartcardNumber: "",
        amount: "",
        plan: "",
        type: "prepaid"
    });

    const services = [
        { id: "electricity", name: "Electricity", icon: Zap, color: "bg-amber-100 text-amber-600", providers: ["IKEDJA", "EKEDC", "AEDC", "KEDCO"] },
        { id: "cable", name: "Cable TV", icon: Tv, color: "bg-blue-100 text-blue-600", providers: ["DSTV", "GOTV", "StarTimes"] },
        { id: "data", name: "Mobile Data", icon: Smartphone, color: "bg-purple-100 text-purple-600", providers: ["MTN", "Airtel", "GLO", "9Mobile"] }
    ];

    const handleSubmit = async (pin) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const endpoint = service.id === "electricity" ? "electricity" : service.id === "cable" ? "cable" : "data";
            
            await axios.post(`http://localhost:5000/api/bills/${endpoint}`, 
                { ...formData, pin },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success(`${service.name} payment successful!`);
            onRefresh();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    if (step === "pin") return <PinModal onClose={() => setStep("form")} onPinCorrect={handleSubmit} />;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        {step === "form" ? (
                            <button onClick={() => setStep("select")} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                        ) : (
                            <div className="p-3 bg-[#E4570A]/10 rounded-2xl text-[#E4570A]">
                                <History size={20} />
                            </div>
                        )}
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">
                            {step === "form" ? `Pay ${service.name}` : "Bill Payments"}
                        </h2>
                        <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {step === "select" ? (
                        <div className="space-y-4">
                            {services.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setService(s); setStep("form"); }}
                                    className="w-full p-5 bg-slate-50 rounded-[2rem] flex items-center justify-between group hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-4 ${s.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                                            <s.icon size={24} strokeWidth={2.5} />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-black text-slate-800 text-sm tracking-tight">{s.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Instant Activation</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">Choose Provider</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {service.providers.map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setFormData({ ...formData, provider: p })}
                                            className={`p-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest ${formData.provider === p ? 'border-[#E4570A] bg-[#E4570A]/5 text-[#E4570A]' : 'border-slate-50 text-slate-400 hover:border-slate-100'}`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-[2rem] space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1">
                                        {service.id === "electricity" ? "Meter Number" : "Smartcard / IUC Number"}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 000"
                                        value={service.id === "electricity" ? formData.meterNumber : formData.smartcardNumber}
                                        onChange={(e) => setFormData({ ...formData, [service.id === "electricity" ? "meterNumber" : "smartcardNumber"]: e.target.value })}
                                        className="w-full bg-transparent border-none text-xl font-black text-slate-800 placeholder:text-slate-300 focus:ring-0 p-0"
                                    />
                                </div>

                                <div className="h-px bg-slate-200"></div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1">Plan / Amount</label>
                                    <div className="flex items-center">
                                        <span className="text-xl font-black text-slate-300 mr-2">₦</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full bg-transparent border-none text-xl font-black text-slate-800 placeholder:text-slate-300 focus:ring-0 p-0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep("pin")}
                                disabled={!formData.provider || (!formData.meterNumber && !formData.smartcardNumber) || !formData.amount}
                                className="w-full py-5 bg-[#E4570A] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#E4570A]/30 hover:translate-y-[-2px] active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                            >
                                Continue Payment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BillsModal;
