import { MarkDownProperties } from '@/types/MarkDownProperties';
import Markdown from 'react-markdown'

const MD = (props: MarkDownProperties) => {

  return (
    <div className={`
      w-full max-w-none
      prose dark:prose-invert

      /* p tag */
      prose-p:text-neutral-black
      prose-p:dark:text-neutral-white
      prose-p:font-normal
      prose-p:text-sm
      prose-p:leading-6

      /* h1 tag*/
      prose-h1:font-medium
      prose-h1:text-xl
      prose-h1:leading-[30px]

      ${props.className}
    `}>
      <Markdown>{props.children}</Markdown>
    </div>
  )
}

export default MD;
