import type { MarkDownProperties } from "@/types/MarkDownProperties";
import { MDXRemote } from "next-mdx-remote";
import Markdown from "react-markdown";

const MD = (props: MarkDownProperties) => {
	const renderContent = () => {
		if (typeof props.children === "string") {
			return <Markdown>{props.children}</Markdown>;
		}
		return <MDXRemote {...props.children} />;
	};

	return (
		<div
			className={`
      w-full max-w-none
      prose dark:prose-invert

      text-lg

      /* p tag */
      prose-p:text-neutral-black
      prose-p:dark:text-neutral-white
      prose-p:font-normal
      prose-p:text-lg
      prose-p:leading-6
      prose-p:whitespace-pre-wrap
      prose-p:break-words

      /* li tag */
      prose-li:break-all

      /* h1 tag*/
      prose-h1:font-medium
      prose-h1:text-[22px]
      prose-h1:leading-[30px]

      prose-img:rounded-lg

      ${props.className}
    `}
		>
			{renderContent()}
		</div>
	);
};

export default MD;
