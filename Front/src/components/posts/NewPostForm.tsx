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
}) => {
    const { handleModalClose, handleSnackbarOpen } = props;
    const [title, setTitle] = useState("");
    const [currHobbyId, setCurrHobbyId] = useState("");
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [text, setText] = useState("");
    // const [imgUrl, setImgUrl] = useState("");
    const imgUrl =
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkids.nationalgeographic.com%2Fanimals%2Fmammals%2Ffacts%2Fgiant-panda&psig=AOvVaw1xmhsK7sueUKkud79PiLZv&ust=1644610708510000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNjtkMT69fUCFQAAAAAdAAAAABAD";

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
                currHobbyId,
                text,
                imgUrl,
            }),
        })
            .then(() => {
                handleModalClose();
                handleSnackbarOpen();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCurrHobbyId(event.target.value);
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
                        <Select
                            value={currHobbyId}
                            onChange={handleChange}
                            autoWidth
                            required
                        >
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
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewPostForm;
