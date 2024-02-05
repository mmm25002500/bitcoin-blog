import ContactUS from "@/components/Card/ContactUS";
import CreateWallet from "@/components/Card/CreateWallet";
import Button from "@/components/Button/Button";
import illustationIcon from "@/icons/illustation.svg";
import cryptoWalletIconLight from "@/icons/crypto_wallet_light.svg";
import cryptoWalletIconDark from "@/icons/crypto_wallet_dark.svg";
import Input from "@/components/Input/Input";
import Post from "@/components/List/Post";
import Lable from "@/components/Label/Label";
import Tab from "@/components/Tab/Tab";
import Pagination from "@/components/Pagination/Pagination";

const Home = () => {
  return (
    <>
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
        tags={['NFT', 'BTC', 'DeFi', 'Layer 2']}
        img=""
        authorData={{
          name: 'John Carter',
          img: ''
        }}
        date={1706373630844}
      />

      <Post
        title="標題標題標題標題"
        description="描述描述描述描述描述"
        tags={['TON', 'Layer 1', 'Telegram']}
        img=""
        authorData={{
          name: 'John Carter',
          img: ''
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

      <Input
        placeholder="文字內容"
        className=""
      />
      <Button
        type="large"
        theme="primary"
        className=""
      ></Button>
      <Button
        type="medium"
        theme="primary"
        className=" "
      ></Button>
      <Button
        type="small"
        theme="primary"
        className=" "
      ></Button>
      <Button
        type="large"
        theme="secondary"
        className=" "
      ></Button>
      <Button
        type="medium"
        theme="secondary"
        className=" "
      ></Button>
      <Button
        type="small"
        theme="secondary"
        className=" "
      ></Button>
      <Button
        type="large"
        theme="normal"
        className=" "
      ></Button>
      <Button
        type="medium"
        theme="normal"
        className=" "
      ></Button>
      <Button
        type="small"
        theme="normal"
        className=" "
      ></Button>
    </>
  )
}

export default Home;
