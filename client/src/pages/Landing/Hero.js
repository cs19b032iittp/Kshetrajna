// All Imports --------------------------------------------------------
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  createTheme
} from '@mui/material/styles';

// ---------------------------------------------------------------------
const url = 'https://images.unsplash.com/photo-1599328580087-15c9dab481f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

let captionTheme = createTheme();

captionTheme.typography.body1 = {

  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },

  [captionTheme.breakpoints.up('md')]: {
    fontSize: '1.8rem',
  },
};

export default function Hero() {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'white',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundImage: `url(${url})`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.1)',
        }}
      />

      <main>
        <Box
          sx={{
            position: 'relative',
            minHeight: '100vh'

          }}
        >
          {/* <Container maxWidth="md">

          <ThemeProvider theme={headerTheme}>

            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="inherit"
              gutterBottom
              paragraph
            >
              Let us make them Smile Again!
            </Typography>

          </ThemeProvider>

          <ThemeProvider theme={captionTheme}>
            <Typography variant = "body1" align="center" color="inherit" paragraph>
                An inovative step to help Senior Citizens
            </Typography>
          </ThemeProvider>
          
          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
          >    
            <Button variant="outlined" color="inherit" component={Link} to="/register">Join us</Button>
          
          </Stack>
            
        </Container> */}

        </Box>

      </main>
    </Paper>
  )
}