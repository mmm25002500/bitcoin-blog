import { ArticleLayout } from "@/types/Layout/Article/ArticleLayout";

const ArticleLayout = (props: ArticleLayout) => {
  return (
    <div className={`${props.className}`}>
      { props.children }
    </div>
  );
}

export default ArticleLayout;
