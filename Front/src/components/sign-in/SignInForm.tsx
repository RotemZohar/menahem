import React, { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

function SignInForm() {

  const regexpEmail = "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+";
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  function checkEmail() {
    const inputEmail = (document.getElementById("email-input") as HTMLInputElement).value;

    if (!inputEmail.match(regexpEmail)) {
      setEmailError(true);
      return (false);
    } 
      setEmailError(false);
      return(true);
    
  };


  function checkPassword() {
    const inputPassword = (document.getElementById("password-input") as HTMLInputElement).value;

    if (inputPassword.length < 8) {
      setPasswordError(true);
      return (false);
    } 
      setPasswordError(false);
      return (true);
    
  };

  const handleClick = () => {
    if (checkEmail() && checkPassword()){
      // TODO: db connection
    }
  };

  return (
      <Box 
      sx={{ display: 'grid', 
            gridTemplateRows: 'repeat(3, 1fr)', 
            p: 1,
            columnGap: 3,
            rowGap: 1, 
            justifyContent: 'center',
      }}>
        <TextField
            id="email-input"
            label="Email"
            type="email"
            error={emailError}
         />
        <TextField
            id="password-input"
            label="Password"
            type="password"
            error={passwordError}
        />
        <Button 
          variant="contained"
          sx={{textTransform: 'none'}}
          onClick={handleClick}
        >
            Sign In
        </Button>
      </Box>
  );
}

export default SignInForm;
