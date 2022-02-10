import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch } from "react-redux";
import PostCard from "../posts/PostCard";

interface Post {
  _id: string;
  title: string;
  text: string;
  tag: string;
  imgUrl: string;
}

function PostsTab() {
  const [posts, setPosts] = useState<Post[]>([]);
  // const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:4000/posts/getAll`, {
      method: "GET",
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        // dispatch(setPosts(data));
        setPosts(data);
      });
    });
  }, []);

  const list = useMemo(
    () =>
      posts.map((post) => (
        <PostCard
          id={post._id}
          imgUrl={post.imgUrl}
          title={post.title}
          text={post.text}
          tag={post.tag}
          isEdit={false}
          isAdminUser
        />
      )),
    [posts]
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
        p: 1,
        columnGap: 3,
        rowGap: 1,
        justifyContent: "center",
      }}
    >
      <div>{list}</div>
    </Box>
  );
}

export default PostsTab;
