import ArticleHeader from "@/components/Layout/Article/ArticleHeader";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
// import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from "@/icons/illustation/Privacy Policy.svg";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import LogoDark from "@/icons/icon_dark.svg";
import LogoLight from "@/icons/icon_light.svg";

import Icon from "@/components/Icon";
import { useState, useEffect } from "react";
import SEO from "@/config/SEO.json";
import SupporterConfig from "@/config/Supporter.json";

// TODO: 將supporter.json 放 supabase

const SupporterPage = ({
  SEO,
  supporterCfg,
}: { SEO?: any; supporterCfg?: any }) => {
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
        <title>{SEO.SupporterPage.title}</title>
        <meta name="description" content={SEO.SupporterPage.description} />
        <meta property="og:title" content={SEO.SupporterPage.title} />
        <meta
          property="og:description"
          content={SEO.SupporterPage.description}
        />
        <meta property="og:image" content={SEO.SupporterPage.image} />
        <meta property="og:type" content={SEO.SupporterPage.type} />
        <meta name="twitter:title" content={SEO.SupporterPage.title} />
        <meta
          name="twitter:description"
          content={SEO.SupporterPage.description}
        />
        <meta name="twitter:image" content={SEO.SupporterPage.image} />
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

      <ArticleHeader title="Supporter" subtitle="贊助頁面" icon={IconLight} />
      <div className="px-5 sm:px-28 pb-20 mx-auto md:px-28 w-full xl:w-[1280px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 content-center pt-10">
          {supporterCfg.map(
            (supporter: {
              name: string;
              description: string;
              image: string;
            }) => (
              <div key={supporter.name} className="shadow-md">
                {/* <img
                src={supporter.image}
                height={100}
                width={200}
                alt={supporter.name}
                className="border rounded-md mb-0"
              /> */}
                <Icon
                  icon_light={LogoLight}
                  icon_dark={LogoDark}
                  className="mb-0"
                />
              </div>
            ),
          )}
        </div>

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
  return {
    props: {
      SEO: SEO,
      supporterCfg: SupporterConfig,
    },
  };
};

export default SupporterPage;
