import React, { useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import type { HomePageSidebarProps } from "@/types/Sidebar/HomePageSidebar";
import Close from "../Button/Close";

const HomePageSearchDrawer = (props: HomePageSidebarProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(props.isDrawerOpen);
	const router = useRouter();

	useEffect(() => {
		setIsDrawerOpen(props.isDrawerOpen);
	}, [props.isDrawerOpen]);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => {
		setIsDrawerOpen(false);
		props.setIsDrawerOpen(false);
	};

	return (
		<>
			{/* Drawer */}
			<Drawer
				open={isDrawerOpen}
				onClose={closeDrawer}
				nonce={undefined}
				onResize={undefined}
				onResizeCapture={undefined}
				placement="top"
				className="absolute top-0 w-full text-white dark:bg-neutral-black !z-[10]"
				transition={{ duration: 0.3 }}
				overlayProps={{
					className: "fixed bg-neutral-black/50 backdrop-blur-none  !z-[10]",
				}}
			>
				<div className={`${props.className}`}>{props.children}</div>
			</Drawer>
		</>
	);
};

export default HomePageSearchDrawer;
