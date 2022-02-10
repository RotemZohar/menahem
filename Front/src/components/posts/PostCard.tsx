import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";

function PostCard(props: {
  id: string;
  imgUrl: string;
  title: string;
  text: string;
  tag: string;
  isAdminUser?: boolean;
  isEdit?: boolean;
}) {
  const { id, tag, imgUrl, text, isAdminUser, title } = props;
  let { isEdit } = props;

  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);

  const changeEditMode = () => {
    isEdit = !isEdit;
    // props.isEdit = isEdit;
    props.isEdit(console.log("test"), "changeEditMode");
  };

  const updateCard = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        Image: imgUrl,
        text: newText,
        tag,
      }),
    };

    fetch(`http://localhost:4000/posts/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeEditMode();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  let Actions;
  if (isAdminUser) {
    Actions = (
      <CardActions>
        <IconButton aria-label="delete" onClick={deletePost}>
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="edit" onClick={changeEditMode}>
          <EditIcon />
        </IconButton>
      </CardActions>
    );
  }

  let EditableFields;
  if (!isEdit) {
    EditableFields = (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    );
  } else {
    EditableFields = (
      <CardContent>
        <TextField
          value={newTitle}
          label="Title"
          type="string"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          value={newText}
          label="Text"
          type="string"
          onChange={(e) => setNewText(e.target.value)}
        />
        <CardActions>
          <Button onClick={updateCard} variant="contained" size="small">
            Update
          </Button>
        </CardActions>
      </CardContent>
    );
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: 5 }}>
      <CardMedia component="img" height="140" image={imgUrl} />
      {EditableFields}
      {Actions}
    </Card>
  );
}

PostCard.defaultProps = {
  isAdminUser: false,
  isEdit: true,
};

export default PostCard;
