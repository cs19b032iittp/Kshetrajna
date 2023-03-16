import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

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

const ErrorPage = ({ message }) => {
  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="subtitle1">{message}</Typography>
      <Button variant="contained" color="primary" style={styles.button} onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
    </Box>
  );
};

export default ErrorPage;
