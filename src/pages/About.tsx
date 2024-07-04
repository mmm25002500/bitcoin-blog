import HorizontalLine from '@/components/HorizontalLine';
import ArticalLayout from '@/components/Layout/Artical/AriticalLayout';
import ArticalHeader from '@/components/Layout/Artical/ArticalHeader';
import Header from '@/components/Layout/Header';
import Navbar from '@/components/Layout/Navbar';
import MD from '@/components/MD'
import ContactSection from '@/components/Page/ContactSection';
import SubscribeSection from '@/components/Page/SubscribeSection';
import IconLight from '@/icons/illustation/about us.svg';

const AboutPage = () => {
  const markdown = " \
  比特幣是一個共識網絡，是一種支付系統並且完全數位化的一種貨幣．是第一個由用戶建立並維護的點對點交易支付網路，去中心化並且不依賴於中央機構或中介人驗證。 \n\n \
  ## 關於 比特幣 ( Bitcoin ) \n \
  比特幣是一個共識網絡，是一種支付系統並且完全數位化的一種貨幣．是第一個由用戶建立並維護的點對點交易支付網路，去中心化並且不依賴於中央機構或中介人驗證．比特幣很像在網路上的現金，也可以被視為一種三式簿記系統。 \n\n \
  更多關於比特幣的發明與技術，可參閱更多位於 Bitcoin.org.tw 站內的 比特幣 及相關文章。 \n \
  ## 關於 Bitcoin.zh / Bitcoin.org.tw \n \
  Bitcoin.org.tw 是一個以 Bitcoin 比特幣 中文所使用的網域名稱，   \n \
  它由比特幣中文使用者與其他的社群成員所註冊，現在仍由他們管理，  \n \
  @Bitcoin.zh @Bitcoinzh @Bitcoin_zh   \n \
  對它亦有投入。  \n\n \
  Bitcoin.org.tw 並非一個官方網站。  \n \
  就像沒人擁有 Email 技術一樣，也沒有人擁有比特幣網路。  \n \
  因此，沒有人可以用比特幣中文官方代表的身份來發言。 \
  "

  return (
    <>
      <div className="sm:hidden">
        <Header />
      </div>
      <Navbar />
      <ArticalHeader
        title="ABOUT US"
        subtitle="關於我們"
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

export default AboutPage;
