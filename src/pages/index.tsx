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
import Post2 from "@/components/List/Post2";

// example Photo
import authorPhoto from '@/icons/examplePhoto/author.png';
import postPhoto from '@/icons/examplePhoto/bg.png';
import Menu from "@/components/Menu/Menu";
{
  [
    {
      "title": "什麼是區塊鏈技術",
      "subMenu": [
        {
          "name": "不同產業使用區塊鏈1",
          "link": "/blockchain1"
        },
        {
          "name": "不同產業使用區塊鏈2",
          "link": "/blockchain2"
        }
      ]
    },
    {
      "title": "什麼是區塊鏈技術2",
      "subMenu": [
        {
          "name": "不同產業使用區塊鏈3",
          "link": "/blockchain3"
        },
        {
          "name": "不同產業使用區塊鏈4",
          "link": "/blockchain4"
        }
      ]
    }
  ]
}
const Home = () => {
  return (
    <>
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
