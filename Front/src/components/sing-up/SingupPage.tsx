import {
  Box,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { UserDetails } from "../../types/user";
import PickUserType from "./PickUserType";

const steps = ["בחירת סוג משתמש", "פרטי משתמש", "הוספת חיה"];


const SingupPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDetails>(null);

  const isStepOptional = (step: number) => step === 2;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getPage = () => {
    if (activeStep === 0) {
      return <PickUserType />;
    }
    if(activeStep === 1 )
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} dir="rtl">
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "סיום" : "הבא"}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                דלג
              </Button>
            )}
          </Box>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            חזור
          </Button>
        </>
      )}
    </Box>
  );
};

export default SingupPage;
