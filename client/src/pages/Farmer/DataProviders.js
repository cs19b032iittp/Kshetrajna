import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, Rating, Stack, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import axios from 'axios';
import React from 'react';
import Consultant from './Consultant';


const ConnectDataProviders = () => {

  const [consultants, setConsultants] = React.useState([
    {
      name: "Pawan Kalyan",
      state: "Andhra Pradesh",
      rating: 5
    },
    {
      name: "Ravi Chandra",
      state: "Telangana",
      rating: 4
    },
    {
      name: "Pawan Kalyan",
      state: "Andhra Pradesh",
      rating: 5
    },
    {
      name: "Pawan Sahith",
      state: "Telangana",
      rating: 4
    },
    {
      name: "Nithin",
      state: "Andhra Pradesh",
      rating: 5
    },
    {
      name: "Brungeshwar",
      state: "Telangana",
      rating: 1
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
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant='h5'>
          Connect dataprovider
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
                        <Avatar sx={{ bgcolor: purple[300] }} aria-label="recipe">
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
    </>
  )
}

export default ConnectDataProviders
