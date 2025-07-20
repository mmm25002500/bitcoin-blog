import type { MenuSubListData } from "@/types/Menu/Menu";
import { useRouter } from "next/navigation";

const MenuSubList = (props: MenuSubListData) => {
	const router = useRouter();

	return (
		<div className={`${props.className}`}>
			<button
				type="button"
				className="py-2 px-4 text-neutral-800 dark:text-neutral-300 text-sm active:bg-neutral-900 active:rounded-lg"
				onClick={() => {
					router.push(props.link);
				}}
			>
				{props.name}
			</button>
		</div>
	);
};

export default MenuSubList;
