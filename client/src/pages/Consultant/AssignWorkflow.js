import { Box, CardActionArea, Link, Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { APIService } from "config";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const RenderCrop = ({ field, workflows, workflowIds }) => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('');

    const AssignWorkflow = async () => {
        console.log()  

        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

          const url = APIService + '/api/consultant/workflow/assignworkflow'
          console.log(url)

          try {
            const { data } = await axios.put(url, { workflowid: workflowIds[workflows.indexOf(value)], cropid: field._id }, config);
            
            console.log(data)
            setOpen(false)
          } catch (error) {
            alert(error.message)
          }
    }

    return (
        <>
            <Card sx={{ minWidth: 300, m: 1, boxShadow: 1, borderRadius: 2 }} as={Link} color='inherit' underline='none' onClick={() => setOpen(true)}>
                <CardActionArea >
                    <CardMedia
                        component="img"
                        height="200"
                        image={field.img}
                        alt={field.cropname}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {field.cropname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Planted by Aditya on {field.startdate}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {field.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Planted by {field.farmer} on {field.date}
                    </DialogContentText>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        id="controllable-states-demo"
                        options={workflows}
                        sx={{ width: 300, marginTop: 3 }}
                        renderInput={(params) => <TextField {...params} label="Workflow" />}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button autoFocus onClick={() => AssignWorkflow()}>
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const AssignWorkflow = () => {
    const navigate = useNavigate();

    const [workflows, setWorkflows] = React.useState([])
    const [workflowIds, setWorkflowsIds] = React.useState([])

      const [farms, setFarms] = React.useState([])

      React.useEffect(() => {

        async function fetchCrops() {
          const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

          const url = APIService + '/api/consultant/crops/mycrops'
          console.log(url)

          try {
            const { data } = await axios.post(url, { consultantid: localStorage.getItem('id') }, config);
            setFarms(data)
            console.log(data)
          } catch (error) {
            alert(error.message)
          }
        }

        async function fetchWorkflows() {
            const config = {
              header: {
                "Content-Type": "application/json",
              },
            };
            const url = APIService + '/api/consultant/workflow/getworkflows'
            try {
              const { data } = await axios.post(url, { consultantid: '63e539ebce9f46c959482e85' }, config);
              var w = []
              var i = []
              data.map((d, index) => {
                console.log(d.workflowname)
                w = [ ...w , d.workflowname]
                i = [ ...i , d._id]
              })
              setWorkflows(w)
              setWorkflowsIds(i)

              console.log(data)
            } catch (error) {
              alert(error.message)
            }
          }

        fetchCrops();

        fetchWorkflows();


      }, [])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                farms.map((field) =>
                    <>
                        <RenderCrop field={field} workflows={workflows} workflowIds={workflowIds} />
                    </>)
            }
        </Box>
    )
}

export default AssignWorkflow