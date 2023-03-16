import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Info from './Info';
import { Button } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const roles = [
    "You will be able to connect to a consultant of your choice and they will help you to make predictions etc. on your farm. All you need to do is to take pictures and upload them on the platform with your problem"
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Farmer" {...a11yProps(0)} />
          <Tab label="Consultant" {...a11yProps(1)} />
          <Tab label="Model Provider" {...a11yProps(2)} />
          <Tab label="Model Builder" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Info role={roles[0]} benefit="My benefits are..."/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Info role="My role is... " benefit="My benefits are..."/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Info role="My role is... " benefit="My benefits are..."/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Info role="My role is... " benefit="My benefits are..."/>
      </TabPanel>
    </Box>
  );
}