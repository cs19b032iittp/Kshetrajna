import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Box, Button, Typography } from '@mui/material';

const ModelBuilderRequests = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant='h5' gutterBottom>
            Model Builder Requests
            </Typography>
            <Box sx={{ p: 2, border: 0.5, borderRadius: 3, borderColor: 'grey.400', bgcolor: '#fff' }}>
   
                <Box sx={{ display: 'flex', mb: 1,  mt: 2, justifyContent: 'space-between' }}>
                    <Box sx={{display: 'flex'}}>
                      <Avatar>
                      B
                      </Avatar>
                    <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                        Bhrungeshwar
                    </Typography>
                    </Box>
                    <Box>
                        <Button variant="outlined" color="error" endIcon={<CloseIcon />}>
                            Reject
                        </Button>
                        <Button variant="contained" color='success' sx={{ marginLeft: 2 }} endIcon={<DoneIcon />}>
                            Accept
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default ModelBuilderRequests