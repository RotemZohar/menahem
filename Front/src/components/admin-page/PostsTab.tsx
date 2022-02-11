import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import PostCard from "../posts/PostCard";
import { UPDATE_POST, DELETE_POST } from "../../consts/actions";

interface Post {
  _id: string;
  title: string;
  text: string;
  tag: string;
  imgUrl: string;
}

function PostsTab() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/getAll`, {
      method: "GET",
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setPosts(data);
      });
    });
  }, []);

  const updatePost = (data: any) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        Image: data.Image,
        text: data.text,
        tag: data.tag,
      }),
    };

    fetch(`http://localhost:4000/posts/${data._id}`, requestOptions)
      .then((res) => res.json())
      .then((serverData) => {
        // window.location.reload();
        setPosts((existingItems) => {
          const newPosts = existingItems.map((post) => {
            if (post._id === data._id) {
              return { ...post, title: data.title, text: data.text };
            }

            return post;
          });
          return newPosts;
        });
        console.log(serverData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (id: any) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:4000/posts/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts((existingItems) => {
          const index = posts.findIndex((post) => post._id === id);
          return [
            ...existingItems.slice(0, index),
            ...existingItems.slice(index + 1),
          ];
        });
        // window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCallback = (data: any, action: any) => {
    switch (action) {
      case UPDATE_POST:
        updatePost(data);
        break;
      case DELETE_POST:
        deletePost(data);
        break;
      default:
        console.log("Unknown action");
        break;
    }
  };

  const list = useMemo(
    () =>
      posts.map((post) => (
        <PostCard
          parentCallback={handleCallback}
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
