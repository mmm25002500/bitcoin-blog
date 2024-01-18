import Card from "./Card";

interface ContactUSProps {
  title: string;
  description: string;
  photo: string;
  className?: string;
  onClick?: () => void;
}

const ContactUS = (props: ContactUSProps) => {
  return (
    <Card
      className="
      max-w-xl px-7 gap-8 w-full rounded-lg border items-center justify-between

      /* Light Mode */
      bg-neutral-white
      border-neutral-200
      hover:border-black
      hover:border-2

      /* Dark Mode */
      dark:bg-neutral-900
      dark:border-0
      dark:hover:bg-black
      "
      onClick={() => props.onClick}
    >
      <Card.Infomation
        className="leading-normal p-4"
      >
        <Card.Title
          text={props.title}
          className="mb-2 text-base font-medium leading-6 text-neutral-800 dark:text-neutral-200"
        />
        <Card.Description
          text={props.description}
          className="mb-3 font-medium text-2xl leading-9 text-gray-700 dark:text-white tracking-[.04rem]"
        />
      </Card.Infomation>
      <Card.Photo
        src={props.photo}
        className="object-cover rounded-t-lg h-auto w-[100px]]"
      />
    </Card>
  )
}

export default ContactUS;
