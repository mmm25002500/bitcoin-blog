import ContactUS from "@/components/Card/ContactUS";
import CreateWallet from "@/components/Card/CreateWallet";
import Button from "@/components/Button/Button";
import illustationIcon from "@/icons/illustation.svg";
import cryptoWalletIconLight from "@/icons/crypto_wallet_light.svg";
import cryptoWalletIconDark from "@/icons/crypto_wallet_dark.svg";
import Post from "@/components/List/Post";
import Lable from "@/components/Label/Label";
import Tab from "@/components/Tab/Tab";
import Pagination from "@/components/Pagination/Pagination";
import Post2 from "@/components/List/Post2";

// example Photo
import authorPhoto from '@/icons/examplePhoto/author.png';
import postPhoto from '@/icons/examplePhoto/bg.png';
import Menu from "@/components/Menu/Menu";
import Author from "@/components/List/Author";
import CreateWallet2 from "@/components/Card/CreateWallet2";
import AboutUSNav from "@/components/Layout/AboutUSNav";
import Button2 from "@/components/Button/Button2";
import InputText from "@/components/Input/InputText";
import InputLable from "@/components/Input/InputLable";

const Home = () => {
  return (
    <>
      <InputText
        placeholder="文字內容"
        className="w-80"
      />

      <InputLable
        placeholder="文字內容"
        className=""
      />

      <Button
        onClick={() => console.log('click')}
        type="large"
      >這是一個按鈕</Button>
      <Button
        onClick={() => console.log('click')}
        type="medium"
      >這是一個按鈕</Button>
      <Button
        onClick={() => console.log('click')}
        type="small"
      >這是一個按鈕</Button>

      <br />

      <Button2
        onClick={() => console.log('click')}
        type="large"
      >這是一個按鈕</Button2>
      <Button2
        onClick={() => console.log('click')}
        type="medium"
      >這是一個按鈕</Button2>
      <Button2
        onClick={() => console.log('click')}
        type="small"
      >這是一個按鈕</Button2>

      <AboutUSNav />
      <CreateWallet2
        title="創建錢包"
        description="Create Wallet"
        photo_light={cryptoWalletIconLight}
        photo_dark={cryptoWalletIconDark}
      />

      <Author img={authorPhoto}>
        <Author.Name postCount={24}>Michael Robinson</Author.Name>
        <Author.Description>舉例來說，擁有自有白牌錢包的WaaS公司可以擁有完全的控制權和管理權，可以自主設計和開發錢包的功能和界面。這讓項目能夠提升品牌信任，並專注於展示自家的業務內容，而不受傳統錢包的限制。另一方面，串接KPI服務則可以選擇與第三方的KPI（Key Performance Indicator）服務進行整合，以提供更多功能和服務。這樣可以節省開發時間和成本，同時擁有廣泛的功能和服務選擇。
        </Author.Description>
      </Author>

      <Menu>
        <Menu.List title="什麼是區塊鏈技術">
          <Menu.SubList name="不同產業使用區塊鏈1" link="/post/1" />
          <Menu.SubList name="不同產業使用區塊鏈2" link="/post/2" />
        </Menu.List>
        <Menu.List title="什麼是區塊鏈技術2">
          <Menu.SubList name="不同產業使用區塊鏈3" link="/post/3" />
          <Menu.SubList name="不同產業使用區塊鏈4" link="/post/4" />
        </Menu.List>
      </Menu>

      <Pagination
        page={1}
        pageSize={10}
        link={`/page/`}
        className=""
      />
      <Tab
        className="gap-6"
        data={[
          {
            name: 'Tab1',
            link: 'tab1'
          },
          {
            name: 'Tab2',
            link: 'tab2'
          },
          {
            name: 'Tab3',
            link: 'tab3'
          }
        ]}
      />
      <Lable text="標籤" />

      <Post
        title="玩而非賺錢？區塊鏈遊戲與賺錢遊戲的新思考"
        description="在區塊鏈遊戲和賺錢遊戲（P2E）平台飛速發展的世界中，很容易迷失在追求利潤和積累代幣的浪潮中。但我們是否忘記了遊戲的本質 - 那就是娛樂呢？今天，我們深入探討一個古老的問題：Play-to-Earn 概念中哪一部分更關鍵 - 玩還是賺？"
        tags={['NFT', 'BTC', 'DeFi', 'L2']}
        img={postPhoto}
        authorData={{
          name: 'John Carter',
          img: authorPhoto
        }}
        date={1706373630844}
      />

      <Post
        title="玩而非賺錢？區塊鏈遊戲與賺錢遊戲的新思考"
        description="在區塊鏈遊戲和賺錢遊戲（P2E）平台飛速發展的世界中，很容易迷失在追求利潤和積累代幣的浪潮中。但我們是否忘記了遊戲的本質 - 那就是娛樂呢？今天，我們深入探討一個古老的問題：Play-to-Earn 概念中哪一部分更關鍵 - 玩還是賺？"
        tags={['TON', 'Layer 1', 'Telegram']}
        img={postPhoto}
        date={1706373630844}
      />

      <Post2
        title="玩而非賺錢？區塊鏈遊戲與賺錢遊戲的新思考"
        description="在區塊鏈遊戲和賺錢遊戲（P2E）平台飛速發展的世界中，很容易迷失在追求利潤和積累代幣的浪潮中。但我們是否忘記了遊戲的本質 - 那就是娛樂呢？今天，我們深入探討一個古老的問題：Play-to-Earn 概念中哪一部分更關鍵 - 玩還是賺？"
        tags={['NFT', 'BTC', 'DeFi', 'L2']}
        img={postPhoto}
        authorData={{
          name: 'John Carter',
          img: authorPhoto
        }}
        date={1706373630844}
      />

      <ContactUS
        title="CONTACT US"
        description="聯絡我們"
        photo_light={illustationIcon}
      />

      <CreateWallet
        title="創建錢包"
        description="Create Wallet"
        photo_light={cryptoWalletIconLight}
        photo_dark={cryptoWalletIconDark}
      />
    </>
  )
}

export default Home;
