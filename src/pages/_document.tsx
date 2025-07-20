import { Html, Head, Main, NextScript } from "next/document";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const Document = () => {
	const { theme } = useTheme();

	useEffect(() => {
		document.addEventListener(
			"touchmove",
			(event) => {
				if (event.touches.length > 1) {
					event.preventDefault();
				}
			},
			{ passive: false },
		);
	}, []);

	return (
		<Html lang="en" className="">
			<Head />
			<body className={"text-black dark:text-white m-0 p-0"}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
