import { Box, Button, Grid, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";

// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setTag } from "../../redux/slices/userSlice";

const EditDetailsPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let passNotMatchText = "";

  const checkPasswordsMatch = () => {
    if (password === confirmPassword) {
      passNotMatchText = "";
      return true;

      // eslint-disable-next-line no-else-return
    } else {
      passNotMatchText = "Passwords must match";
      return false;
    }
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    // fetch("http://localhost:4000/users/add", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //     name,
    //     hobbyId,
    //   }),
    // })
    //   .then((res) => {
    //     if (res.body) {
    //       res.json().then((data) => dispatch(setTag(data.tag)));
    //       navigate("/home");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container direction="column">
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={confirmPassword}
            label="Confirm password"
            type="password"
            error={checkPasswordsMatch() === false}
            helperText={passNotMatchText}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item margin={1} xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditDetailsPage;
