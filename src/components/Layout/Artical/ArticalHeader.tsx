import Icon from "@/components/Icon";
import { ArticalHeaderProps } from "@/types/Layout/Artical/ArticalHeader";
import IconLight from '@/icons/illustation/about us.svg';

const ArticalHeader = (props: ArticalHeaderProps) => {
  return (
    <div className="pl-7 sm:px-28 bg-primary-black-500 dark:bg-neutral-900 flex">
      <div className="flex-none place-self-center">
        <p className="font-medium text-2xl leading-9">{props.title}</p>
        <p className="font-bold text-[32px] leading-[48px]">{props.subtitle}</p>
      </div>
      <div className="grow"></div>
      <div className="flex-nonw">
        <Icon
          icon_light={props.icon}
          className="h-full w-auto"
        />
      </div>
    </div>
  );
}

export default ArticalHeader;
