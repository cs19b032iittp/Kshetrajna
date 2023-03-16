import { Box, CardActionArea, Link, Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FarmerService } from "config";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


// const fields = [
//   {
//     id: '783345',
//     name: 'Paddy',
//     date: '11/02/2023',
//     img: 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
//   },
//   {
//     id: '4433345',
//     name: 'Sugarcane',
//     date: '3/01/2023',
//     img: 'https://www.ragus.co.uk/wp-content/uploads/2022/07/Growing_SCane_01_ss_767632852_560x389px.jpg'
//   },
//   {
//     id: '1459832',
//     name: 'Mango',
//     date: '23/05/2022',
//     img: 'https://cdn.britannica.com/05/75905-050-C7AE0733/Mangoes-tree.jpg'
//   }
// ]

const farms = [
    {
        id: '783345',
        name: 'Paddy',
        date: '11/02/2023',
        farmer: 'Vivek',
        img: 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
    },
    {
        id: '4433345',
        name: 'Sugarcane',
        date: '3/01/2023',
        farmer: 'Vivek',
        img: 'https://www.ragus.co.uk/wp-content/uploads/2022/07/Growing_SCane_01_ss_767632852_560x389px.jpg'
    },
    {
        id: '1459832',
        name: 'Mango',
        date: '23/05/2022',
        farmer: 'Aditya',
        img: 'https://cdn.britannica.com/05/75905-050-C7AE0733/Mangoes-tree.jpg'
    }
]


const RenderCrop = ({ field, workflows }) => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('');

    return (
        <>
            <Card sx={{ minWidth: 300, m: 1, boxShadow: 1, borderRadius: 2 }} as={Link} color='inherit' underline='none' onClick={() => setOpen(true)}>
                <CardActionArea >
                    <CardMedia
                        component="img"
                        height="200"
                        image={field.img}
                        alt={field.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {field.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Planted by {field.farmer} on {field.date}
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
                    <Button autoFocus>
                        Assign
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const AssignWorkflow = () => {
    const navigate = useNavigate();

    const [workflows, createWorkflows] = React.useState(['SugerCane', 'Mango'])

    //   const [fields, setFields] = React.useState([])

    //   React.useEffect(() => {

    //     async function fetchCrops() {
    //       const config = {
    //         header: {
    //           "Content-Type": "application/json",
    //         },
    //       };
    //       const url = FarmerService + '/api/farmer/crops/mycrops'
    //       try {
    //         const { data } = await axios.post(url, { farmerid: '63e537d68b30684dfff02a60' }, config);
    //         setFields(data)
    //       } catch (error) {
    //         alert(error.message)
    //       }
    //     }

    //     fetchCrops();


    //   }, [])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                farms.map((field) =>
                    <>
                        <RenderCrop field={field} workflows={workflows} />
                    </>)
            }
        </Box>
    )
}

export default AssignWorkflow