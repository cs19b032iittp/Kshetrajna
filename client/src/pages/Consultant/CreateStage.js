import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Stack, Switch, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import CreateForm from './CreateForm';

const CreateStage = (props) => {
    let { count, setCount, index, stage, handleFormChange, handleDelete, stageFields, setStageFields, showMenu, setShowMenu, handleAddStage } = props
    const [open, setOpen] = React.useState(false)
    return (

        <Box sx={{ display: 'flex', m: 1 }}
            onClick={() => setShowMenu(index)}>

            <Box sx={{p:2, bgcolor: '#fff', borderRadius: 3, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Stack direction='row' spacing={2}>
                    <TextField
                        required
                        id="name"
                        label={"Stage " + `${index + 1}`}
                        value={stage.name}
                        onChange={event => handleFormChange(index, event)}
                    />
                    <TextField
                        required
                        id="duration"
                        label="Duration"
                        type="number"
                        value={stage.duration}
                        onChange={event => handleFormChange(index, event)}
                    />
                </Stack>

                <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Box sx={{ paddingTop: 1 }}>
                        {
                            stage.formId === '' ? <><Button onClick={() => { setOpen(true) }}>Create Form</Button></> : <Typography sx={{ p: 1 }} color={green[400]} > Form Created</Typography>
                        }
                    </Box>
                </Box>
                <CreateForm index={index} open={open} setOpen={setOpen} count={count} setCount={setCount} stageFields={stageFields} setStageFields={setStageFields} />
            </Box>


            <Grow in={(showMenu === index)}>
                <Box id="menu" sx={{
                    marginLeft: 2, p: 2, bgcolor: '#fff', borderRadius: 5, display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                }}>
                    <Tooltip title="Add stage" placement="right">
                        <IconButton onClick={handleAddStage}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="delete stage" placement="right">
                        <IconButton onClick={() => handleDelete(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
{/* 
                    <Tooltip title="Add stage" placement="right">
                        <IconButton >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip> */}
                </Box>
            </Grow>
        </Box>
    )
}

export default CreateStage