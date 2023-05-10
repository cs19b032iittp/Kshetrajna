import React, { useState } from 'react'
import { Box, Button, IconButton, TextField, MenuItem, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { APIService } from "config";
import { Stack } from '@mui/system';
import Delete from '@mui/icons-material/Delete';


const CreateForm = (props) => {

    let { count, setCount, open, setOpen, index, stageFields, setStageFields } = props


    const [formFields, setFormFields] = useState([
        { question: '', type: 'short', options: [''], responses: [''] }
    ])

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormChange = (index, event) => {
        let data = [...formFields];

        switch (event.target.name) {
            case "option":
                let options = formFields[index]["options"];
                options[event.target.id] = event.target.value
                data[index]["options"] = options;
                setFormFields(data);
                break;

            default:
                data[index][event.target.name] = event.target.value;
                setFormFields(data);
                break;
        }
    }

    const handleOptionDelete = (index, idx) => {
        let options = [...formFields[index]["options"]]
        if (options.length === 1) {
            return
        }

        options.splice(idx, 1)
        let data = [...formFields];
        data[index]["options"] = options;
        setFormFields(data)

    }

    const addStage = () => {
        let newField = { question: '', type: 'short', options: [] }
        setFormFields([...formFields, newField])
    }

    const handleDelete = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const url = APIService + '/api/consultant/workflow/addform'
        console.log(url)

        try {
            const response = await axios.put(url, { questions: formFields }, config);
            console.log(response.data)
            alert("form created")
            setCount(count + 1)
            let data = [...stageFields];
            data[index]["formId"] = response.data.formid;
            setStageFields(data);
            handleClose()
        } catch (error) {
            alert(error.message)
        }
    }


    const handleSelect = (index, type) => {
        let data = [...formFields];
        data[index]["type"] = type
        setFormFields(data);
    }

    const addOption = (index) => {

        let options = [...formFields[index].options, '']

        let data = [...formFields];
        data[index]["options"] = options;
        setFormFields(data)
    }

    const options = [
        "short",
        "checkboxes",
        "choice"
    ]



    return (

        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="create-form"
                aria-describedby="form decription"
            >
                <form name="CreateForm" onSubmit={handleSubmit}>

                    <DialogTitle id="scroll-dialog-title">CreateForm</DialogTitle>

                    <DialogContent dividers={true}>
                        <Box>

                            {formFields.map((formField, index) => {
                                return (
                                    <Container>
                                        <Box sx={{ bgcolor: 'white', borderRadius: 4, margin: 1, padding: 2 }}>
                                            <Stack direction='row' spacing={2}>
                                                <TextField
                                                    required
                                                    name="question"
                                                    label={"Question " + `${index + 1}`}
                                                    value={formField.question}
                                                    onChange={event => handleFormChange(index, event)}
                                                />

                                                <TextField
                                                    required
                                                    name="type"
                                                    select
                                                    label="Type"
                                                    value={formField.type}
                                                    onChange={event => handleFormChange(index, event)}
                                                >
                                                    {options.map((option) => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <IconButton onClick={() => handleDelete(index)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </Stack>

                                            {
                                                formField.type === "short" ? <></> :
                                                    <>
                                                        {formField.options.map((option, idx) => {
                                                            return (
                                                                <Stack direction='row' spacing={2}>
                                                                    <TextField
                                                                        sx={{ margin: 1 }}
                                                                        variant="standard"
                                                                        required
                                                                        name="option"
                                                                        id={`${idx}`}
                                                                        label={"Option " + `${idx + 1}`}
                                                                        value={option}
                                                                        onChange={event => handleFormChange(index, event)}
                                                                    />
                                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <IconButton onClick={() => handleOptionDelete(index, idx)}>
                                                                            <CloseIcon />
                                                                        </IconButton>
                                                                    </Box>

                                                                </Stack>
                                                            )
                                                        })}

                                                        <Button onClick={() => { addOption(index) }}>
                                                            Add Option
                                                        </Button>
                                                    </>
                                            }

                                        </Box>
                                    </Container>

                                )
                            })}

                            {/* <Button variant='contained' onClick={addStage}>Add Question</Button>
                            <Button variant='contained' color='success' type='submit'>Submit Form</Button> */}

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={addStage}>Add Question</Button>
                        <Button color='success' type='submit'>Submit Form</Button>
                    </DialogActions>
                </form>

            </Dialog>

        </>

    )
}

export default CreateForm