import { useState } from "react";

const CustomDropdown = ({ options, onSelect, selectedOption }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (value) => {
		onSelect(value);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			{/* Dropdown Button */}
			<div
				className="w-full p-3 border border-[#E4570A] bg-[#E5E3DC] rounded cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOption
					? options.find((option) => option.value === selectedOption)?.label
					: "Select a bank account"}
			</div>

			{/* Dropdown Options */}
			{isOpen && (
				<ul className="absolute w-full mt-1 bg-white border border-[#E4570A] rounded shadow-lg z-10">
					{options.map((option) => (
						<li
							key={option.value}
							className="p-3 hover:bg-[#1E293B] hover:text-white cursor-pointer"
							onClick={() => handleSelect(option.value)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CustomDropdown;
