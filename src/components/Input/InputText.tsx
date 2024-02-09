import React, { useState } from 'react';
import Icon from '../Icon';
import SearchBtn from '@/icons/SearchBtn.svg';
import { InputData } from '@/types/Input/Input';
import clearIcon from '@/icons/clear.svg';

const InputText = (props: InputData) => {
  const [content, setContent] = useState('');

  return (
    <div className={`
        rounded-full
        border-0
        relative flex items-center
        focus:border-[1px]
        hover:border-[1px]
        focus:outline-none
        hover:outline-none

        /* Light Mode */
        text-neutral-700
        focus:border-neutral-600
        hover:border-neutral-600
        focus:bg-neutral-tone-700
        ${content ? "border-[1px] border-black" : ""}

        /* Dark Mode */
        dark:bg-neutral-900
        ${content ? "dark:text-white" : "dark:text-neutral-300"}

        ${props.className}
    `}>
      {/* 圖標容器 */}
      <div className="flex-none ml-3">
        <Icon
          icon_light={SearchBtn}
          className='dark:invert'
        /> {/* 渲染圖標 */}
      </div>

      {/* 輸入框 */}
      <div className='grow'>
        <input
          type="text"
          placeholder={props.placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`flex-1 outline-none p-2.5 dark:bg-neutral-900`}
        />
      </div>

      {/* 刪除 */}
      <div className='flex-none'>
        <button
          onClick={() => setContent('')}
          className="
          rounded-full py-[9px] px-3
          text-sm font-medium
          text-black
          focus:outline-none
          dark:text-white
        ">
          <Icon
            icon_light={clearIcon}
            className='dark:invert'
          />
        </button>
      </div>

      {/* 按鈕 */}
      <div className='flex-none'>
        <button className="
        rounded-full py-[9px] px-3 mr-2
        text-sm font-medium
        bg-black text-white
        hover:bg-gray-700
        focus:outline-none
        dark:bg-white dark:text-black
      ">
          訂閱
        </button>
      </div>
    </div>
  );
}

export default InputText;
