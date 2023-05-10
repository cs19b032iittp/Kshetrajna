import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, Rating, Stack, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import axios from 'axios';
import React, { useRef } from 'react';
import Consultant from './Consultant';
import { APIService } from 'config';

const ConnectConsultants = () => {

  const [consultants, setConsultants] = React.useState([]);

  const [selected, setSelected] = React.useState(-1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const url = APIService + "/api/farmer/connections/"
    axios.post(url).then((response) => {
      console.log("resp")
      console.log(response.data.consultants)
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
                          {consultant.firstName[0]}
                        </Avatar>
                      }
                      title={consultant.firstName}
                      subheader={"Andhra Pradesh"}
                    />
                    <CardContent sx={{ mt: -2 }}>
                      <Stack>
                        <Typography gutterBottom variant="body2" component="div">
                          Rating
                        </Typography>
                        <Rating name="read-only" value={consultant.rating? consultant.rating : 0 } readOnly />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </ Card >
              ))}
              { selected === -1 ? <></>  : <Consultant open={open} consultant={consultants[selected]} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
               }
            </Box> 
      </Box>
  )
}

export default ConnectConsultants
