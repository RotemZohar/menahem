import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

interface Hobby {
  name: string;
  _id: string;
}

const NewPostForm = (props: {
  handleModalClose: any;
  handleSnackbarOpen: any;
  handleCallback: any;
}) => {
  const { handleModalClose, handleSnackbarOpen, handleCallback } = props;
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [text, setText] = useState("");

  const imgUrl =
    "data:image/jpeg;base64,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";

  useEffect(() => {
    fetch("http://localhost:4000/hobbies/getAll", {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => setHobbies(data));
      })
      .catch((err: any) => console.error(err));
  }, []);

  const list = useMemo(
    () =>
      hobbies.map((hobby) => (
        <MenuItem value={hobby._id} key={hobby._id}>
          {hobby.name}
        </MenuItem>
      )),
    [hobbies]
  );

  const onSubmit = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:4000/posts/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        tag,
        text,
        imgUrl,
      }),
    })
      .then(() => {
        handleModalClose();
        handleSnackbarOpen();

        const newPost = {
          title,
          tag,
          text,
          imgUrl,
        };

        handleCallback(newPost);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value);
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Typography gutterBottom variant="h5" component="div">
        Add a new post
      </Typography>
      <Grid container direction="column">
        <Grid item margin={1}>
          <TextField
            required
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <FormControl sx={{ minWidth: 223 }}>
            <InputLabel>Hobby</InputLabel>
            <Select value={tag} onChange={handleChange} autoWidth required>
              {list}
            </Select>
          </FormControl>
        </Grid>
        <Grid item margin={1}>
          <TextField
            label="Description"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <Button
            variant="contained"
            type="submit"
            sx={{ justifyContent: "center" }}
          >
            Add post
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPostForm;
