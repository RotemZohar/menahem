import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Grid, Typography, Button } from "@mui/material";

const NewPostForm = () => {
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [description, setDescription] = useState("");
    // const [imgUrl, setImgUrl] = useState("");

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (!title || !tag) {
            alert("Please insert all fields!");
        } else {
            fetch("http://localhost:4000/posts/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    tag,
                }),
            })
                .then((res) => {
                    if (res.body) {
                        res.json().then((data) => dispatch(setTag(data.tag)));
                        navigate("/admin");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <Box component="form" onSubmit={onSubmit}>
            <Typography gutterBottom variant="h5" component="div">
                Add a new post
            </Typography>
            <Grid container direction="column">
                <Grid item margin={1} xs={12}>
                    <TextField
                        label="Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item margin={1} xs={12}>
                    <TextField
                        label="Tag"
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </Grid>
                {/* <Grid item margin={1} xs={12}>
                    <TextField
                        label="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item margin={1} xs={12}>
                    <TextField
                        label="ImgUrl"
                        type="url"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </Grid> */}
                <Grid item margin={1} xs={12}>
                    <Button type="submit">Add post</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewPostForm;
