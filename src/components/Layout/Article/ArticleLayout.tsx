import type { ArticleLayout } from "@/types/Layout/Article/ArticleLayout";

const ArticleLayoutComponent = (props: ArticleLayout) => {
  return (
    <div className={`${props.className}`}>
      {props.children}
    </div>
  );
}

export default ArticleLayoutComponent;
