import { Box, CardActionArea, Link, Paper, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { APIService } from "config";
import axios from "axios";
import FetchingItems from 'components/FetchingItems';
import ErrorPage from 'components/Error';
import NoItems from 'components/NoItems';


const Farms = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const [fields, setFields] = React.useState([])


  React.useEffect(() => {

    async function fetchCrops() {
      setLoading(true)
      setError(false)
      setMessage('')

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const url = APIService + '/api/consultant/crops/myassignedcrops'
      console.log(url)
      try {
        const { data } = await axios.post(url, { consultantid : localStorage.getItem('id') }, config);
        
        setFields(data)
        console.log(data)
        setLoading(false)

      } catch (error) {
        setError(true)
        setMessage(error.message)
        setLoading(false)

      }

    }

    fetchCrops();


  }, [])

  return (
    <>
      {loading ? <FetchingItems /> :
        <>
          {error ? <ErrorPage message={message} /> :
            <>
              {(fields.length === 0) ? <NoItems description={"No crops found"} message={''} label={''}  /> :
                <>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                      fields.map((field, index) =>
                        <>
                          <Card sx={{ minWidth: 300, m: 2, boxShadow: 1, borderRadius: 1 }} as={Link} color='inherit' underline='none'  onClick={() => navigate(`/consultant/farming/farm/${field._id}`)}>
                            <CardActionArea >
                              <CardMedia
                                component="img"
                                height="200"
                                image={field.img}
                                alt={field.cropname}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                  {field.cropname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Planted on {field.startdate}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </>
                      )
                    }
                  </Box>
                </>
              }
            </>
          }
        </>
      }
    </>
  )
}

export default Farms


