import Image from 'next/image';

// 整個 Card 的 Props
interface CardProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// Card 的左邊的 Props
interface InfomationProps {
  className?: string;
  children?: React.ReactNode;
}

// Card 的左上的 Props
interface TitleProps {
  text: string;
  className?: string;
}

// Card 的左下的 Props
interface DescriptionProps {
  text: string;
  className?: string;
}

// Card 的右邊的 Props
interface PhotoProps {
  src: string;
  className?: string;
}

// 左邊的 Infomation
const Infomation = (props: InfomationProps) => {
  return (
    <div className={`flex flex-col justify-between ${ props.className }`}>
      {props.children}
    </div>
  )
}

// 左上的 Title
const Title = (props: TitleProps) => {
  return (
    <p className={`${props.className}`}>
      {props.text}
    </p>
  )
}

// 左下的 Description
const Description = (props: DescriptionProps) => {
  return (
    <p className={`${ props.className }`}>
      { props.text}
    </p>
  )
}

// 右邊的 Photo
const Photo = (props: PhotoProps) => {
  return (
    <Image
      src={props.src}
      alt="Icon Not Found"
      className={`${ props.className }`}
    ></Image>
  )
}

// 整個 Card
const Card = (props: CardProps) => {
  return (
    <button onClick={ props.onClick } className={`
    flex flex-row ${props.className}`}>
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
