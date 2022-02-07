import React, { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  function showError(message: string) {
    setError(true);
    setErrorMessage(message);
  }

  const handleSubmit = (e: any) => {
    setError(false);
    e.preventDefault();

    const userDetails = {
      email: emailInput,
      password: passwordInput,
    };
    if (!emailInput || !passwordInput) {
      showError("Please insert all fields!");
    } else {
      // fetch(`http://localhost:4000/users/validateUser`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     params: { email: emailInput, password: passwordInput },
      //   }),
      // }
      axios
        .get("http://localhost:4000/users/validateUser", {
          params: {
            user: userDetails,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data !== "") navigate("/home");
          else {
            showError("Your email or password is incorrect.");
          }
        })
        .catch((err: any) => {
          console.error(err);
          showError("Your email or password is incorrect.");
        });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "grid",
        gridTemplateRows: "repeat(4, 1fr)",
        p: 1,
        columnGap: 3,
        rowGap: 1,
        justifyContent: "center",
      }}
    >
      <TextField
        label="Email"
        type="email"
        error={error}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        error={error}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      {error && <Alert severity="error">{errorMessage}</Alert>}
      <Button variant="contained" type="submit" sx={{ textTransform: "none" }}>
        Sign In
      </Button>
    </Box>
  );
}

export default SignInForm;
