const H6 = (props: {title: string, className?: string}) => {
  return (
    // Font Weight: 700
    <h6 className={`text-h6 font-blod ${props.className}`}>{ props.title }</h6>
  )
}

export default H6;
