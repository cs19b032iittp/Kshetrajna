import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, Rating, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';
import React, { useRef } from 'react';
import Consultant from './Consultant';

const ConnectConsultants = () => {

  const [consultants, setConsultants] = React.useState([
    {
      name: "Vivek Mani Charan",
      state: "Andhra Pradesh",
      rating: 5
    },
    {
      name: "Aditya Naga Sai",
      state: "Andhra Pradesh",
      rating: 4
    },
    {
      name: "Yashwanth",
      state: "TN",
      rating: 3.5
    },
    {
      name: "Guna Sri Nitesh",
      state: "Andhra Pradesh",
      rating: 5
    },
    {
      name: "Yethin Chandra Sai",
      state: "Andhra Pradesh",
      rating: 4
    },
  ]);

  const [selected, setSelected] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios.post("/api/farmer/connections").then((response) => {
      console.log(response.data)
      setConsultants(response.data.consultants)
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
      <Box sx={{ p: 2 }}>
        <Typography variant='h5'>
          Connect consultant
        </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                mt: 2
              }}
            >
              {consultants.map((consultant, index) => (

                <Card key={index} sx={{
                  minWidth: 255, m: 1, bgcolor: 'white', borderRadius: 4,
                }}>
                  <CardActionArea onClick={() => {setSelected(index); setOpen(true)}}>

                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                          {consultant.name[0]}
                        </Avatar>
                      }
                      title={consultant.name}
                      subheader={consultant.state}
                    />
                    <CardContent sx={{ mt: -2 }}>
                      <Stack>
                        <Typography gutterBottom variant="body2" component="div">
                          Rating
                        </Typography>
                        <Rating name="read-only" value={consultant.rating} readOnly />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </ Card >
              ))}
              <Consultant open={open && selected !== -1} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} consultant={consultants[selected]}/>
            </Box> 
      </Box>
  )
}

export default ConnectConsultants
