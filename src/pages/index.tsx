import SearchBtn from "@/components/button/SearchBtn";
import Button from "@/components/button/Button";
import Themes from "@/components/Layout/Themes";

const Home = () => {
  return (
    <>
      <h1 className="text-red-500 dark:text-green-400">比特幣中文網站</h1>
      <Button
        type="large"
        theme="primary"
        className="border-red-800 "
      ></Button>
      <Themes></Themes>

      <SearchBtn></SearchBtn>
    </>
  )
}

export default Home;
