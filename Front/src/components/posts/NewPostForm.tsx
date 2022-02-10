import React, { useState } from "react";
import {
    Box,
    TextField,
    Grid,
    Typography,
    Button,
    Snackbar,
} from "@mui/material";

const NewPostForm = (props: { handleClose: any }) => {
    const { handleClose } = props;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    // const [imgUrl, setImgUrl] = useState("");
    const imgUrl =
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkids.nationalgeographic.com%2Fanimals%2Fmammals%2Ffacts%2Fgiant-panda&psig=AOvVaw1xmhsK7sueUKkud79PiLZv&ust=1644610708510000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNjtkMT69fUCFQAAAAAdAAAAABAD";

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

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
                handleClose();
                setMessage("Post added");
                setOpen(true);
            })
            .catch((err) => {
                setMessage("An error occurred");
                setOpen(true);
                console.error(err);
            });
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
                    <TextField
                        required
                        label="Tag"
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </Grid>
                <Grid item margin={1}>
                    <TextField
                        label="Description"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Grid>
                {/* <Grid item margin={1} xs={12}>
                    <TextField
                        label="ImgUrl"
                        type="url"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                    />
                </Grid> */}
                <Grid item margin={1}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ justifyContent: "center" }}
                    >
                        Add post
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message={message}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewPostForm;
