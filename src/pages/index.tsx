import ButtonSection from "@/components/HomePage/ButtonSection";
import ContactSection from "@/components/HomePage/ContactSection";
import SubscribeSection from "@/components/HomePage/SubscribeSection";

const HorizontalLine = (props: {className?: string}) => {
  return (
    <hr className={`border-neutral-200 dark:border-neutral-800 ${props.className}`} />
  )
}

const Home = () => {

  return (
    <>
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
