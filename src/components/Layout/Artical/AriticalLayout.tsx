import { AriticalLayout } from "@/types/Layout/Artical/AriticalLayout";

const ArticalLayout = (props: AriticalLayout) => {
  return (
    <div className={`${props.className}`}>
      { props.children }
    </div>
  );
}

export default ArticalLayout;
