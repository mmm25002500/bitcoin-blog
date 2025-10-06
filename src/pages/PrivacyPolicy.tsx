import ArticleLayout from "@/components/Layout/Article/ArticleLayout";
import ArticleHeader from "@/components/Layout/Article/ArticleHeader";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import MD from "@/components/MD";
// import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from "@/icons/illustation/Privacy Policy.svg";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MarkDownDataProps } from "@/types/User/UserID";
import { useEffect, useState } from "react";
import { createServerClient } from "@supabase/ssr";
import SEO from "@/config/SEO.json";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { notFound: true };
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return Object.entries(req.cookies).map(([name, value]) => ({
          name,
          value: value as string,
        }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          res.setHeader(
            "Set-Cookie",
            `${name}=${value}; Path=${options?.path || "/"}; ${options?.httpOnly ? "HttpOnly;" : ""} ${options?.secure ? "Secure;" : ""} ${options?.sameSite ? `SameSite=${options.sameSite};` : ""}`,
          );
        }
      },
    },
  });

  try {
    // 從 Supabase Storage 下載 PrivacyPolicy.md 檔案
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("post.article")
      .download("PrivacyPolicy.md");

    if (downloadError || !fileData) {
      console.error("[ERR] 下載 PrivacyPolicy.md 失敗:", downloadError);
      return { notFound: true };
    }

    // 將 Blob 轉換為文字
    const fileContents = await fileData.text();

    // 使用 gray-matter 解析 frontmatter
    const { content, data } = matter(fileContents);
    const mdxSource = await serialize(content);

    return {
      props: {
        initialPost: {
          source: mdxSource,
          frontMatter: data,
        },
        SEO: SEO,
      },
    };
  } catch (error) {
    console.error("Error fetching article content:", error);
    return { notFound: true };
  }
};

export default PrivacyPolicyPage;
