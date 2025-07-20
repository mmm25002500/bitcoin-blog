import type { MenuListData } from "@/types/Menu/Menu";

const MenuList = (props: MenuListData) => {
	return (
		<div className={`${props.className}`}>
			<div className="border-b-2 border-neutral-100 dark:border-neutral-800">
				<p>
					<button
						type="button"
						className="flex items-center justify-between w-full py-2"
					>
						<span className="text-sm text-neutral-black dark:text-white">
							{props.title}
						</span>
					</button>
				</p>
				{props.children}
			</div>
		</div>
	);
};

export default MenuList;
