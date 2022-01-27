import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      .then(() => {
        navigate("/home");
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
      <TextField
        value={name}
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        value={email}
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        value={password}
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Select
        value={hobbyId}
        onChange={handleChange}
        label="Hobby"
        placeholder="Hobby"
      >
        {list}
      </Select>
      <Button type="submit">Create user</Button>
    </Box>
  );
};

export default SingupPage;
