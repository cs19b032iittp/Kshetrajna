import { Assignment } from '@mui/icons-material';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { grey, lightBlue, purple } from '@mui/material/colors';
import { borderRadius } from '@mui/system';
import axios from "axios";
import { FarmerService } from "config";
import { useEffect, useRef, useState } from 'react';
import { GenerateImage } from 'utils/ExportAsImage';
import CreateStage from './CreateStage';


const CreateWorkflow = () => {

  const [name, setName] = useState('Untitled Workflow')
  const [stageFields, setStageFields] = useState([
    { name: '', duration: '', formId: '' }
  ])

  const [showMenu, setShowMenu] = useState(0)

  const [count, setCount] = useState(0)

  const handleFormChange = (index, event) => {
    let data = [...stageFields];
    data[index][event.target.id] = event.target.value;
    setStageFields(data);
  }

  const handleAddStage = () => {
    let newField = { name: '', duration: '', formId: '' }
    setStageFields([...stageFields, newField])
  }

  const handleDelete = (index) => {

    if (stageFields.length === 1) {
      return
    }
    let data = [...stageFields];
    data.splice(index, 1)
    setStageFields(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (e.target.name === "CreateForm") {
      return
    }

    if (count !== stageFields.length) {
      alert("Please create all forms")
    } else {
      e.preventDefault();

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const url = FarmerService + '/api/consultant/workflow/addworkflowtemplate'

      try {
        const response = await axios.put(url, { stages: stageFields, workflowname: 'tmp' }, config);
        alert("Workflow Created")
        window.location.reload(false)
      } catch (error) {
        alert(error.message)
      }
    }
  }

  useEffect(() => {
    console.log(showMenu)
  }, [showMenu])

  const ref = useRef()

  return (
    <Box sx={{ p: 1, minHeight: '100vh', bgcolor: lightBlue[50] }}>
      <form name="CreateWorkflow" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between">
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Assignment color='primary' />
            <TextField
              required
              value={name}
              variant='standard'
              sx={{ paddingLeft: 2 }}
              placeholder="Workflow Name"
              onChange={event => setName(event.target.value)}
              // style={{ fontSize: '1.5rem', height: '4rem' }}
              inputProps={{
                style: {
                  fontSize: "1.5rem",
                },
                size: name.length - 4,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
          <Button name="Generate Image" variant='contained' color='success' onClick={() => GenerateImage(ref.current)} > GenerateImage</Button>
            <Button name="CreateWorkflow" variant='contained' color='success' type="submit">Create Workflow</Button>
          </Box>
        </Box>



        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: "center" }}>
          <Box ref={ref}  sx={{
            padding: 2,
            display: 'flex',
            alignItems: "center",
            width: 'auto',
            borderRadius: 5,
            bgcolor: lightBlue[50]
          }}>
            <Stack>
              {stageFields.map((stage, index) => {
                return (
                  <CreateStage index={index} stage={stage}
                    count={count} setCount={setCount}
                    stageFields={stageFields} setStageFields={setStageFields}
                    showMenu={showMenu} setShowMenu={setShowMenu}

                    handleFormChange={handleFormChange}
                    handleDelete={handleDelete}
                    handleAddStage={handleAddStage} />
                )
              })}
            </Stack>



          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default CreateWorkflow

{/* <CreateStage stage={stage} index={index} handleFormChange={handleFormChange} handleDelete={handleDelete} /> */ }
