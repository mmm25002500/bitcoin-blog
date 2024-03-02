import ButtonCard from "../Card/ButtonCard";
import { ContactSection } from "@/types/HomePage/ContactSection";
import illustration from "@/icons/illustation.svg";
import SponsorUS from "@/icons/illustation/SponsorUS.svg";

const ContactSection = (props: ContactSection) => {
  return (
    <section className={`flex flex-wrap justify-center sm:grid sm:grid-cols-2 gap-5 ${props.className}`}>
      <ButtonCard
        title="CONTACT US"
        description="聯絡我們"
        photo_light={illustration}
        onClick={() => console.log("Contact US")}
      />
      <ButtonCard
        title="SPONSOR US"
        description="贊助我們"
        photo_light={SponsorUS}
        onClick={() => console.log("Sponsor US")}
      />
    </section>
  );
}

export default ContactSection;
