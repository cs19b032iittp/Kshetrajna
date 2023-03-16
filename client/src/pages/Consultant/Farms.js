import { Box, CardActionArea, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


const farms = [
  {
    id: '783345',
    name: 'Paddy',
    date: '11/02/2023',
    farmer: 'Vivek',
    img: 'https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
  },
  {
    id: '4433345',
    name: 'Sugarcane',
    date: '3/01/2023',
    farmer: 'Vivek',
    img: 'https://www.ragus.co.uk/wp-content/uploads/2022/07/Growing_SCane_01_ss_767632852_560x389px.jpg'
  },
  {
    id: '1459832',
    name: 'Mango',
    date: '23/05/2022',
    farmer: 'Aditya',
    img: 'https://cdn.britannica.com/05/75905-050-C7AE0733/Mangoes-tree.jpg'
  }
]
const Farms = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{display : 'flex', flexWrap : 'wrap'}}>
      {
        farms.map((field) =>
          <>
            <Card sx={{ minWidth: 300, m: 1, boxShadow : 1, borderRadius : 2 }} as={Link} color='inherit' underline='none' onClick={() => navigate('/consultant/farming/farm/34321')}>
              <CardActionArea >
                <CardMedia
                  component="img"
                  height="200"
                  image={field.img}
                  alt={field.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {field.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Planted by {field.farmer} on {field.date} 
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>)
      }
    </Box>
  )
}

export default Farms