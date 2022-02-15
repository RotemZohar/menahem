import { Alert, AlertTitle, Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (tag) {
      fetch(`http://localhost:4000/posts/byTag/${tag}`, {
        method: "GET",
      }).then((res) => {
        res.json().then((data) => setPosts(data));
      });
    }
  }, [tag]);

  const handleCallback = () => {};

  const navToEditDetails = () => {
    navigate("../editDetails");
  };
  const list = useMemo(
    () =>
      posts?.map((post) => (
        <PostCard
          parentCallback={handleCallback}
          id={post._id}
          imgUrl={post.imgUrl}
          title={post.title}
          text={post.text}
          tag={post.tag}
        />
      )),
    [posts]
  );

  if (!tag) {
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

  if (!list?.length) {
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
          <Alert severity="info">
            <AlertTitle>Error</AlertTitle>
            No posts found for selected hobby.
          </Alert>
        </div>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={navToEditDetails}>
          Edit details
        </Button>
      </Box>
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
    </Box>
  );
}

export default PostsPage;
