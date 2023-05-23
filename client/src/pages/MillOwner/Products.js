import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { APIService } from 'config';
import React, { useState } from 'react'

const Product = ({ open, setOpen, handleClickOpen, handleClose, product }) => {
    const Quote = async () => {

        if (price < product.highprice) {
            return
        } 
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const url = APIService + '/api/miller/mandi/pitchprice'
        console.log(url)

        try {
            const { data } = await axios.put(url, {
                cropid: product.cropid,
                newprice: price
            }, config);

            setOpen(false);
            alert("Done")
            window.location.reload()

        } catch (error) {

            setOpen(false);
            alert(error.message)
        }


    }

    const [price, setPrice] = useState(0)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Quote a Price
                </DialogTitle>
                <DialogContent sx={{ m: 2 }}>
                    <TextField
                        label="Quantity"
                        id="outlined-start-adornment"
                        type="number"
                        sx={{ width: '25ch', m: 2 }}
                        onChange={event => { setPrice(event.target.value) }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="error" >
                        Cancel
                    </Button>
                    <Button onClick={Quote} autoFocus variant="contained" color="success">
                        Quote
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const Products = () => {

    const [products, setProducts] = React.useState([])

    const [selected, setSelected] = React.useState(-1);
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {

        async function fetchData() {
            const config = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            const url = APIService + '/api/miller/mandi'
            console.log(url)

            try {
                const { data } = await axios.post(url, {}, config);

                console.log(data)
                setProducts(data.products)

            } catch (error) {
                alert(error.message)
            }
        }
        fetchData();

    }, [])
    return (
        <Box sx={{ p: 1 }}>
            {products.map((product, idx) => {
                return <Card>
                    <CardActionArea onClick={() => { setSelected(idx); setOpen(true) }}>
                        <Box sx={{ display: 'flex' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 250, height: 200 }}
                                image={product.img}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {product.cropname}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        Quantity:  {product.quantity} {' '} Kg
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        Pitched Price:   {product.pitchedprice}  {' '} Rs
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" component="div">
                                        High Price:  {product.highprice}  {' '} Rs
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Box>

                    </CardActionArea>

                </Card>
            })}

            {selected === -1 ? <></> : <Product open={open} product={products[selected]} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />}
        </Box>
    )
}

export default Products