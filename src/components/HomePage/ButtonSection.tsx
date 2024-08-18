import CreateButton from "@/components/Card/CreateButton";
import { ButtonSectionProps } from "@/types/HomePage/ButtonSection";
import CreateButton2 from "../Card/CreateButton2";
import { useRouter } from "next/router";

// Light Mode
import Bitcoin_V2 from "@/icons/HomePage/biitcoin_v2.svg";
import CryptoWallet from "@/icons/HomePage/crypto_wallet.svg";
import BicNews from "@/icons/HomePage/bic-news.svg";
import blockchain from "@/icons/HomePage/blockchain.svg";
import coffee from "@/icons/HomePage/coffee.svg";
import BuyBic from "@/icons/HomePage/buy_bic.svg";
import Mining from "@/icons/HomePage/mining.svg";
import Social from "@/icons/HomePage/social.svg";
import UseBTC from "@/icons/HomePage/use_btc.svg";

// Dark Mode
import Bitcoin_V2_Dark from "@/icons/HomePage/biitcoin_v2_dark.svg";
import CryptoWallet_Dark from "@/icons/HomePage/crypto_wallet_dark.svg";
import BicNews_Dark from "@/icons/HomePage/bic-news_dark.svg";
import blockchain_Dark from "@/icons/HomePage/blockchain_dark.svg";
import coffee_Dark from "@/icons/HomePage/coffee_dark.svg";
import BuyBic_Dark from "@/icons/HomePage/buy_bic_dark.svg";
import Mining_Dark from "@/icons/HomePage/mining_dark.svg";
import Social_Dark from "@/icons/HomePage/social_dark.svg";
import UseBTC_Dark from "@/icons/HomePage/use_btc_dark.svg";


const ButtonSection = (props: ButtonSectionProps) => {
  const router = useRouter();

  return (
    <>
      <div className={`sm:flex sm:gap-4 ${props.classname}`}>
        {/* <div className="mb-3 md:mb-0">
          <CreateButton2
            title="關於比特幣"
            description="About BTC"
            photo_dark={Bitcoin_V2}
            photo_light={Bitcoin_V2_Dark}
            onClick={() => router.push("/")}
          />
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-3 w-full">
          <CreateButton
            title="關於比特幣"
            description="About BTC"
            photo_dark={Bitcoin_V2}
            photo_light={Bitcoin_V2_Dark}
            onClick={() => router.push("/Post/編輯室/AboutBTC")}
          />
          <CreateButton
            title="創建錢包"
            description="CreateWallet"
            photo_dark={CryptoWallet}
            photo_light={CryptoWallet_Dark}
            onClick={() => router.push("/")}
          />
          <CreateButton
            title="購買比特幣"
            description="Purchase BTC"
            photo_dark={BuyBic}
            photo_light={BuyBic_Dark}
            onClick={() => router.push("/")}
          />
          <CreateButton
            title="比特幣挖礦"
            description="BTC Mining"
            photo_dark={Mining}
            photo_light={Mining_Dark}
            onClick={() => router.push("/")}
          />
          <CreateButton
            title="使用比特幣"
            description="Used BTC"
            photo_dark={UseBTC}
            photo_light={UseBTC_Dark}
            onClick={() => router.push("/")}
          />
          <CreateButton
            title="加入社群"
            description="Join Community"
            photo_dark={Social}
            photo_light={Social_Dark}
            onClick={() => router.push("/")}
          />
          <CreateButton
            title="支持我們"
            description="Support us"
            photo_dark={coffee}
            photo_light={coffee_Dark}
            onClick={() => router.push("/Post/編輯室/SupportUS")}
          />
          <CreateButton
            title="更多比特幣資訊"
            description="About BTC"
            photo_dark={BicNews}
            photo_light={BicNews_Dark}
            onClick={() => router.push("/MoreInfo/WhatIsBTC")}
          />
          <CreateButton
            title="其他區塊鏈資訊"
            description="About Blockchain"
            photo_dark={blockchain}
            photo_light={blockchain_Dark}
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </>
  );
}

export default ButtonSection;
