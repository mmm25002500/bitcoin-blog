import Icon from "../Icon";
import AboutUSIcon from "@/icons/illustation/about us.svg";

const AboutUSNav = () => {
  return (
    <div className="flex w-full h-[200px] dark:bg-neutral-900 items-center">
      <div className="font-medium items-center ml-3 sm:ml-24 md:ml-40 lg:ml-60 grow">
        <p className="text-base sm:text-2xl">ABOUT US</p>
        <p className="text-xl sm:text-[32px]">關於我們</p>
      </div>
      <Icon
        className="w-[192px] sm:w-[320px] sm:mr-24 md:mr-40 lg:mr-60"
        icon_light={AboutUSIcon}
      />
    </div>
  );
}

export default AboutUSNav;
