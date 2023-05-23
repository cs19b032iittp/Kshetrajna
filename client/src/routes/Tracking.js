import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react'


const product =
{
  name: "Paddy Bag 45 kg",
  stages: [{
    "stakeholder": "farmer",
    "name": "Aditya",
    "cscore": 80,
    "location": "tirupati"
  },
  {
    "stakeholder": "Miller",
    "name": "Yashawanth G",
    "mill_no": 1,
    "miller_id": 24571
  },
  {
    "stakeholder": "Retailer",
    "name": "Charan P"
  }
  ]
}

const Tracking = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography textAlign="center">
        Product Tracking: {product.name}
      </Typography>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {product.stages.map((step, index) => (
              <Step key={step.stakeholder} >
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">last stage</Typography>
                    ) : null
                  }
                >
                  {step.stakeholder}
                </StepLabel>
                <StepContent>
                  <Box>
                    {
                      Object.keys(step).map((key, i) => (
                        <p key={i}>
                          <span> {key}</span> {': '}
                          <span>{step[key]}</span>
                        </p>
                      )
                      )
                    }
                  </Box>
                 
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        disabled={index == product.stages.length - 1}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Next
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Prev
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === product.stages.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Tracking