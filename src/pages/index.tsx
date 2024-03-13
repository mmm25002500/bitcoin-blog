import ButtonSection from "@/components/HomePage/ButtonSection";
import HorizontalLine from "@/components/HorizontalLine";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import ContactSection from "@/components/Page/ContactSection";
import SubscribeSection from "@/components/Page/SubscribeSection";

const Home = () => {

  return (
    <>
      <Header></Header>
      <Navbar />
      <div className="mx-auto sm:px-16">
        <ButtonSection classname="py-8 px-8 sm:px-0" />
        <HorizontalLine />
        <ContactSection className="py-16 sm:px-5" />
        <HorizontalLine />
        <SubscribeSection className="py-16" />
        <HorizontalLine />
      </div>
    </>
  )
}

export default Home;
