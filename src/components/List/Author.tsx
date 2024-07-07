import { LawAuthorData } from "@/types/List/Author";
import Avater from "../User/Avater";

const Author = (props: LawAuthorData) => {

  return (
    <div className={`flex gap-10 px-6 sm:px-0 my-5 pt-6 pb-3 sm:pb-6 bg-white border-neutral-200 dark:bg-primary-black-300 dark:border-neutral-800 ${props.idx != 0 ? 'border-t-[1px]' : ''}`}>
      <div className="flex-none">
        <Avater
          src={props.image}
          className=""
        />
      </div>
      <div className="w-full">
        <div className="flex flex-wrap gap-1">
          {/* 名字 */}
          <div className="flex-none font-semibold text-base leading-6 text-neutral-black dark:text-neutral-white sm:font-semibold sm:text-2xl sm:leading-9">
            {props.fullname}
          </div>
          <div className="flex-grow"></div>

          {/* 文章數量 */}
          <div className="flex-none font-medium text-sm leading-5 text-neutral-800 dark:text-neutral-200 sm:text-base sm:leading-[26px]">
            {props.posts} Post
          </div>
        </div>

        <div className="flex flex-col">
          {/* 描述 */}
          <div className="flex-none col-span-2 sm:col-span-1 mt-3 font-normal text-sm leading-6 text-neutral-900 dark:text-neutral-300 overflow-hidden">
            <p className='line-clamp-2'>
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
