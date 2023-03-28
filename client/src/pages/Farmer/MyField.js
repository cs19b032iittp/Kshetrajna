import { Box, Card, CardMedia, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import axios from "axios";
import ErrorPage from 'components/Error';
import { FarmerService } from "config";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FarmWorkflow from './FarmWorkflow';

const News = [
  {
    title: 'Basmati rice sales to cross Rs 50,000 crore this fiscal, says Crisil',
    description: '"Next fiscal, however, sales will decline by 5-7% as basmati rice realisation is expected to soften with anticipated increase in paddy acreage, leading to higher supply. The volume demand is expected to remain stable at ~6.8 million tonne," Crisis added."',
    date: '09 Feb, 2023, 12.30 PM IST',
  },
  {
    title: 'Relax paddy procurement norms to help farmers in rain-hit Cauvery delta, TN CM urges PM Modi',
    description: 'Ready for harvest paddy crops spread over one lakh hectares in Cauvery delta region has submerged following unseasonal rainfall, Tamil Nadu Chief Minister M K Stalin apprised Prime Minister Narendra Modi on Sunday and urged relaxation of paddy procurement norms including stipulation on moisture content.',
    date: '05 Feb, 2023, 04.25 PM IST'
  },
  {
    title: `Government's rice procurement likely to touch last year's level of 592 lakh tonnes`,
    description: 'While the target is 600 lakh tonnes, about 426 lakh tonnes of rice have already been procured till January 26 of this year as against 410 lakh tonnes in the year-ago period, he said.',
    date: '04 Feb, 2023, 12.30 PM IST',
  }
]

const _stages = [
  {
    name: "Preparation of Field",
    duration: 7,
    description: `Paddy farmers used to get their fields ready before the rainy season. 
    The weeds are cleared and the field is ploughed by buffaloes or tractors 
    to a depth of few inches. `,
    formId: "54319",
    forms: [
      {
        Id: "43253",
        status: "submitted"
      },
      {
        Id: "43253",
        status: "pending"
      }
    ]
  },
  {
    name: "Transplantation",
    duration: 2,
    description: `Generally paddy seedlings are first prepared in nursery and then transplanting 
    is done in the field after about 40 days. Although in some areas of India and Sri 
    Lanka seeds have been sown directly in the field and the seedlings sprout when the 
    rain comes.`,
    formId: "54319",
    forms: []
  },
  {
    name: "Field Maintenance",
    duration: 20,
    description: `Paddy fields also require regular maintenance, such as occasional weeding and
    thinning out the more crowded patches, level of water is to be maintained according to the 
    growth and the fields are drained dry before the crop is harvested.`,
    formId: "54319",
    forms: []
  },
  {
    name: "Harvesting",
    duration: 10,
    description: `The traditional harvesting system is either through a curved knife or a sharp-edged
    knife. It is very labour-intensive. Harvesting is done in the dry season, when the weather is sunny. 
    Mechanical combines which cut and thresh are used in Japan.`,
    formId: "54319",
    forms: []
  },
  {
    name: "Threshing, Winnowing and Milling",
    duration: 7,
    description: `After the paddy stalks have been gathered and dried for a brief spell, their threshing 
              is usually done. By beating the sheaves against the bars, the grains are separated from the stalks. 
              Now threshing machines have also been developed.`,
    formId: "54319",
    forms: []
  },
]

const MyField = (props) => {

  const { cropid } = useParams()


  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [message, setMessage] = useState(true)
  // const [stages, setStages] = useState([])
  // const [form, setForm] = useState({})
  // const [submitted, setSubmitted] = useState(true)
  // const [activeStep, setActiveStep] = useState(0);



  const [workflowInstance, setWorkflowInstance] = useState({});

  useEffect(() => {
    async function getWorkflow() {

      setLoading(true)
      setError(false)
      setMessage('')
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const url = FarmerService + '/api/farmer/workflow/getmyworkflow'
      console.log({ url })

      try {
        const { data } = await axios.post(url, { cropid: cropid }, config);
        setWorkflowInstance(data.workflowInstance)
      } catch (error) {
        setError(true)
        setMessage(error.message)
      }
      setLoading(false)

    }
    getWorkflow();

  }, [])


  return (
    <Box>
      {loading && <LinearProgress />}
      {error && <ErrorPage message={message} />}
      {!loading && <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box sx={{ height: '100vh', borderColor: 'grey.300', p: 3 }}>
            <Typography gutterBottom variant="h5" component="div">
              Workflow
            </Typography>
            <Card sx={{ minWidth: 300, boxShadow: 1, borderRadius: 2 }} color='inherit' underline='none'>
              <CardMedia
                component="img"
                height="250"
                image='https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg'
                alt='Paddy'
              />
            </Card>

            <FarmWorkflow cropid={cropid} workflowInstance={workflowInstance} />
          </Box>

        </Grid>
        <Grid item xs={4}>
          <Box sx={{ p: 3, borderLeft: 1, borderColor: 'grey.300' }}>
            <Typography gutterBottom variant="h5" component="div">
              News
            </Typography>

            <Box sx={{ p: 2, border: 1, borderRadius: 4, bgcolor: '#fff', borderColor: 'grey.400' }}>
              {News.map((news, index) => <>
                {index ? <Divider sx={{ mb: 2 }} /> : <></>}
                <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h6" component="div">
                  {news.title}
                </Typography>
                <Typography variant="body" component="div">
                  {news.description}
                </Typography>
                <Typography sx={{ color: 'grey.700' }} gutterBottom variant="body2" component="div">
                  {news.date}
                </Typography>

              </>)}
            </Box>


          </Box>
        </Grid>
      </Grid>}
    </Box>
  )
}

export default MyField