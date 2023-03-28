import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RenderForm from './RenderForm';
import { FarmerService } from "config";
import axios from "axios";



export default function FarmWorkflow({cropid, workflowInstance }) {

  const workflow = workflowInstance.workflow
  console.log({ workflowInstance })

  const curStage = workflow.curstage

  console.log({ curStage })

  const [submitted, setSubmiited] = React.useState(workflowInstance.submitted)

  return (
    <Box sx={{ p: 2 }}>
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
              {
                submitted ? <>Form Submitted</> : <RenderForm  cropid={cropid} form={workflowInstance.form} setSubmiited={setSubmiited} />
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {curStage === workflow.stages.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed</Typography>
        </Paper>
      )}
    </Box>
  );
}