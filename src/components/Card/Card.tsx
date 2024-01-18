import Image from 'next/image';

// 整個 Card 的 Props
interface CardProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// 左邊的 Infomation
const Infomation = (props: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`flex flex-col justify-between p-4 leading-normal ${ props.className }`}>
      {props.children}
    </div>
  )
}

// 左上的 Title
const Title = (props: { text: string, className?: string }) => {
  return (
    <p className={`mb-2 text-base font-medium leading-6 text-neutral-800 dark:text-neutral-200 ${props.className}`}>
      {props.text}
    </p>
  )
}

// 左下的 Description
const Description = (props: { text: string, className?: string }) => {
  return (
    <p className={`mb-3 font-medium text-2xl leading-9 text-gray-700 dark:text-white tracking-[.04rem] ${ props.className }`}>
      { props.text}
    </p>
  )
}

// 右邊的 Photo
const Photo = (props: { src: string, className?: string }) => {
  return (
    <Image
      src={props.src}
      alt="Icon Not Found"
      className={`object-cover rounded-t-lg h-auto w-[100px]] ${ props.className }`}
    ></Image>
  )
}

// 整個 Card
const Card = (props: CardProps) => {
  return (
    <button onClick={ props.onClick } className={`
    flex items-center justify-between rounded-lg shadow flex-row max-w-xl border ${props.className}
    px-7 gap-8 w-full

    /* Light Mode */
    bg-neutral-white
    border-neutral-200
    hover:border-black
    hover:border-2

    /* Dark Mode */
    dark:bg-neutral-900
    dark:border-0
    dark:hover:bg-black

    `}>
      { props.children }
    </button>
  )
}

// 將元件組合起來
Card.Infomation = Infomation;
Card.Title = Title;
Card.Description = Description;
Card.Photo = Photo;

export default Card;
