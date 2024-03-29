import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps =
    [
        {
            stakeholder: "farmer",
            name : "Kalidas",
            cscore: 80,
            location: "tirupati"
        },
        {
            stakeholder: "Miller",
            name: "Miller lavde",
            mill_no: 1,
            miller_id : 24571
        },
        {
            stakeholder: "Retailer",
            name: "Reliance Limited"
        }
    ];

export default function Tracking() {
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
        <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Stepper activeStep={2} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.stakeholder}>
                        <StepLabel
                            optional={
                                    <Box>
                                        <Typography variant="caption">{step.stakeholder}</Typography>
                                        <Typography>{step.name}</Typography>
                                    </Box>
                            }
                        >
                            {step.label}

                           
                        </StepLabel>
                        {/* <StepContent>
                            <Typography>{step.name}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent> */}
                    </Step>
                ))}
            </Stepper>
           
        </Box>
    );
}
