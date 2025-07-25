import type { AvaterProps } from "@/types/User/Avater";
import Image from "next/image";

const Avater = (props: AvaterProps) => {
	return (
		<>
			<Image
				src={props.src}
				alt="Icon Dark"
				width={1000}
				height={1000}
				className={`rounded-full w-[100px] h-[100px] ${props.className}`}
			/>
		</>
	);
};

export default Avater;
