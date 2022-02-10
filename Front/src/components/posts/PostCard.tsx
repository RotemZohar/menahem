import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

function PostCard(props: {
  id: string;
  imgUrl: string;
  title: string;
  text: string;
  isAdminUser?: boolean;
}) {
  const { id, imgUrl, title, text, isAdminUser } = props;

  const deletePost = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:4000/posts/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card sx={{ maxWidth: 345, marginTop: 5 }}>
      <CardMedia component="img" height="140" image={imgUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
        {isAdminUser ? (
          <DeleteIcon
            onClick={deletePost}
            sx={{ float: "right", margin: "1rem 0 1rem 1rem" }}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}

PostCard.defaultProps = {
  isAdminUser: false,
};

export default PostCard;
