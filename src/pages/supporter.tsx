import ArticleHeader from '@/components/Layout/Article/ArticleHeader';
import Header from '@/components/Layout/Header';
import Navbar from '@/components/Layout/Navbar';
// import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from '@/icons/illustation/Privacy Policy.svg';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { initAdmin } from 'lib/firebaseAdmin';
import { MarkDownDataProps } from '@/types/User/UserID';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize'
  ;
import LogoDark from '@/icons/icon_dark.svg';
import LogoLight from '@/icons/icon_light.svg';

import Icon from '@/components/Icon';

const SupporterPage = ({ initialPost, SEO, supporterCfg }: { initialPost: MarkDownDataProps, SEO?: any, supporterCfg?: any }) => {

  return (
    <>
      <Head>
        <title>{SEO.SupporterPage.title}</title>
        <meta name="description" content={SEO.SupporterPage.description} />
        <meta property="og:title" content={SEO.SupporterPage.title} />
        <meta property="og:description" content={SEO.SupporterPage.description} />
        <meta property="og:image" content={SEO.SupporterPage.image} />
        <meta property="og:type" content={SEO.SupporterPage.type} />
        <meta name="twitter:title" content={SEO.SupporterPage.title} />
        <meta name="twitter:description" content={SEO.SupporterPage.description} />
        <meta name="twitter:image" content={SEO.SupporterPage.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <ArticleHeader
        title="Supporter"
        subtitle="贊助頁面"
        icon={IconLight}
      />
      <div className="px-5 sm:px-28 pb-20 mx-auto md:px-28 w-full xl:w-[1280px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 content-center pt-10">
          {supporterCfg.map((supporter: { name: string, description: string, image: string }) => (
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
          ))}
        </div>

        {/* <HorizontalLine className='sm:hidden' />
        <ContactSection className="py-16" /> */}
        {/* <HorizontalLine />
        <SubscribeSection className="py-16" />
        <HorizontalLine /> */}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const app = await initAdmin();
    const bucket = app.storage().bucket();

    // 取得SEO設定
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    // 取得文章內容
    const postFile = bucket.file(`WebsiteArticle/PrivacyPolicy.mdx`);
    const [exists] = await postFile.exists();


    // 取得文章內容
    const supporterCfg = bucket.file(`config/Supporter.json`);
    const supporterCfgContents = (await supporterCfg.download())[0].toString('utf8');
    const supporterConfig = JSON.parse(supporterCfgContents);

    if (!exists) {
      return { notFound: true };
    }

    const postFileContents = (await postFile.download())[0].toString('utf8');
    const { content, data } = matter(postFileContents);
    const mdxSource = await serialize(content);

    return {
      props: {
        initialPost: {
          source: mdxSource,
          frontMatter: data,
        },
        SEO: seoData,
        supporterCfg: supporterConfig
      },
    };
  } catch (error) {
    console.error('Error fetching article content or SEO/author data:', error);
    return { notFound: true };
  }
};

export default SupporterPage;
