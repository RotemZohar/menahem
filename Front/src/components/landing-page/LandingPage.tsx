import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <div className="App-header">
        <h1>Menahem</h1>
        <Button variant="text" onClick={() => navigate('/register')} style={{textTransform: 'none'}}>Not a member yet? Sign up here!</Button>
      </div>
    </Box>
  );
}

export default LandingPage;