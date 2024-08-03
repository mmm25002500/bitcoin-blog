import { useState } from 'react';
import { useRouter } from 'next/router';
import { MoreInfoSidebarProps } from '@/types/Sidebar/MoreInfoSidebar';
import { categoryData } from '@/types/MoreInfo/MoreInfo';
import Image from 'next/image';
import DownIcon from '@/icons/down.svg';

const Sidebar = (props: MoreInfoSidebarProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const router = useRouter();

  // 控制展開和收起
  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={`border-t-[1px] border-[#E7E6F2] dark:border-neutral-800 ${props.className}`}>
      {props.data.map((category: categoryData, index: number) => (
        <div key={index} className="border-b-[1px] border-[#E7E6F2] dark:border-neutral-800 p-2">

          {/* 類別 */}
          <button
            className="w-full text-left font-medium text-sm leading-[22px] px-3 py-2 cursor-pointer flex justify-between items-center"
            onClick={() => handleToggle(index)}
          >
            {category.title}

            {/* 箭頭 */}
            <Image
              src={DownIcon}
              alt="Icon Dark"
              className={`transition-transform duration-200 dark:invert ${expandedIndex === index ? 'transform rotate-180' : ''}`}
            ></Image>
          </button>

          {/* 文章 */}
          {expandedIndex === index && (
            <ul className="pl-3">
              {category.post.map((post, postIndex) => (
                <li key={postIndex} className={`py-2 ${props.path === `${post.filename}` ? 'bg-neutral-100 text-neutral-black dark:bg-neutral-900 dark:text-neutral-white rounded-[4px]' : 'text-neutral-800 dark:text-neutral-300'}`}>
                  <button
                    onClick={
                      () => {
                        props.onChange(post.filename);
                        router.push(`/MoreInfo/${post.filename}`);
                      }}
                  >
                    <a className={`pl-4 font-normal text-sm leading-6`}>
                      {post.title}
                    </a>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
