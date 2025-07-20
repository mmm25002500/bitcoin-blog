import HorizontalLine from "@/components/HorizontalLine";
import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import ArticleHeader from "@/components/Layout/Article/ArticleHeader";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import MD from "@/components/MD";
import ContactSection from "@/components/Page/ContactSection";
// import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from "@/icons/illustation/Privacy Policy.svg";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { initAdmin } from "lib/firebaseAdmin";
import type { MarkDownDataProps } from "@/types/User/UserID";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

const PrivacyPolicyPage = ({
	initialPost,
	SEO,
}: { initialPost: MarkDownDataProps; SEO?: any }) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 68) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<Head>
				<title>{SEO.PrivacyPolicy.title}</title>
				<meta name="description" content={SEO.PrivacyPolicy.description} />
				<meta property="og:title" content={SEO.PrivacyPolicy.title} />
				<meta
					property="og:description"
					content={SEO.PrivacyPolicy.description}
				/>
				<meta property="og:image" content={SEO.PrivacyPolicy.image} />
				<meta property="og:type" content={SEO.PrivacyPolicy.type} />
				<meta name="twitter:title" content={SEO.PrivacyPolicy.title} />
				<meta
					name="twitter:description"
					content={SEO.PrivacyPolicy.description}
				/>
				<meta name="twitter:image" content={SEO.PrivacyPolicy.image} />
			</Head>

			<div className="sm:hidden">
				<Header />
			</div>

			<div
				className={`top-0 w-full z-50 ${scrolled ? "fixed bg-navbar-scrolled" : "bg-navbar-default"}`}
			>
				<Navbar scrolled={scrolled} />
			</div>
			<div className={`${scrolled ? "h-16" : ""}`} />

			<ArticleHeader
				title="Privacy Policy"
				subtitle="隱私政策聲明"
				icon={IconLight}
			/>
			<div className="px-5 sm:px-28 pb-20 mx-auto md:px-28 w-full xl:w-[1280px]">
				<ArticleLayout className="pt-10">
					<MD>{initialPost.source}</MD>
				</ArticleLayout>
				{/* <HorizontalLine className='sm:hidden' />
        <ContactSection className="py-16" /> */}
				{/* <HorizontalLine />
        <SubscribeSection className="py-16" />
        <HorizontalLine /> */}
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const app = await initAdmin();
		const bucket = app.storage().bucket();

		// 取得SEO設定
		const seoFile = bucket.file("config/SEO.json");
		const seoFileContents = (await seoFile.download())[0].toString("utf8");
		const seoData = JSON.parse(seoFileContents);

		// 取得文章內容
		const postFile = bucket.file("WebsiteArticle/PrivacyPolicy.mdx");
		const [exists] = await postFile.exists();

		if (!exists) {
			return { notFound: true };
		}

		const postFileContents = (await postFile.download())[0].toString("utf8");
		const { content, data } = matter(postFileContents);
		const mdxSource = await serialize(content);

		return {
			props: {
				initialPost: {
					source: mdxSource,
					frontMatter: data,
				},
				SEO: seoData,
			},
		};
	} catch (error) {
		console.error("Error fetching article content or SEO/author data:", error);
		return { notFound: true };
	}
};

export default PrivacyPolicyPage;
