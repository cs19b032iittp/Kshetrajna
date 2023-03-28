import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RenderResponses from './RenderResponses';
import axios from 'axios';
import { FarmerService } from 'config';

export default function FarmWorkflow({cropid, workflowInstance }) {

  const workflow = workflowInstance.workflow
  const [curStage, setCurStage] = React.useState(workflow.curstage);
  const [forms, setForms] = React.useState([]);

  React.useEffect(() => {
    async function getForms() {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const url = FarmerService + '/api/consultant/workflow/responses'
      console.log({ url })

      try {
        const { data } = await axios.post(url, { cropid: cropid }, config);
        console.log({ data })
        setForms(data.forms)
        console.log("done")
      } catch (error) {
        alert(error.message)
      }

    }
    getForms();

  }, [])

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };


  return (
    <Box sx={{p:2}}>
      <Stepper activeStep={curStage} orientation="vertical">
        {workflow.stages.map((stage, index) => (
          <Step key={stage.name}>
            <StepLabel
              optional={
                <Typography variant="caption">{`${stage.duration}  days`}</Typography>
              }
            >
              {stage.name}
            </StepLabel>
            <StepContent>
              <Typography variant='body2'>{stage.description}</Typography>
              {forms.map((form, idx) => {
                return (
                    <RenderResponses form={form} index={idx}/>
                )
              })}
              {/* <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === stage.length - 1 ? 'Finish' : 'Validate'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}