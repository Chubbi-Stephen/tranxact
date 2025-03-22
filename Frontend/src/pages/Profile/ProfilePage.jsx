import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
	const { user, logout } = useAuth();
	const [activeTab, setActiveTab] = useState("personal");

	// Mock user profile data - would come from API in real app
	const profile = {
		firstName: user?.firstName || "John",
		lastName: user?.lastName || "Doe",
		email: user?.email || "john.doe@example.com",
		phone: "+1 (555) 123-4567",
		dob: "1985-06-15",
		address: "123 Main St, New York, NY 10001",
		notifications: {
			email: true,
			push: true,
			sms: false,
		},
		security: {
			twoFactor: true,
			lastPasswordChange: "2025-01-15",
			devices: [
				{
					id: 1,
					name: "iPhone 15",
					lastActive: "Active now",
					location: "New York, NY",
				},
				{
					id: 2,
					name: "MacBook Pro",
					lastActive: "March 18, 2025",
					location: "New York, NY",
				},
			],
		},
	};

	const handleLogout = () => {
		logout();
		// Navigate will happen via protected route
	};

	return (
		<div className="space-y-6">
			<div className="bg-[#F5F5F5] p-6 rounded-lg">
				<div className="flex items-center">
					<div className="bg-[#013653] h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
						{profile.firstName[0]}
						{profile.lastName[0]}
					</div>
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							{profile.firstName} {profile.lastName}
						</h2>
						<p className="text-slate-600">{profile.email}</p>
					</div>
				</div>
			</div>

			<div className="bg-[#E5E3DC] rounded-lg border border-slate-200">
				<div className="flex border-b border-slate-200 overflow-x-auto">
					<button
						className={`py-4 px-6 whitespace-nowrap font-medium ${
							activeTab === "personal"
								? "text-[#E4570A] border-b-2 border-[#E4570A]"
								: "text-slate-500"
						}`}
						onClick={() => setActiveTab("personal")}
					>
						Personal Info
					</button>
					<button
						className={`py-4 px-6 whitespace-nowrap font-medium ${
							activeTab === "notifications"
								? "text-[#E4570A] border-b-2 border-[#E4570A]"
								: "text-slate-500"
						}`}
						onClick={() => setActiveTab("notifications")}
					>
						Notifications
					</button>
					<button
						className={`py-4 px-6 whitespace-nowrap font-medium ${
							activeTab === "security"
								? "text-[#E4570A] border-b-2 border-[#E4570A]"
								: "text-slate-500"
						}`}
						onClick={() => setActiveTab("security")}
					>
						Security
					</button>
					<button
						className={`py-4 px-6 whitespace-nowrap font-medium ${
							activeTab === "payment"
								? "text-[#E4570A] border-b-2 border-[#E4570A]"
								: "text-slate-500"
						}`}
						onClick={() => setActiveTab("payment")}
					>
						Payment Methods
					</button>
				</div>

				<div className="p-6">
					{activeTab === "personal" && (
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-slate-700 mb-2">
										First Name
									</label>
									<input
										type="text"
										className="w-full p-3 border border-slate-300 rounded"
										value={profile.firstName}
										readOnly
									/>
								</div>
								<div>
									<label className="block text-slate-700 mb-2">Last Name</label>
									<input
										type="text"
										className="w-full p-3 border border-slate-300 rounded"
										value={profile.lastName}
										readOnly
									/>
								</div>
							</div>
							<div>
								<label className="block text-slate-700 mb-2">Email</label>
								<input
									type="email"
									className="w-full p-3 border border-slate-300 rounded"
									value={profile.email}
									readOnly
								/>
							</div>
							<div>
								<label className="block text-slate-700 mb-2">
									Phone Number
								</label>
								<input
									type="tel"
									className="w-full p-3 border border-slate-300 rounded"
									value={profile.phone}
									readOnly
								/>
							</div>
							<div>
								<label className="block text-slate-700 mb-2">
									Date of Birth
								</label>
								<input
									type="date"
									className="w-full p-3 border border-slate-300 rounded"
									value={profile.dob}
									readOnly
								/>
							</div>
							<div>
								<label className="block text-slate-700 mb-2">Address</label>
								<textarea
									className="w-full p-3 border border-slate-300 rounded"
									value={profile.address}
									readOnly
									rows="3"
								></textarea>
							</div>
							<div>
								<button className="bg-[#E4570A] text-white px-6 py-2 rounded-full">
									Edit Profile
								</button>
							</div>
						</div>
					)}

					{activeTab === "notifications" && (
						<div className="space-y-6">
							<div className="flex items-center justify-between p-4 border border-slate-200 rounded">
								<div>
									<h4 className="font-medium">Email Notifications</h4>
									<p className="text-sm text-slate-500">
										Receive notifications via email
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={profile.notifications.email}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E4570A]"></div>
								</label>
							</div>
							<div className="flex items-center justify-between p-4 border border-slate-200 rounded">
								<div>
									<h4 className="font-medium">Push Notifications</h4>
									<p className="text-sm text-slate-500">
										Receive push notifications on your devices
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={profile.notifications.push}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E4570A]"></div>
								</label>
							</div>
							<div className="flex items-center justify-between p-4 border border-slate-200 rounded">
								<div>
									<h4 className="font-medium">SMS Notifications</h4>
									<p className="text-sm text-slate-500">
										Receive notifications via SMS
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={profile.notifications.sms}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-700"></div>
								</label>
							</div>
							<div>
								<button className="bg-[#E4570A] text-white px-6 py-2 rounded-full">
									Save Preferences
								</button>
							</div>
						</div>
					)}

					{activeTab === "security" && (
						<div className="space-y-6">
							<div className="flex items-center justify-between p-4 border border-slate-200 rounded">
								<div>
									<h4 className="font-medium">Two-Factor Authentication</h4>
									<p className="text-sm text-slate-500">
										Add an extra layer of security to your account
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={profile.security.twoFactor}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E4570A]"></div>
								</label>
							</div>
							<div>
								<h4 className="font-medium mb-2">Password</h4>
								<p className="text-sm text-slate-500 mb-4">
									Last changed on {profile.security.lastPasswordChange}
								</p>
								<button className="border border-[#E4570A] text-[#E4570A] px-6 py-2 rounded-full">
									Change Password
								</button>
							</div>
							<div>
								<h4 className="font-medium mb-2">Connected Devices</h4>
								<div className="space-y-3 mt-4">
									{profile.security.devices.map((device) => (
										<div
											key={device.id}
											className="flex items-center justify-between p-4 border border-slate-200 rounded"
										>
											<div>
												<h5 className="font-medium">{device.name}</h5>
												<p className="text-xs text-slate-500">
													{device.lastActive} • {device.location}
												</p>
											</div>
											{device.lastActive === "Active now" ? (
												<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
													Current
												</span>
											) : (
												<button className="text-[#E4570A] text-sm">
													Revoke
												</button>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{activeTab === "payment" && (
						<div className="space-y-6">
							<p className="text-slate-500">
								You haven't added any payment methods yet.
							</p>
							<button className="bg-[#E4570A] text-white px-6 py-2 rounded-full">
								Add Payment Method
							</button>
						</div>
					)}
				</div>
			</div>

			<div className="flex justify-center p-4">
				<button onClick={handleLogout} className="text-[#E4570A] font-medium">
					Logout
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;
