import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { APIService } from 'config';

export default function Consultant({ open, setOpen, handleClickOpen, handleClose, consultant }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  console.log(consultant)
  console.log(consultant.firstName)

  const Connect = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const url = APIService + '/api/farmer/connections/connect'
    console.log(url)

    try {
      const { data } = await axios.post(url, {
        sender: localStorage.getItem('id'),
        receiver: consultant._id
      }, config);

      setOpen(false);
      alert("Request Sent")

    } catch (error) {

      setOpen(false);
      alert(error.message)
    }
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"

      >
        <DialogTitle id="responsive-dialog-title">
          Connect with {consultant.firstName}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error" >
            Cancel
          </Button>
          <Button onClick={Connect} autoFocus variant="contained" color="success">
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}