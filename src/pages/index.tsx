import ContactUS from "@/components/Card/ContactUS";
import CreateWallet from "@/components/Card/CreateWallet";
import Button from "@/components/button/Button";
import illustationIcon from "@/icons/illustation.svg";
import cryptoWalletIconLight from "@/icons/crypto_wallet_light.svg";
import cryptoWalletIconDark from "@/icons/crypto_wallet_dark.svg";

const Home = () => {
  return (
    <>
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
