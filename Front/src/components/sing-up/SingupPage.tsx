import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../redux/slices/userSlice";

interface Hobby {
  name: string;
  _id: string;
}

const SingupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hobbyId, setHobbyId] = useState("");
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:4000/hobbies/getAll", {
      method: "GET",
    }).then((res) => {
      res.json().then((data) => setHobbies(data));
    });
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

    fetch("http://localhost:4000/users/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        hobbyId,
      }),
    })
      .then((res) => {
        if (res.body) {
          res.json().then((data) => dispatch(setUserId(data.id)));
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setHobbyId(event.target.value);
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container direction="column">
        <Grid item margin={1} xs={12}>
          <TextField
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            value={email}
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item margin={1}>
          <FormControl sx={{ m: 1, minWidth: 225 }}>
            <InputLabel>Hobby</InputLabel>
            <Select value={hobbyId} onChange={handleChange} autoWidth>
              {list}
            </Select>
          </FormControl>
        </Grid>

        <Grid item margin={1} xs={12}>
          <Button type="submit">Create user</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingupPage;
