import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";

import { throttle } from "./utils/index";

export type IPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const App = () => {
  const [posts, setPosts] = useState<IPost[] | []>([]);

  const [limit, setLimit] = useState(5);

  const [isLoading, setIsLoading] = useState(false);

  const getPosts = async (limit: number = 0) => {
    setIsLoading(true);
    const data = await fetch(`https://dummyjson.com/posts?limit=${limit}`, {
      method: "GET",
    });

    const posts = await data.json();

    setIsLoading(false);
    return posts;
  };

  function checkPosition() {
    if (isLoading) return;

    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 3;
    const position = scrolled + screenHeight;
    if (position >= threshold && limit <= 150) {
      setLimit((prevState) => prevState + 3);
    }
  }

  useEffect(() => {
    getPosts(limit).then((data) => setPosts(data.posts));
    console.log("get");
  }, [limit]);

  useEffect(() => {
    window.addEventListener("scroll", throttle(checkPosition, 400));
    window.addEventListener("resize", throttle(checkPosition, 400));

    return () => {
      window.removeEventListener("resize", throttle(checkPosition, 250));
      window.removeEventListener("scroll", throttle(checkPosition, 250));
    };
  }, []);

  return (
    <div>
      <div className="App">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default App;
