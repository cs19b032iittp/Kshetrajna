// All Imports --------------------------------------------------------
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';

import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// ---------------------------------------------------------------------

const url = 'https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'

let headerTheme = createTheme();
headerTheme = responsiveFontSizes(headerTheme);

// Adding style components
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
                height: '100vh',
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
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />

            <main>
                <Box
                    sx={{
                        height: '100vh',
                        position: 'relative',

                    }}
                >

                    <Box sx={{
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box>
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
                                <Typography variant="body1" align="center" color="inherit" paragraph>
                                    An innovative step to help Farmers
                                </Typography>
                            </ThemeProvider>

                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button variant="outlined" color="inherit" component={Link} href="/signup">Join us</Button>

                            </Stack>
                        </Box>
                    </Box>




                </Box>

            </main>

        </Paper>
    )
}