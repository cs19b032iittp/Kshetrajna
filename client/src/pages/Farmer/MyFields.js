import { Box, CardActionArea, Link, Paper, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FarmerService } from "config";
import axios from "axios";
import FetchingItems from 'components/FetchingItems';
import ErrorPage from 'components/Error';
import NoItems from 'components/NoItems';

// const fields = [
//   {
//     id: '783345',
//     name: 'Paddy',
//     date: '11/02/2023',
//     img: 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
//   },
//   {
//     id: '4433345',
//     name: 'Sugarcane',
//     date: '3/01/2023',
//     img: 'https://www.ragus.co.uk/wp-content/uploads/2022/07/Growing_SCane_01_ss_767632852_560x389px.jpg'
//   },
//   {
//     id: '1459832',
//     name: 'Mango',
//     date: '23/05/2022',
//     img: 'https://cdn.britannica.com/05/75905-050-C7AE0733/Mangoes-tree.jpg'
//   }
// ]

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const MyFields = () => {
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
      const url = FarmerService + '/api/farmer/crops/mycrops'
      console.log(url)
      try {
        const { data } = await axios.post(url, { farmerid: '63e537d68b30684dfff02a60' }, config);
        setFields(data)
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
              {(fields.length === 0) ? <NoItems description={"No crops found"} message={''} label={'Add Crop'} href={'/farmer/farm/add-field'} /> :
                <>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>
                    {
                      fields.map((field, index) =>
                        <>
                          <Card sx={{ minWidth: 300, m: 2, boxShadow: 1, borderRadius: 1 }} as={Link} color='inherit' underline='none' onClick={() => navigate(`/farmer/farm/my-field/${field._id}`)}>
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

export default MyFields


