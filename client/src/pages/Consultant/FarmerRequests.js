import { Typography, Box, Button, Divider, Avatar } from '@mui/material'
import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { APIService } from 'config';
import axios from 'axios';

const Request = ({ request }) => {

    const [open, setOpen] = useState(true)
    const Accept = async () => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const url = APIService + '/api/consultant/connections/acceptrequest'
        console.log(url)

        try {
            const { data } = await axios.post(url, {
                myid: localStorage.getItem('id'),
                requesterid: request.sender,
                connectiontype: 1
            }, config);

            setOpen(false)

        } catch (error) {
            alert(error.message)
        }
    }


    return <>
        {open && <Box sx={{ m: 2, p: 2, borderRadius: 3, bgcolor: '#fff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Box sx={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: 'green.400' }}>
                        {request.farmers[0].firstName[0]}
                    </Avatar>
                    <Typography variant='h6' sx={{ mt: 0.5, pl: 2 }}>
                        {request.farmers[0].firstName + ' ' + request.farmers[0].lastName}
                    </Typography>
                </Box>

                <Box>
                    <Button variant="outlined" color="error" endIcon={<CloseIcon />}>
                        Reject
                    </Button>
                    <Button variant="contained" color='success' onClick={Accept} sx={{ marginLeft: 2 }} endIcon={<DoneIcon />}>
                        Accept
                    </Button>
                </Box>
            </Box>
        </Box >}
    </>
}

const FarmerRequests = () => {

    const [requests, setRequests] = React.useState([])

    React.useEffect(() => {

        async function fetchData() {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            const url = APIService + '/api/consultant/connections/requests'
            console.log(url)

            try {
                const { data } = await axios.post(url, {
                    receiver: localStorage.getItem('id'),
                }, config);

                console.log(data)
                setRequests(data.requests)

            } catch (error) {
                alert(error.message)
            }
        }
        fetchData();

    }, [])


    return (
        <Box sx={{ p: 2 }}>
            <Typography variant='h5' gutterBottom>
                Farmer Requests
            </Typography>

            {
                requests.map((request, index) => <Request request={request} />)
            }

        </Box>
    )
}

export default FarmerRequests