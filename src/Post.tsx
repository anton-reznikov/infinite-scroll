import { IPost } from "./App";

const Post = ({ title, body, id }: IPost) => {
  return (
    <div className="post">
      <p className="post-id">{id}</p>
      <p>{title}</p>
      <p>{body}</p>
    </div>
  );
};

export default Post;
