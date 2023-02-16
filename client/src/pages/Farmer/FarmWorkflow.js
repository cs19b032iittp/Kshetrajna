import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Preparation of Field',
    description: `Paddy farmers used to get their fields ready before the rainy season. 
              The weeds are cleared and the field is ploughed by buffaloes or tractors 
              to a depth of few inches. `,
    date : '12 Feb, 2023'
  },
  {
    label: 'Transplantation',
    description: `Generally paddy seedlings are first prepared in nursery and then transplanting 
              is done in the field after about 40 days. Although in some areas of India and Sri 
              Lanka seeds have been sown directly in the field and the seedlings sprout when the 
              rain comes.`,
    date : '20 Feb, 2023'
  },
  {
    label: 'Field Maintenance',
    description: `Paddy fields also require regular maintenance, such as occasional weeding and
              thinning out the more crowded patches, level of water is to be maintained according to the 
              growth and the fields are drained dry before the crop is harvested.`,
    date : '21 Feb, 2023'
  },
  {
    label: 'Harvesting',
    description: `The traditional harvesting system is either through a curved knife or a sharp-edged
              knife. It is very labour-intensive. Harvesting is done in the dry season, when the weather is sunny. 
              Mechanical combines which cut and thresh are used in Japan.`,
    date : '22 Mar, 2023'
  },
  {
    label: 'Threshing, Winnowing and Milling',
    description: `After the paddy stalks have been gathered and dried for a brief spell, their threshing 
              is usually done. By beating the sheaves against the bars, the grains are separated from the stalks. 
              Now threshing machines have also been developed.`,
    date : '23 April, 2023'
  },

];

export default function FarmWorkflow() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 550 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                <Typography variant="caption">{step.date}</Typography>
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Validate'}
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
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button> */}
        </Paper>
      )}
    </Box>
  );
}