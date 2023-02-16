import { Typography, Box, Button, Divider, Avatar } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const DataProviderRequests = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant='h5' gutterBottom>
                Farmer Requests
            </Typography>
            <Box sx={{ p: 2, border: 0.5, borderRadius: 3, borderColor: 'grey.400', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>

                    <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{bgcolor: 'green.400'}}>
                            G
                        </Avatar>
                        <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                            Guna Sri Nitesh
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
                            Y
                        </Avatar>
                        <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                           Yethin Chandra Sai
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

export default DataProviderRequests
