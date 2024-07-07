import HorizontalLine from '@/components/HorizontalLine';
import ArticalLayout from '@/components/Layout/Artical/AriticalLayout';
import ArticalHeader from '@/components/Layout/Artical/ArticalHeader';
import Header from '@/components/Layout/Header';
import Navbar from '@/components/Layout/Navbar';
import MD from '@/components/MD'
import ContactSection from '@/components/Page/ContactSection';
import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from '@/icons/illustation/Privacy Policy.svg';
import Head from 'next/head';
import SEO from '@/config/SEO.json';

const PrivacyPolicyPage = () => {
  const markdown = " \
  我們非常重視您的隱私。我們的網站不收集任何有關您的個人信息，如姓名、地址、電子郵件地址或電話號碼等。我們不會通過 cookie 或其他技術跟踪您的網絡活動。 \n\n \
  儘管我們不收集任何個人信息，但我們可能會通過網站日誌收集一些匿名數據，例如您的瀏覽器類型和操作系統等信息。這些信息只用於統計和分析我們網站的流量，以及提高網站的性能和用戶體驗。 \n\n \
  請注意，我們的網站可能包含第三方鏈接，這些鏈接指向其他網站，我們無法控制這些網站的隱私政策。因此，我們建議您在訪問這些網站之前查看其隱私政策。\n\n \
  如果您有任何關於我們的隱私政策的問題，請聯繫我們。 \n\n \
  "

  return (
    <>
      <Head>
        <title>{SEO.PrivacyPolicy.title}</title>
        <meta name="description" content={SEO.PrivacyPolicy.description} />
        <meta property="og:title" content={SEO.PrivacyPolicy.title} />
        <meta property="og:description" content={SEO.PrivacyPolicy.description} />
        <meta property="og:image" content={SEO.PrivacyPolicy.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.PrivacyPolicy.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.PrivacyPolicy.title} />
        <meta name="twitter:description" content={SEO.PrivacyPolicy.description} />
        <meta name="twitter:image" content={SEO.PrivacyPolicy.image} />
      </Head>

      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <ArticalHeader
        title="Privacy Policy"
        subtitle="隱私政策聲明"
        icon={IconLight}
      />
      <div className="mx-auto px-5 sm:px-28">
        <ArticalLayout className='pt-10'>
          <MD>{markdown}</MD>
        </ArticalLayout>
        <HorizontalLine className='sm:hidden' />
        <ContactSection className="py-16" />
        <HorizontalLine />
        <SubscribeSection className="py-16" />
        <HorizontalLine />
      </div>
    </>
  )
}

export default PrivacyPolicyPage;
