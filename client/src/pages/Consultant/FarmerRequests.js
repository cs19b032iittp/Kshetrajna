import { Typography, Box, Button, Divider, Avatar } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const FarmerRequests = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant='h5' gutterBottom>
                Farmer Requests
            </Typography>
            <Box sx={{ p: 2, border: 0.5, borderRadius: 3, borderColor: 'grey.400', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>

                    <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{bgcolor: 'green.400'}}>
                            V
                        </Avatar>
                        <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                            Vivek Mani Charan
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
                <Divider />
                <Box sx={{ display: 'flex', mb: 2, mt: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                        <Avatar>
                            Y
                        </Avatar>
                        <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                            Yashwanth
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
                <Divider />
                <Box sx={{ display: 'flex', mb: 1, mt: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                        <Avatar>
                            A
                        </Avatar>
                        <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                            Aditya Naga Sai
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

export default FarmerRequests