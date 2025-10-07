import type { TagData } from "@/types/Tag/Tag";
import Link from "next/link";

const Tag = (props: TagData) => {
	return (
		<>
			<Link
				href={`/Tag/${props.type}/${props.text}`}
				className={`
        text-sm font-medium rounded-full border focus:outline-none leading-5 inline-block

        /* Light Mode */
        bg-white
        text-neutral-black
        border-neutral-200
        hover:border-neutral-black
        active:bg-neutral-black
        active:text-white

        /* Dark Mode */
        dark:bg-transparent
        dark:text-white
        dark:border-neutral-500
        dark:hover:bg-neutral-black
        dark:hover:border-neutral-800
        dark:active:text-primary-black-300
        dark:active:border-0

        ${props.className}`}
			>
				{props.text}
			</Link>
		</>
	);
};

export default Tag;
