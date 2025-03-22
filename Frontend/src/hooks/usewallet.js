import { useState, useEffect } from "react";

export const useWallet = () => {
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// This would be replaced with an actual API call
		const fetchBalance = async () => {
			try {
				// Simulate API call
				setLoading(true);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setBalance(12480.55);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch wallet balance");
				setLoading(false);
			}
		};

		fetchBalance();
	}, []);

	const addMoney = async (amount) => {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setBalance((prevBalance) => prevBalance + amount);
			return true;
		} catch (err) {
			setError("Failed to add money");
			return false;
		}
	};

	const withdraw = async (amount) => {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setBalance((prevBalance) => prevBalance - amount);
			return true;
		} catch (err) {
			setError("Failed to withdraw money");
			return false;
		}
	};

	return { balance, loading, error, addMoney, withdraw };
};
