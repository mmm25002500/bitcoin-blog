import { useRouter } from "next/router";
import { useEffect } from "react";

const MoreInfos = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/MoreInfo/%20");
	}, [router]);

	return null;
};

export default MoreInfos;
