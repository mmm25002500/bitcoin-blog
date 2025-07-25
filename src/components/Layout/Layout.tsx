import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { LayoutData } from "@/types/Layout/Layout";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import FooterSmall from "./FooterSmall";

const Layout = ({ children }: LayoutData) => {
	const { theme } = useTheme();

	const footerRef = useRef<HTMLDivElement>(null);
	const [footerVisible, setFooterVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (footerRef.current) {
				const rect = footerRef.current.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				// 如果 Footer 頂部進入或可見
				if (rect.top + 15 <= windowHeight && rect.bottom >= 0) {
					setFooterVisible(true);
				} else {
					setFooterVisible(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{/* HEAD */}
			<Head>
				{/* <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#1c1c1c" media="(prefers-color-scheme: light)" /> */}
				{theme === "dark" ? (
					<meta name="theme-color" content="white" />
				) : (
					<meta name="theme-color" content="#1c1c1c" />
				)}
			</Head>

			{/* Body */}
			<div id="body" className=" bg-white dark:bg-primary-black-300">
				<main className="z-0">{children}</main>
				{
					<div className="md:hidden">
						<div
							className={`bottom-0 w-full z-50 ${footerVisible ? "hidden" : "fixed bg-navbar-default"}`}
						>
							<FooterSmall />
						</div>
					</div>
				}
				<div ref={footerRef}>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Layout;
