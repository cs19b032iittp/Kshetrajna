import { Card, CardContent, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const FetchingItems = () => {
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {Array.from(new Array(12)).map((item) => {
                return (
                    <Card sx={{ width: 300, height: 300, m: 1 }} >

                        <Skeleton animation="wave" variant="rectangular" width={300} height={200} />

                        <CardContent>
                            <Skeleton animation="wave" width="50%" />
                            <Skeleton animation="wave" width="75%" />

                        </CardContent>

                    </Card>
                )
            })}
        </Box>
    )
}

export default FetchingItems