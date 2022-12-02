import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { RootState, storeDispatch } from '../../redux-toolkit';
import { fetchProfile } from '../../redux-toolkit/slices/account';
import { setIsOpenedMenu } from '../../redux-toolkit/slices/sideMenu';
import { DRAWER_WIDTH } from '../../utils/constants';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainComponentProps {
  open: boolean;
}

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})<MainComponentProps>(({ theme, open }) => ({
  ...{
    backgroundColor: '#e3f2fd',
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: '20px',
    marginTop: '88px',
    marginRight: '20px',
    borderRadius: '7px'
  },
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(DRAWER_WIDTH - 20),
      width: `calc(100% - ${DRAWER_WIDTH}px)`
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      padding: '16px',
      marginRight: '10px'
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  })
}));

const MainLayout = () => {
  const theme = useTheme();
  const leftDrawerOpened: boolean = useSelector((state: RootState) => state.sideMenu.isOpened);
  const user = useSelector((state: RootState) => state.account.user);
  const navigate = useNavigate();

  const handleLeftDrawerToggle = () => {
    storeDispatch(setIsOpenedMenu(!leftDrawerOpened));
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    if (token) storeDispatch(fetchProfile());
  }, [token]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          {/* ----------------------------- Account & Logout ----------------------------- */}
          {user && (
            <Box sx={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Box
                sx={{
                  backgroundColor: '#DFE1E6',
                  borderRadius: '50px',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>
                  {user.username.toUpperCase()}
                </Typography>
                <AccountCircleIcon sx={{ fontSize: 30 }} color="primary" />
              </Box>
              <Tooltip title="Đăng xuất">
                <IconButton onClick={handleLogout}>
                  <LogoutIcon sx={{ fontSize: 25 }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      <Main theme={theme} open={leftDrawerOpened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
