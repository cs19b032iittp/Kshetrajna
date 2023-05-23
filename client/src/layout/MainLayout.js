import AgricultureIcon from '@mui/icons-material/Agriculture';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Menu, MenuItem, Tooltip, Chip, Avatar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Logo from 'components/Logo';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import User from 'components/user-round.svg'
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 280;

export default function MainLayout(props) {

  const navigate = useNavigate();
  const [anchorElDashboardMenu, setAnchorElDashboardMenu] = React.useState(null);

  const handleSwitchDashboardClick = (event) => {
    setAnchorElDashboardMenu(event.currentTarget);
  };
  const handleSwitchDashboardClose = () => {
    setAnchorElDashboardMenu(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(anchorElUser)
  };
  const handleCloseUserMenu = () => {
    console.log(anchorElUser)
    setAnchorElUser(null);
  };


  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="inherit" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo />

          <Box>
            <Chip
              sx={{
                height: '48px',
                alignItems: 'center',
                borderRadius: '27px',
                transition: 'all .2s ease-in-out',
                borderColor: theme.palette.primary.light,
                backgroundColor: theme.palette.primary.light,
                '&[aria-controls="menu-list-grow"], &:hover': {
                  borderColor: theme.palette.primary.main,
                  background: `${theme.palette.primary.main}!important`,
                  color: theme.palette.primary.light,
                  '& svg': {
                    stroke: theme.palette.primary.light
                  }
                },
                '& .MuiChip-label': {
                  lineHeight: 0
                }
              }}
              icon={
                <Avatar alt="User"
                  src={User}
                  sx={{
                    ...theme.typography.mediumAvatar,
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer'
                  }}
                  aria-haspopup="true"
                  color="inherit"
                />

              }
              label={<SettingsIcon color={theme.palette.primary.main} />}
              variant="outlined"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="primary"
            />
          </Box>



        </Toolbar>

        <Menu
          sx={{ mt: '52px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key={1} onClick={(() => { navigate("/profile") })}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem key={2} onClick={(() => { localStorage.removeItem("authToken"); localStorage.removeItem("id"); navigate("/login") })}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
        <Divider sx={{ marginTop: 1 }} />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{
          p: 2,
          bgcolor: 'background.surface',
          borderRight: '1px solid',
          borderColor: 'divider',
        }} >

          {<props.navigation />}

        </Box>
      </Drawer >
      <Box component="main" sx={{ flexGrow: 1, paddingTop  :1, bgcolor: '#f9fafb', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box >
  );
}
