import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '10rem',
    color: 'red',
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
  },
};

const NoItems = ({ description, href, label }) => {
  const navigate = useNavigate();
  return (
    <Box style={styles.container}>
      <Typography variant="h5" style={styles.title}>
        {description}
      </Typography>
      {label !== '' && <Button variant="contained" color="primary" style={styles.button} onClick={() => navigate(href)}>
        {label}
      </Button>}
    </Box>
  );
};

export default NoItems;
