import NotFoundPage from "@/pages/404";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import axios from "axios";
import type { MarkDownDataProps, MarkDownProps } from "@/types/User/UserID";
import type { PostProps } from "@/types/List/PostData";
import Navbar from "@/components/Layout/Navbar";
import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import MD from "@/components/MD";
import Tag from "@/components/Tag/Tag";
import HorizontalLine from "@/components/HorizontalLine";
import ArticlePostList from "@/components/List/ArticlePostList";
import { useEffect, useState } from "react";
import Head from "next/head";
import { initAdmin } from "../../../../lib/firebaseAdmin";
import matter from "gray-matter";
import defalutPostImage from "@/icons/examplePhoto/defaultPostImage.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import blockImg from "@/icons/examplePhoto/block.jpg";
import right from "@/icons/right.svg";
import left from "@/icons/left.svg";

const PostPage = ({
	initialPost,
	seo,
	ArticlePostListMorePostPerclick,
}: MarkDownProps & {
	initialPost: MarkDownDataProps;
	seo: any;
	ArticlePostListMorePostPerclick: number;
}) => {
	const router = useRouter();
	const { postID, userID } = router.query;
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

	const [relatedPosts, setRelatedPosts] = useState<PostProps[]>([]);

	useEffect(() => {
		if (initialPost?.frontMatter?.tags && postID) {
			const fetchRelatedPosts = async () => {
				const response = await axios.get("/api/getRelatedPosts", {
					params: {
						tag: JSON.stringify(initialPost.frontMatter.tags),
						exclude: `${userID}/${postID}`,
						mode: "Post",
					},
				});
				setRelatedPosts(response.data);
			};

			fetchRelatedPosts();
		}
	}, [postID, initialPost?.frontMatter?.tags, userID]);

	// 如果是新聞
	useEffect(() => {
		if (!initialPost?.frontMatter?.type.includes("Post"))
			router.push(`/News/${userID}/${postID}`);
	}, [initialPost?.frontMatter?.type, postID, router, userID]);

	if (!initialPost || postID === "undefined" || postID === undefined) {
		return <NotFoundPage />;
	}

	const date = initialPost?.frontMatter?.date
		? new Date(initialPost.frontMatter.date)
		: null;

	return (
		<>
			<Head>
				<title>{initialPost.frontMatter.title}</title>
				<meta
					name="description"
					content={initialPost.frontMatter.description}
				/>
				<meta
					property="og:title"
					content={`${initialPost.frontMatter.title}`}
				/>
				<meta
					property="og:description"
					content={initialPost.frontMatter.description}
				/>
				<meta property="og:image" content={initialPost.frontMatter.image} />
				<meta property="og:type" content={seo.Post.type} />
				<meta
					name="twitter:title"
					content={`${initialPost.frontMatter.title}`}
				/>
				<meta
					name="twitter:description"
					content={initialPost.frontMatter.description}
				/>
				<meta name="twitter:image" content={initialPost.frontMatter.image} />
			</Head>
			<article>
				<div
					className={`top-0 w-full z-50 ${scrolled ? "fixed bg-navbar-scrolled" : "bg-navbar-default"}`}
				>
					<Navbar scrolled={scrolled} />
				</div>
				<div className={`${scrolled ? "h-16" : ""}`} />

				<div className="mx-auto md:px-28 w-full lg:w-[1280px]">
					<ArticleLayout className="pt-10 px-5 md:px-0">
						<h1 className="mb-2 text-3xl sm:text-[45px] leading-[30px] sm:leading-[48px] font-bold">
							{initialPost.frontMatter.title}
						</h1>
						<p className="mb-3 text-base sm:text-2xl leading-[22px] sm:leading-[30px] font-medium text-neutral-800 dark:text-neutral-200">
							{initialPost.frontMatter.description}
						</p>
						<div className="flex justify-center">
							<Image
								// src={initialPost.frontMatter.image}
								src={defalutPostImage}
								alt="Post Image"
							/>
						</div>
						<MD>{initialPost.source}</MD>

						{/* 標籤 */}
						<div className="relative w-full h-10 my-5 mt-14">
							<div className="relative">
								<div className="px-8 md:px-0">
									<Swiper
										slidesPerView={"auto"}
										spaceBetween={20}
										freeMode={true}
										navigation={{
											nextEl: ".swiper-button-next",
											prevEl: ".swiper-button-prev",
										}}
										modules={[FreeMode, Navigation]}
										className="w-full h-8"
									>
										{initialPost.frontMatter.tags.map((tag, idx) => (
											<SwiperSlide key={tag} className="!w-auto">
												<Tag
													key={tag}
													text={tag}
													type={["Post"]}
													className="text-xs py-1 px-3"
												/>
											</SwiperSlide>
										))}
									</Swiper>
								</div>

								{/* 左右箭頭 */}
								<div className="swiper-button-prev absolute left-0 md:-left-8 top-1/2 transform -translate-y-3 z-0">
									<Image
										src={left}
										alt="Icon Dark"
										width={1000}
										height={1000}
										className="rounded-full w-5 h-5 dark:invert"
									/>
								</div>
								<div className="swiper-button-next absolute right-0 md:-right-8 top-1/2 transform -translate-y-3 z-0">
									<Image
										src={right}
										alt="Icon Dark"
										width={1000}
										height={1000}
										className="rounded-full w-5 h-5 dark:invert"
									/>
								</div>
							</div>
						</div>

						{/* <div className="mt-2 mb-5 flex gap-2">
              {initialPost.frontMatter.tags.map((item: string, index: number) => (
                <Tag key={index} text={item} type={["Post"]} className="text-xs py-1 px-3" />
              ))}
            </div> */}
						{/* 日期 */}
						{date && (
							<div className="text-sm font-medium leading-5 dark:text-neutral-white">
								{date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
								&nbsp;
								{date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:
								{date.getMinutes()}
								&nbsp;
								{date.getHours() > 12 ? "PM" : "AM"}
							</div>
						)}
						<HorizontalLine className="my-9" />
						<Image src={blockImg} alt={""} />
						<HorizontalLine className="my-9" />
						<p className="text-xl leading-[24.38px] sm:text-2xl sm:leading-9 font-semibold mb-5">
							更多文章
						</p>
						<ArticlePostList
							data={relatedPosts}
							ArticlePostListMorePostPerclick={ArticlePostListMorePostPerclick}
						/>
					</ArticleLayout>
				</div>
			</article>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { params } = context;
	const userID = params?.userID;
	const postID = params?.postID;

	if (!userID || !postID) {
		return { notFound: true };
	}

	const app = await initAdmin();
	const bucket = app.storage().bucket();

	// 取得 SEO 資料
	const seoFile = bucket.file("config/SEO.json");
	const seoFileContents = (await seoFile.download())[0].toString("utf8");
	const seoData = JSON.parse(seoFileContents);

	// 取得 SiteConfig 資料
	const siteConfigFile = bucket.file("config/SiteConfig.json");
	const siteConfigFileContents = (await siteConfigFile.download())[0].toString(
		"utf8",
	);
	const siteConfigData = JSON.parse(siteConfigFileContents);
	const ArticlePostListMorePostPerclick =
		siteConfigData.ArticlePostListMorePostPerclick;

	// 取得文章資料
	const postFile = bucket.file(`Article/${userID}/${postID}.mdx`);
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
			seo: seoData,
			ArticlePostListMorePostPerclick,
		},
	};
};

export default PostPage;
