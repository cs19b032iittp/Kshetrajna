import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const Products = () => {

    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        setProductsList([
            {
                img: '',
                farmer: 'Kalidas',
                crop: 'paddy',
                quantity: '2000kg',
                price: 45000,
            },
            {
                img: '',
                farmer: 'Aditya',
                crop: 'paddy',
                quantity: '2000kg',
                price: 45000,
            },
            {
                img: '',
                farmer: 'Yashwanth',
                crop: 'sugarcane',
                quantity: '2000kg',
                price: 45000,
            },
            {
                img: '',
                farmer: 'Charan',
                crop: 'mango',
                quantity: '2000kg',
                price: 45000,
            },
        ])
    }, [])
    return (
        <>
            <Box>
                {productsList.map((product, idx) => {
                    return <Box sx={{ m: 1, p: 1, display: 'flex' }}>
                        <Box id="product_image" sx={{ width: 250, height: 250, bgcolor: 'lightgray' }}>
                            <img width="250" height= "250" alt="" src="https://www.hubspot.com/hubfs/image-hubspot-centering-css.jpeg"/>
                        </Box>
                        <Box id="product_details">
                        </Box>
                    </Box>
                })}
            </Box>
        </>
    )
}

export default Products