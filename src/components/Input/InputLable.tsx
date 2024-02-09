import React, { useState } from 'react';
import Icon from '../Icon';
import SearchBtn from '@/icons/searchBtn.svg';
import { InputData } from '@/types/Input/Input';
import clearIcon from '@/icons/clear.svg';
import Label from '../Label/Label';

const InputLabel = (props: InputData) => {
  const [contentTemp, setContentTemp] = useState('');
  const [content, setContent] = useState<string[]>([]);

  const addContent = () => {
    if (contentTemp) {
      setContent([...content, contentTemp]);
      setContentTemp('');
    }
  };

  const removeContent = (index: number) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

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
        ${content.length > 0 ? "border-[1px] border-black" : ""}

        /* Dark Mode */
        dark:bg-neutral-900
        ${content.length > 0 ? "dark:text-white" : "dark:text-neutral-300"}

        ${props.className}
    `}>
      {/* 圖標 */}
      <div className="flex-none ml-3">
        <Icon
          icon_light={SearchBtn}
          className='dark:invert'
        />
      </div>

      {/* 標籤 */}
      <div className='flex-grow flex flex-wrap items-center'>
        {content.map((item, index) => (
          <Label
          key={index}
            text={item}
            onClick={() => removeContent(index)}
        >
        </Label>
          // <div  className="flex items-center bg-white text-black dark:bg-black dark:text-white m-1 rounded-full">
          //   <span className="px-2 py-1">{item}</span>
          //   <button
          //     onClick={() => removeContent(index)}
          //     className="bg-gray-200 dark:bg-gray-600 rounded-full p-1 ml-1 mr-2"
          //   >
          //     <Icon icon_light={clearIcon} className='dark:invert' />
          //   </button>
          // </div>
        ))}
      {/* 輸入框 */}
      <input
        type="text"
        placeholder={props.placeholder}
        value={contentTemp}
        onChange={(e) => setContentTemp(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter') addContent(); }}
        className={`flex-grow outline-none p-2.5 dark:bg-neutral-900`}
      />
      </div>


      {/* 清除按鈕 */}
      {content.length > 0 && (
        <div className='flex-none'>
          <button
            onClick={() => setContent([])}
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
          onClick={addContent}
          className="
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

export default InputLabel;
