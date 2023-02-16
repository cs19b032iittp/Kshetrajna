import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import FarmWorkflow from './FarmWorkflow';

const News = [
  {
    title : 'Basmati rice sales to cross Rs 50,000 crore this fiscal, says Crisil',
    description : '"Next fiscal, however, sales will decline by 5-7% as basmati rice realisation is expected to soften with anticipated increase in paddy acreage, leading to higher supply. The volume demand is expected to remain stable at ~6.8 million tonne," Crisis added."',
    date : '09 Feb, 2023, 12.30 PM IST',
  },
  {
    title : 'Relax paddy procurement norms to help farmers in rain-hit Cauvery delta, TN CM urges PM Modi',
    description : 'Ready for harvest paddy crops spread over one lakh hectares in Cauvery delta region has submerged following unseasonal rainfall, Tamil Nadu Chief Minister M K Stalin apprised Prime Minister Narendra Modi on Sunday and urged relaxation of paddy procurement norms including stipulation on moisture content.',
    date : '05 Feb, 2023, 04.25 PM IST'
  },
  {
    title : `Government's rice procurement likely to touch last year's level of 592 lakh tonnes`,
    description : 'While the target is 600 lakh tonnes, about 426 lakh tonnes of rice have already been procured till January 26 of this year as against 410 lakh tonnes in the year-ago period, he said.',
    date : '04 Feb, 2023, 12.30 PM IST',
  }
]

const MyField = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ p: 3 }}>
            <Typography gutterBottom variant="h5" component="div">
              Paddy
            </Typography>

            <Card sx={{ minWidth: 300, boxShadow: 1, borderRadius: 2 }} color='inherit' underline='none'>
              <CardMedia
                component="img"
                height="250"
                image='https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
                alt='Paddy'
              />
            </Card>
            <Box sx={{ p: 2, mt: 5, border : 1, borderRadius : 4, bgcolor: '#fff', borderColor: 'grey.400' }}>
              {News.map((news, index) => <>
                { index ? <Divider sx={{mb :2}}/> : <></>}
                <Typography sx={{fontWeight : 'bold'}} gutterBottom variant="h6" component="div">
                  {news.title}
                </Typography>
                <Typography  variant="body" component="div">
                  {news.description}
                </Typography>
                <Typography  sx={{color: 'grey.700'}} gutterBottom variant="body2" component="div">
                  {news.date}
                </Typography>
                
              </>)}
            </Box>


          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ borderLeft: 1, height: '100vh', borderColor: 'grey.300', p: 3 }}>
            <Typography gutterBottom variant="h5" component="div">
              Workflow
            </Typography>
            <FarmWorkflow />

          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MyField