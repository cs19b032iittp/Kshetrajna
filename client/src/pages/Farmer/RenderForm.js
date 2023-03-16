import { Box, Input, InputLabel, TextField, Typography } from '@mui/material'
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


const ShortAnswer = ({ formResponse, index, handleChange }) => {
    return (
        <FormControl fullWidth sx={{ m: 1, width: "25ch" }}
            variant="standard">
            <Input required
                value={formResponse[index]["responses"][0]}
                onChange={event => handleChange(event, index)}
            />
        </FormControl>
    )
}

const MultipleChoice = ({ formResponse, index, handleChange }) => {
    return (
        <Box>
            <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz"
                value={formResponse[index]["responses"][0]}
                onChange={event => handleChange(event, index)}
                sx={{ p: 1, marginLeft: 1 }}
            >
                {formResponse[index]["choices"].map((choice, index) => {
                    return (
                        <FormControlLabel required key={index} value={choice} control={<Radio />} label={choice} />
                    )
                })}
            </RadioGroup>

        </Box>
    )
}

const Checkboxes = ({ formResponse, index, handleChange }) => {

    // console.log(formResponse[index]["responses"][2])
    return (
        <Box>
            <FormGroup sx={{ p: 1, marginLeft: 1 }}>
                {formResponse[index]["choices"].map((choice, idx) => {
                    return (
                        <FormControlLabel key={idx}  control={<Checkbox name={idx} checked={formResponse[index]["responses"][idx]} onChange={event => handleChange(event, index)}/>}  label={choice} />
                    )
                })}
            </FormGroup>
        </Box>
    )
}


const RenderForm = ({ form, formID, index }) => {
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');

    const [formResponse, setFormResponse] = React.useState([
        {
            title: "Question 1",
            type: "short",
            choices: [],
            responses: ['a']
        },
        {
            title: "Question 2",
            type: "choice",
            choices: [
                "choice 1",
                "choice 2",
                "choice 3",
            ],
            responses: ['']
        },
        {
            title: "Question 3",
            type: "checkbox",
            choices: [
                "checkbox 1",
                "checkbox 2",
                "checkbox 3",
                "checkbox 4",
                "checkbox 5",
            ],
            responses: [false, true, false, false, false]
        },
        {
            title: "Question 4",
            type: "short",
            choices: [],
            responses: ['']
        },
    ])

    const handleChange = (event, index) => {
        let data = [...formResponse]

        switch (event.target.type) {
            case 'checkbox':
                data[index]["responses"][event.target.name] = event.target.checked
                break;

            default:
                data[index]["responses"][0] = event.target.value
                break;
        }


        setFormResponse(data)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formResponse)
        // TODO: implement handle submit
    }
    return (
        <>
            {form.status === "submitted" ? <div> Day {index}: Form Submitted</div> :
                <div>
                    <div> Day {index}: Form pending</div>

                    <Box sx={{ p: 1, bgcolor: 'grey.300' }}>
                        <form onSubmit={handleSubmit}>
                            <FormControl sx={{ p: 1 }} fullWidth error={error} variant="standard">
                                <FormLabel id="demo-error-radios">Pop quiz: MUI is...</FormLabel>
                                {formResponse.map((question, index) => {
                                    return (
                                        <Box sx={{ p: 1, m: 1, bgcolor: 'white', borderRadius: 3 }}>
                                            <Typography>
                                                {index + 1}. {question.title}
                                            </Typography>



                                            {
                                                {
                                                    'short': <ShortAnswer formResponse={formResponse} index={index} handleChange={handleChange} />,
                                                    'choice': <MultipleChoice formResponse={formResponse} index={index} handleChange={handleChange} />,
                                                    'checkbox': <Checkboxes formResponse={formResponse} index={index} handleChange={handleChange} />,

                                                }[question.type]
                                            }

                                        </Box>
                                    )
                                })}
                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                                    Submit
                                </Button>
                            </FormControl>
                        </form>
                    </Box>
                </div>}
        </>
    )
}

export default RenderForm