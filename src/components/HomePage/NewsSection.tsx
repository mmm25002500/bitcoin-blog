import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewsList from "../List/NewsList";
import { MarkDownsProps } from "@/types/User/UserID";

const NewsSection = ({ posts }: MarkDownsProps) => {
  const router = useRouter();
  const { userID } = router.query;

  const [author, setAuthor] = useState({ fullname: '', name: '', description: '', image: '', id: '' });
  const [postQuantity, setPostQuantity] = useState(0);

  const [collaspe, setCollaspe] = useState(true);

  return (
    <>
      <NewsList
        data={posts.map((post) => ({
          title: post.frontMatter.title,
          description: post.frontMatter.description,
          tags: post.frontMatter.tags,
          date: typeof post.frontMatter.date === 'string' ? Date.parse(post.frontMatter.date) : post.frontMatter.date,
          authorData: {
            fullname: author.fullname,
            name: author.name,
            description: author.description,
            img: author.image,
            id: author.id,
          },
          img: post.frontMatter.img,
          image: post.frontMatter.image,
          id: post.frontMatter.id,
        }))}
      />
    </>
  );
}

export default NewsSection;
