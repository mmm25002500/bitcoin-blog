import { AuthorDescriptionProps, AuthorNameProps, AuthorProps } from "@/types/List/Author";
import Icon from "../Icon";

const Name = (props: AuthorNameProps) => {
  return (
    <div className={`flex ${props.className}`}>
      <p className="text-base sm:text-2xl text-neutral-black dark:text-white grow">
        {props.children}
      </p>
      <div className="mr-3 text-sm sm:text-base text-neutral-200 dark:text-neutral-800">
        {props.postCount} Post
      </div>
    </div>
  )
}

const Description = (props: AuthorDescriptionProps) => {
  return (
    <div className={`mt-3 text-sm text-neutral-900 dark:text-neutral-300 overflow-hidden ${props.className}`}>
      <p className="line-clamp-2">
        {props.children}
      </p>
    </div>
  )
}

const Author = (props: AuthorProps) => {
  return (
    <div className={`flex justify-between items-center px-3 sm:px-0 gap-3 sm:gap-8 ${props.className}`}>
      <Icon
        className={`rounded-full w-16 h-16 sm:w-24 sm:h-24 ${props.className}`}
        icon_light={props.img}
      />
      <div>
        {props.children}
      </div>
    </div>
  );
}

Author.Name = Name;
Author.Description = Description;
export default Author;
