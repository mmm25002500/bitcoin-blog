import CreateButton from "@/components/Card/CreateButton";
import Bitcoin_V2 from "@/icons/HomePage/biitcoin_v2.svg";
import CryptoWallet from "@/icons/HomePage/crypto_wallet.svg";
import BicNews from "@/icons/HomePage/bic-news.svg";
import blockchain from "@/icons/HomePage/blockchain.svg";
import coffee from "@/icons/HomePage/coffee.svg";
import BuyBic from "@/icons/HomePage/buy_bic.svg";
import Mining from "@/icons/HomePage/mining.svg";
import Social from "@/icons/HomePage/social.svg";
import UseBTC from "@/icons/HomePage/use_btc.svg";
import { ButtonSectionProps } from "@/types/HomePage/ButtonSection";
import CreateButton2 from "../Card/CreateButton2";

const ButtonSection = (props: ButtonSectionProps) => {
  return (
    <>
      <div className={`sm:flex sm:gap-4 ${props.classname}`}>
        <div className="mb-3 md:mb-0">
          <CreateButton2
            title="關於比特幣"
            description="About BTC"
            photo_light={Bitcoin_V2}
            onClick={() => console.log("About BTC")}
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-3 sm:gap-4 w-full">
          <CreateButton
            title="創建錢包"
            description="CreateWallet"
            photo_light={CryptoWallet}
            onClick={() => console.log("CreateWallet")}
          />
          <CreateButton
            title="購買比特幣"
            description="Purchase BTC"
            photo_light={BuyBic}
            onClick={() => console.log("Purchase BTC")}
          />
          <CreateButton
            title="比特幣挖礦"
            description="BTC Mining"
            photo_light={Mining}
            onClick={() => console.log("BTC Mining")}
          />
          <CreateButton
            title="使用比特幣"
            description="Used BTC"
            photo_light={UseBTC}
            onClick={() => console.log("Used BTC")}
          />
          <CreateButton
            title="加入社群"
            description="Join Community"
            photo_light={Social}
            onClick={() => console.log("Join Community")}
          />
          <CreateButton
            title="支持我們"
            description="Support us"
            photo_light={coffee}
            onClick={() => console.log("Support us")}
          />
          <CreateButton
            title="更多比特幣資訊"
            description="About BTC"
            photo_light={BicNews}
            onClick={() => console.log("About BTC")}
          />
          <CreateButton
            title="其他區塊鏈資訊"
            description="About Blockchain"
            photo_light={blockchain}
            onClick={() => console.log("About Blockchain")}
          />
        </div>
      </div>
    </>
  );
}

export default ButtonSection;
