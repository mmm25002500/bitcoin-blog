import React, { useState } from 'react';
import Icon from '../Icon';
import { InputData } from '@/types/Input/Input';
import clearIcon from '@/icons/clear.svg';
import Image from 'next/image';

const InputText = (props: InputData) => {
  const [content, setContent] = useState(props.text);

  return (
    <div className={`
        rounded-full
        border-0
        relative flex items-center
        text-leftÍ
        focus:border-[1px]
        hover:border-[1px]
        focus:outline-none
        hover:outline-none

        /* Light Mode */
        text-neutral-700
        focus:border-neutral-600
        hover:border-neutral-600
        focus:bg-neutral-tone-700
        ${props.className ? "border-[1px] border-black" : ""}

        /* Dark Mode */
        dark:bg-neutral-900
        ${props.className ? "dark:text-white" : "dark:text-neutral-300"}

        ${props.className}
    `}>
    {/* 圖標 */}
    {
      props.frontIcon &&
      <div className="flex-none ml-3">
        <Image
          src={props.icon}
          className='dark:invert-0 invert'
          alt={''}
        />
      </div>
    }

    {/* 標籤 */}
    <div className='flex-grow flex flex-wrap items-center gap-2'>
      {/* 輸入框 */}
      <input
        type="text"
        placeholder={props.placeholder}
        value={content}
          onChange={(e) => {
            setContent(e.target.value)
            props.onChange(e)
          }}
        onKeyPress={(e) => { if (e.key === 'Enter') props.onClick(); }}
        className={`flex-grow outline-none p-2.5 dark:bg-neutral-900 rounded-full`}
      />
    </div>


      {/* 清除按鈕 */}
      {content && (
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
      )}

      {/* 按鈕 */}
      <div className='flex-none'>
        <button
          onClick={props.onClick}
          className="
          rounded-full py-[9px] px-3 mr-2
          bg-primary-black-300
          text-sm font-medium
          hover:bg-gray-700
          focus:outline-none
          dark:bg-white
        ">
          <Image
            src={props.icon}
            className='dark:invert-0 invert'
            alt={''}
          />
        </button>
      </div>
    </div>
  );
}

export default InputText;
