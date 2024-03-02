import ContactSection from "@/components/HomePage/ContactSection";
import SubscribeSection from "@/components/HomePage/SubscribeSection";

const Home = () => {

  return (
    <>
      <hr className="sm:w-[92%] mx-auto border-neutral-200 dark:border-neutral-800" />
      <ContactSection className="py-16 sm:px-16"/>
      <hr className="sm:w-[92%] mx-auto border-neutral-200 dark:border-neutral-800" />
      <SubscribeSection className="py-16" />
      <hr className="border-neutral-200 dark:border-neutral-800" />
    </>
  )
}

export default Home;
