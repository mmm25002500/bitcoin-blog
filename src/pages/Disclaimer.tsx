import HorizontalLine from '@/components/HorizontalLine';
import ArticleLayout from '@/components/Layout/Article/ArticleLayout';
import ArticleHeader from '@/components/Layout/Article/ArticleHeader';
import Header from '@/components/Layout/Header';
import Navbar from '@/components/Layout/Navbar';
import MD from '@/components/MD'
import ContactSection from '@/components/Page/ContactSection';
import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from '@/icons/illustation/Disclaimer.svg';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { initAdmin } from 'lib/firebaseAdmin';

const DisclaimerPage = ({ SEO }: { SEO?: any }) => {
  const markdown = " \
  網站的所有內容旨在提供一般性信息和觀點，不應視為投資建議或其他形式的專業意見。 \n\n \
  網站不保證網站上提供的信息的準確性、完整性、及時性或可靠性，也不對因使用或依賴此等信息所引致的任何損失或損害負責。任何投資或其他決策應基於經過詳細研究和諮詢專業人士後做出，並自行承擔風險。 本網站可能包含第三方網站的連結，但我們不對這些網站的內容、政策或做法負責。使用這些連結時，請查看相關網站的使用條款和隱私政策。 \n\n \
  網站保留隨時更改或更新網站的權利，包括但不限於刪除、修改或更新任何信息、功能或內容。我們不對因網站不可用或無法訪問所引起的任何損失或損害負責。 如果您對我們的免責聲明有任何疑問或需要進一步的信息，請聯繫我們。 \n \
  "

  return (
    <>
      <Head>
        <title>{SEO.Disclaimer.title}</title>
        <meta name="description" content={SEO.Disclaimer.description} />
        <meta property="og:title" content={SEO.Disclaimer.title} />
        <meta property="og:description" content={SEO.Disclaimer.description} />
        <meta property="og:image" content={SEO.Disclaimer.image} />
        <meta property="og:type" content={SEO.Disclaimer.type} />
        <meta name="twitter:title" content={SEO.Disclaimer.title} />
        <meta name="twitter:description" content={SEO.Disclaimer.description} />
        <meta name="twitter:image" content={SEO.Disclaimer.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <ArticleHeader
        title="Disclaimer"
        subtitle="免責聲明"
        icon={IconLight}
      />
      <div className="mx-auto px-5 sm:px-28">
        <ArticleLayout className='pt-10'>
          <MD>{markdown}</MD>
        </ArticleLayout>
        <HorizontalLine className='sm:hidden' />
        <ContactSection className="py-16" />
        <HorizontalLine />
        <SubscribeSection className="py-16" />
        <HorizontalLine />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // 獲取SEO配置
    const app = await initAdmin();
    const bucket = app.storage().bucket();
    const seoFile = bucket.file('config/SEO.json');
    const seoFileContents = (await seoFile.download())[0].toString('utf8');
    const seoData = JSON.parse(seoFileContents);

    return {
      props: {
        SEO: seoData,
      },
    };
  } catch (error) {
    console.error('Error fetching article content or SEO/author data:', error);
    return { notFound: true };
  }
};

export default DisclaimerPage;
