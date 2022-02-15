import { Box, Button, Grid, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const EditDetailsPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnack, setSnackOpen] = React.useState(false);
  let passNotMatchText = "";

  const userId = useSelector((state: RootState) => state.userReducer._id);

  const handleSnackClick = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

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
    if (checkPasswordsMatch() === true) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password: confirmPassword }),
      };

      fetch(
        `http://localhost:4000/users/updateDetails/${userId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then(() => {
          handleSnackClick();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid container direction="column">
        <Grid item margin={1} xs={12}>
          <TextField
            required
            value={name}
            label="Name"
            type="string"
            onChange={(e) => setName(e.target.value)}
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
        <Grid item margin={1} xs={12}>
          <TextField
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
          <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            message="Details changed"
            onClose={handleSnackClose}
            action={action}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditDetailsPage;
