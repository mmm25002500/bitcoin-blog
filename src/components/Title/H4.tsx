const H4 = (props: {title: string, className?: string}) => {
  return (
    // Font Weight: 700
    <h4 className={`text-h4 font-blod ${props.className}`}>{ props.title }</h4>
  )
}

export default H4;
