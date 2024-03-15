import HorizontalLine from "@/components/HorizontalLine";
import Icon from "@/components/Icon";
import Header from "@/components/Layout/Header";
import Navbar from "@/components/Layout/Navbar";
import NotFoundCat from "@/icons/not_found_cat.svg";
import NotFoundCatDark from "@/icons/not_found_cat_dark.svg";

const NotFoundPage = () => {
  return (
    <>
      <div className="sm:hidden">
        <Header></Header>
      </div>
      <Navbar />
      <HorizontalLine />
      <div className="mx-auto sm:px-28 py-20">
        <div className="flex place-content-center">
          <Icon
            icon_light={NotFoundCatDark}
            icon_dark={NotFoundCat}
            className="h-80"
          />
        </div>
        <div className="pt-5">
          <p className="font-bold text-[32px] leading-[48px] sm:text-5xl sm:leading-[72px] text-neutral-black dark:text-neutral-white text-center">404</p>
          <p className="font-medium text-base leading-[26px] sm:text-xl sm:leading-[30px] text-neutral-black dark:text-neutral-200 text-center">Page Not Found</p>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage;
