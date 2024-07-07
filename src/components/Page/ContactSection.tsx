import ButtonCard from "../Card/ButtonCard";
import { ContactSection } from "@/types/HomePage/ContactSection";
import illustration from "@/icons/illustation.svg";
import SponsorUS from "@/icons/illustation/SponsorUS.svg";
import { useRouter } from "next/router";

const ContactSection = (props: ContactSection) => {
  const router = useRouter();

  return (
    <section className={`flex flex-wrap justify-center sm:grid sm:grid-cols-2 gap-5 ${props.className}`}>
      <ButtonCard
        title="CONTACT US"
        description="聯絡我們"
        photo_light={illustration}
        onClick={() => router.push("/")}
      />
      <ButtonCard
        title="SPONSOR US"
        description="贊助我們"
        photo_light={SponsorUS}
        onClick={() => router.push("/")}
      />
    </section>
  );
}

export default ContactSection;
