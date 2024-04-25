import NewsList from "../List/NewsList";
import { NewsProps } from "@/types/User/UserID";

const NewsSection = ({ posts }: NewsProps) => {

  return (
    <>
      <p className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-[42px] text-center py-8">NEWS</p>
      <NewsList
        data={posts.map((post) => ({
          title: post.title,
          description: post.description,
          tags: post.tags,
          date: typeof post.date === 'string' ? Date.parse(post.date) : post.date,
          authorData: {
            fullname: post.authorData.fullname,
            name: post.authorData.name,
            description: post.authorData.description,
            img: post.authorData.image,
            id: post.authorData.id,
          },
          img: post.img,
          image: post.image,
          id: post.id,
        }))}
      />
    </>
  );
}

export default NewsSection;
