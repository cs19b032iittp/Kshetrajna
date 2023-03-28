import { Box, Input, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { FarmerService } from 'config';
import axios from "axios";
import { useParams } from 'react-router-dom';


const ShortAnswer = ({ formResponse, index, handleChange }) => {
    return (

        <Input required
            value={formResponse[index]["responses"][0]}
            onChange={event => handleChange(event, index)}
        />

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

                required
            >
                {formResponse[index]["options"].map((choice, index) => {
                    return (
                        <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
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
            <FormGroup required sx={{ p: 1, marginLeft: 1 }}>
                {formResponse[index]["options"].map((choice, idx) => {
                    return (
                        <FormControlLabel key={idx} control={<Checkbox name={idx} checked={formResponse[index]["responses"][idx]} onChange={event => handleChange(event, index)} />} label={choice} />
                    )
                })}
            </FormGroup>
        </Box>
    )
}


const RenderForm = ({ cropid, form, setSubmiited }) => {

    const [formResponse, setFormResponse] = React.useState([]);
    console.log({ "formResponse": formResponse })
    console.log({ "form-questions": form.questions })

    useEffect(() => {
        console.log("got here 0")

        let questions = [...form.questions]
        console.log("got here 1")
        questions.map((question, index) => {
            console.log("got here 2, ", question)
            console.log("got here 2, ", question.type)

            if (question.type === "checkboxes") {
                questions[index].responses = new Array(question.options.length).fill(false)
                console.log("got into this")
            } else {
                questions[index].responses = ['']
            }
        })

    console.log({ questions })

    setFormResponse(questions)

}, [])

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


const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formResponse)

    const config = {
        header: {
            "Content-Type": "application/json",
        },
    };

    const url = FarmerService + `/api/farmer/workflow/submitresponses`

    try {
        const { data } = await axios.put(url, { cropid: cropid, responses: formResponse }, config);
        console.log({ data })
        setSubmiited(true)
    } catch (e) {
        alert(e.message)
    }
    // TODO: implement handle submit
}
return (
    <>
        {false ? <div>  Form Submitted</div> :
            <div>
                <div> Form pending</div>

                <Box sx={{ p: 1, bgcolor: 'grey.300' }}>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ p: 1 }} fullWidth variant="standard">
                            <FormLabel id="demo-error-radios">Please fill the given form</FormLabel>
                            {formResponse.map((question, index) => {
                                return (
                                    <Box sx={{ p: 1, m: 1, bgcolor: 'white', borderRadius: 3 }}>
                                        <Typography>
                                            {index + 1}. {question.question}
                                        </Typography>



                                        {
                                            {
                                                'short': <ShortAnswer formResponse={formResponse} index={index} handleChange={handleChange} />,
                                                'choice': <MultipleChoice formResponse={formResponse} index={index} handleChange={handleChange} />,
                                                'checkboxes': <Checkboxes formResponse={formResponse} index={index} handleChange={handleChange} />,

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