import { useState } from "react";

const getDayDifference = () => {
	const start = new Date("2025-07-20");
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	start.setHours(0, 0, 0, 0);
	const diff = Math.floor(
		(today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
	);
	return diff >= 0 ? diff.toString().padStart(3, "0") : "000";
};

const HeaderInfo = () => {
	const [open, setOpen] = useState(true);
	const dayDiff = getDayDifference();

	return (
		<div
			className={`relative flex bg-[#F7931A] w-full px-16 text-[17px] z-40 ${!open && "hidden"}`}
		>
			<p className="text-black text-center grow">🚧 網站施工測試中 {dayDiff}</p>
			<button
				type="button"
				className="text-black"
				onClick={() => setOpen(false)}
			>
				x
			</button>
		</div>
	);
};

export default HeaderInfo;
