import { Accordion, Box, Input, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';



const RenderResponses = ({ form, index }) => {

    const [formResponse, setFormResponse] = React.useState([])

    console.log({ form })

    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Day {index}: Form Submitted</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box sx={{ p: 1, bgcolor: 'grey.200', borderRadius: 2 }}>
                        {form.responses.map((question, index) => {
                            return (
                                <Box sx={{ p: 1, m: 1, bgcolor: '#fff', borderRadius: 3 }}>
                                    <Typography>
                                        {index + 1}. {question.question}
                                    </Typography>
                                    {(() => {
                                        switch (question.type) {
                                            case "checkboxes":
                                                return <>
                                                    A. {question.responses.map((response, idx) => {
                                                        return (
                                                            <>
                                                                {response === true && <>
                                                                    {question.options[idx]}
                                                                    <br />
                                                                </>}

                                                            </>
                                                        )
                                                    })}
                                                </>;

                                            default:
                                                return <Typography> A. {question.responses[0]} </Typography>;

                                        }
                                    })()}

                                </Box>

                            )
                        })}
                    </Box>
                </AccordionDetails>

            </Accordion>
        </Box>
    )
}

export default RenderResponses


