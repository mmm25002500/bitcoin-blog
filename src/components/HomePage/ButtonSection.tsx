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
            title="關於"
            description="About Bitcoin"
            photo_dark={Bitcoin_V2}
            photo_light={Bitcoin_V2_Dark}
            onClick={() => router.push("/Post/編輯室/about")}
          />
          <CreateButton
            title="錢包"
            description="Wallet"
            photo_dark={CryptoWallet}
            photo_light={CryptoWallet_Dark}
            onClick={() => router.push("/Post/編輯室/Wallet")}
          />
          <CreateButton
            title="購買 比特幣"
            description="Purchase bitcoin"
            photo_dark={BuyBic}
            photo_light={BuyBic_Dark}
            onClick={() => router.push("/Post/編輯室/Buy")}
          />
          <CreateButton
            title="比特幣 挖礦"
            description="Bitcoin Mining"
            photo_dark={Mining}
            photo_light={Mining_Dark}
            onClick={() => router.push("/Post/編輯室/Mining")}
          />
          <CreateButton
            title="使用"
            description="Use bitcoin"
            photo_dark={UseBTC}
            photo_light={UseBTC_Dark}
            onClick={() => router.push("/Post/編輯室/Use")}
          />
          <CreateButton
            title="加入社群"
            description="Join Bitcoin"
            photo_dark={Social}
            photo_light={Social_Dark}
            onClick={() => router.push("/Post/編輯室/Join")}
          />
          <CreateButton
            title="支持我們"
            description="Support us"
            photo_dark={coffee}
            photo_light={coffee_Dark}
            onClick={() => router.push("/Post/編輯室/Support")}
          />
          <CreateButton
            title="比特幣 更多資訊"
            description="more BTC"
            photo_dark={BicNews}
            photo_light={BicNews_Dark}
            onClick={() => router.push("/MoreInfo/WhatIsBTC")}
          />
          <CreateButton
            title="其他新聞資訊"
            description="More info & news"
            photo_dark={blockchain}
            photo_light={blockchain_Dark}
            onClick={() => router.push("/Tag/News/all")}
          />
        </div>
      </div>
    </>
  );
}

export default ButtonSection;
