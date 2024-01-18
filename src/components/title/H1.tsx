const H1 = (props: {title: string, className?: string}) => {
  return (
    // Font Weight: 700
    <h1 className={`text-h1 font-blod ${props.className}`}>{ props.title }</h1>
  )
}

export default H1;
