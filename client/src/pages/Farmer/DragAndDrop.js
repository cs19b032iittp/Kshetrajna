import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const DragAndDrop = (props) => {
  const setImg = props.setImg


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      acceptedFiles.forEach((file) => {
        setImg(Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      })

    }

  });
  return (
    <Box {...getRootProps()}
      sx={{
        position: "relative",
        width: "400px",
        height: "200px",
        border: '1px dashed grey',
        borderRadius: "20px",
        marginTop: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgb(249, 250, 251)"
      }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </Box>
  )
}
export default DragAndDrop
