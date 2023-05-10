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
import { APIService } from 'config';
import { InputAdornment, Stack, TextField } from '@mui/material';

export default function FarmWorkflow({ cropid, workflowInstance }) {

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
      const url = APIService + '/api/consultant/workflow/responses'
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

  const handleNext = async () => {

    let newstage = curStage + 1
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const url = APIService + '/api/consultant/workflow/changestage'
    console.log({ url })

    try {
      const { data } = await axios.post(url, { cropid: cropid, newstage: newstage }, config);
      console.log({ data })
      setCurStage(newstage)
    } catch (error) {
      alert(error.message)
    }
  };

  const handleBack = async () => {

    let newstage = curStage - 1
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const url = APIService + '/api/consultant/workflow/changestage'


    try {
      const { data } = await axios.post(url, { cropid: cropid, newstage: newstage }, config);
      console.log({ data })
      setCurStage(newstage)
    } catch (error) {
      alert(error.message)
    }

  };


  const [price, setPrice] = React.useState(0)
  const [quantity, setQuantity] = React.useState(0)


  const handleMandi = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const url = APIService + '/api/consultant/mandi/addentry'
    const values = { cropid: cropid, pitched_price: price, quantity:quantity  }
    console.log(values)
    try {
      const { data } = await axios.post(url, values, config);
      console.log({ data })
      
    } catch (error) {
      alert(error.message)
    }
}


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
            {forms.map((form, idx) => {
              return (
                <RenderResponses form={form} index={idx} />
              )
            })}
            <Box sx={{}}>
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
            </Box>
          </StepContent>
        </Step>
      ))}
    </Stepper>
    {curStage === workflow.stages.length && (
      <Paper square elevation={0} sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }}>All stages completed</Typography>
        <Box sx={{ display: 'flex', }}>
          <TextField
            label="Quantity"
            
            id="outlined-start-adornment"
            type= "number"
            sx={{ width: '25ch' }}
            onChange={event => {setQuantity(event.target.value) }}
            InputProps={{
              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
          />

          <TextField
            label="Price"
            id="outlined-start-adornment"
            sx={{ marginLeft: 1, width: '25ch' }}
            value={price}
            type= "number"
            onChange={event => { setPrice(event.target.value) }}
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
            }}
          />
        </Box>
        <Button onClick={handleMandi} sx={{ mt: 1, mr: 1 }}>
          Assign to Mandi
        </Button>
      </Paper>
    )}
  </Box>
);
}