const SafelockCard = ({ lock, onWithdraw }) => {
	const isMatured = new Date() >= new Date(lock.maturityDate);
	const maturityDate = new Date(lock.maturityDate).toLocaleDateString("en-NG", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	// Calculate Progress (simplified for demo)
	const daysLeft = Math.max(0, Math.ceil((new Date(lock.maturityDate) - new Date()) / (1000 * 60 * 60 * 24)));

	return (
		<div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm min-w-[280px]">
			<div className="flex justify-between items-start mb-4">
				<div className="h-10 w-10 bg-[#E4570A]/10 rounded-full flex items-center justify-center text-xl">
					🔒
				</div>
				<div className="text-right">
					<p className="text-[10px] uppercase font-bold text-[#E4570A] tracking-widest bg-[#E4570A]/10 px-2 py-1 rounded">
						10% Interest
					</p>
				</div>
			</div>

			<h4 className="font-bold text-slate-900 text-lg mb-1">{lock.title}</h4>
			<p className="text-2xl font-black text-slate-900">₦{lock.currentBalance?.toLocaleString()}</p>
			
			<div className="mt-4 space-y-2">
				<div className="flex justify-between text-xs text-slate-500">
					<span>Maturity Date</span>
					<span className="font-medium text-slate-700">{maturityDate}</span>
				</div>
				
				{lock.status === 'active' ? (
					<>
						<div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
							<div 
								className="bg-[#E4570A] h-full transition-all duration-1000" 
								style={{ width: isMatured ? '100%' : '60%' }}
							></div>
						</div>
						<div className="flex justify-between items-center mt-4">
							<span className="text-[10px] text-slate-400 italic">
								{isMatured ? 'Funds ready for withdrawal' : `${daysLeft} days remaining`}
							</span>
							<button
								disabled={!isMatured}
								onClick={() => onWithdraw(lock._id)}
								className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
									isMatured 
										? 'bg-[#013653] text-white shadow-md' 
										: 'bg-slate-100 text-slate-400 cursor-not-allowed'
								}`}
							>
								{isMatured ? 'Withdraw' : 'Locked'}
							</button>
						</div>
					</>
				) : (
					<div className="pt-2">
						<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
							Withdrawn
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default SafelockCard;
