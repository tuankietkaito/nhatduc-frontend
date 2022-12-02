import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';

import Logo from '../../../components/Logo';

type Props = {
  handleLeftDrawerToggle: any;
};

const Header: React.FC<Props> = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: { width: 'auto' }
        }}
      >
        {/* ----------------------------- Logo ----------------------------- */}
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <ButtonBase disableRipple component={Link} to={''}>
            <Logo />
          </ButtonBase>
        </Box>
        {/* ----------------------------- Menu Toggle ----------------------------- */}
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div onClick={handleLeftDrawerToggle}>
            <Avatar
              sx={{
                cursor: 'pointer',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                fontSize: '1.2rem',
                transition: 'all .2s ease-in-out',
                background: theme.palette.primary.light,
                color: theme.palette.primary.dark,
                '&:hover': {
                  background: theme.palette.primary.dark,
                  color: theme.palette.primary.light
                }
              }}
              variant="rounded"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </div>
        </ButtonBase>
      </Box>
    </>
  );
};

export default Header;
