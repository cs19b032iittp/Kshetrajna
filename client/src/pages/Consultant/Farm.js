import { LinearProgress } from '@mui/material'
import axios from 'axios'
import ErrorPage from 'components/Error'
import { APIService } from 'config'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FarmWorkflow from './FarmWorkflow'

const Farm = () => {

  const { cropid } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [message, setMessage] = useState(true)

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
      const url = APIService + '/api/farmer/workflow/getmyworkflow'
      console.log({ url })

      try {
        const { data } = await axios.post(url, { cropid: cropid }, config);
        setWorkflowInstance(data.workflowInstance)
        console.log({ data })
      } catch (error) {
        setError(true)
        setMessage(error.message)
      }
      setLoading(false)

    }
    getWorkflow();

  }, [])

  return (
    <>
      {loading && <LinearProgress />}
      {error && <ErrorPage message={message} />}
      {!loading && <FarmWorkflow cropid={cropid} workflowInstance={workflowInstance} /> }
    </>
  )
}

export default Farm