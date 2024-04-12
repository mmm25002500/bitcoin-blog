import { PostListData } from "../../types/List/PostList";
const PostList = (props: PostListData) => {
  return (
    <div>
      {props.data.map((post, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex gap-4">
            {/* <img src={post.img}
              className="w-32 h-32 object-cover rounded-lg"
            /> */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-5">
                <span>{post.date}</span>
                <div className="flex gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-primary-100 text-primary-500 text-sm px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <img src={post.authorData?.img} className="w-8 h-8 object-cover rounded-full" />
              <div className="flex flex-col">
                <span>{post.authorData?.name}</span>
              </div>
            </div>
            <button className="text-primary-500">Read more</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
