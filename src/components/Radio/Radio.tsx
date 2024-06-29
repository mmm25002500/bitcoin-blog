import { RadioBtnData, RadioData, RadioGroupData } from '@/types/Radio/Radio';
import { Children, cloneElement, isValidElement, ReactElement } from 'react';

// Radio 元件
const Radio = (props: RadioData) => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
};

// Radio.Group 元件
const Group = (props: RadioGroupData) => {
  const handleChange = (value: string) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div className={props.className}>
      {Children.map(props.children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<RadioBtnData>, {
            name: props.name,
            key: index,
            selectedValue: props.selectedValue,
            onChange: handleChange,
          });
        }
        return child;
      })}
    </div>
  );
};

// Radio.Btn 元件
const Btn = (props: RadioBtnData) => {
  const isSelected = props.selectedValue === props.value;

  return (
    <label className={`
      text-sm font-medium rounded-full border focus:outline-none leading-5

      /* Light Mode */
      bg-white
      text-neutral-black
      border-neutral-200
      hover:border-neutral-black
      active:bg-neutral-black
      active:text-white

      /* Dark Mode */
      dark:bg-transparent
      dark:text-white
      dark:border-neutral-500
      dark:hover:bg-neutral-black
      dark:hover:border-neutral-800
      dark:active:text-primary-black-300
      dark:active:border-0

      ${props.className}
      ${isSelected ? '!bg-neutral-black !text-neutral-white dark:!bg-neutral-white dark:!text-primary-black-300' : ''}
    `}>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={isSelected}
        onChange={() => props.onChange && props.onChange(props.value)}
        className="hidden"
      />
      {props.text}
    </label>
  );
};

Radio.Group = Group;
Radio.Btn = Btn;

export default Radio;
