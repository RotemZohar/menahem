import { Alert, AlertTitle, Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PostCard from "./PostCard";

interface Post {
  _id: string;
  tag: string;
  title: string;
  text: string;
  imgUrl: string;
}

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const tag = useSelector((state: RootState) => state.userReducer.hobbyId);

  useEffect(() => {
    if (tag) {
      fetch(`http://localhost:4000/posts/byTag/${tag}`, {
        method: "GET",
      }).then((res) => {
        res.json().then((data) => setPosts(data));
      });
    }
  }, [tag]);

  const list = useMemo(
    () =>
      posts?.map((post) => (
        <PostCard id={post._id} imgUrl={post.imgUrl} title={post.title} text={post.text} />
      )),
    [posts]
  );

  if (tag) {
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
      <div>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Hobby not found.
        </Alert>
      </div>
    </Box>
  );
}

export default PostsPage;
