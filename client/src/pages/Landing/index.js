// All Imports ----------------------------------------------------------
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { Link, useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


import { styled } from '@mui/material/styles';
import Hero from './Hero';

//-----------------------------------------------------------------------------

// Adding style components - buttons

const Title = styled(Typography)({
  fontSize: 30,
  fontWeight: 2500,
  background: "#fff",
  // background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(162,222,131,1) 70%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
});

export default function Landing() {
  // Drawer
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"))
  const [state, setState] = useState(false); // state of drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const drawer = (
    <div>

      <Toolbar sx={{ toolbar: (theme) => theme.mixins.toolbar }} />

      <List>

        <ListItemButton component={Link} href="/login" >
          <ListItemText primary={
            <Typography color="primary">
              LOGIN
            </Typography>
          }
          />

        </ListItemButton>

        <ListItemButton component={Link} href="/register" >
          <ListItemText primary={
            <Typography color="primary" >
              REGISTER
            </Typography>
          }
          />
        </ListItemButton>

      </List>

    </div>

  )

  return (
    <React.Fragment>

      <Box sx={{ flexGrow: 1 }}>

        <AppBar elevation={0} color="inherit" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'transparent', boxShadow: 'none' }}>
          <Toolbar >

            <Box sx={{ flexGrow: 1 }}>
              <Title as={Link} underline="none" href="/" variant="h5" >
                Kshetrajna
              </Title>
            </Box>


            {isMobile ? (<></>
            ) : (

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'right',
                  width: 'fit-content',
                  edge: 'right'
                }}
              >
                <Button color="success"  variant="outlined" component={Link} href="/login">
                  Login
                </Button>

                <Button color="primary" variant="contained" component={Link} href="/signup" >Signup</Button>

              </Box>

            )}

            <IconButton
              color="inherit"
              edge="end"
              aria-label="menu"
              onClick={toggleDrawer(!state)}
              sx={{ display: { sm: 'none' } }}
            >
              {state ? <CloseIcon /> : <MenuIcon />}

            </IconButton>

            <Drawer
              anchor='top'
              open={state && isMobile}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              onClose={toggleDrawer(!state)}
            >
              {drawer}
            </Drawer>

          </Toolbar>
        </AppBar>

      </Box>
      <Hero />

    </React.Fragment>
  );

}
