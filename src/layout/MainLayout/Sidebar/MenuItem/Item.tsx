import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { RootState, storeDispatch } from '../../../../redux-toolkit';
import { setIsOpenedMenu, setOpenedItem } from '../../../../redux-toolkit/slices/sideMenu';
import { IMenuItem } from '../../../../utils/types';

type Props = {
  item: IMenuItem;
  level: number;
};

const NavItem: React.FC<Props> = ({ item, level }) => {
  const theme = useTheme();
  const sideMenu = useSelector((state: RootState) => state.sideMenu);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  let itemIcon: JSX.Element;
  if (item.icon) {
    const Icon = item.icon;
    itemIcon = <Icon stroke={1.5} size="1.3rem" />;
  } else
    itemIcon = (
      <FiberManualRecordIcon
        sx={{
          width: sideMenu.openedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
          height: sideMenu.openedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
        }}
        fontSize={level > 0 ? 'inherit' : 'medium'}
      />
    );

  let listItemProps: any = {
    component: forwardRef((props, ref) => (
      <Link {...props} to={`${item.url}`} target={item.target ? '_blank' : '_self'} />
      // <Link {...props} to={``} target={'_self'} />
    ))
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: item.target ? '_blank' : '_self' };
  }

  const itemHandler = (id: string) => {
    storeDispatch(setOpenedItem(id));
    if (matchesSM) storeDispatch(setIsOpenedMenu(false));
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) storeDispatch(setOpenedItem(item.id));
    // eslint-disable-next-line
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      sx={{
        borderRadius: `5px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 0.5 : 0.8,
        pl: `${level * 24}px`
      }}
      selected={sideMenu.openedItem.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={sideMenu.openedItem.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: '#8492c4',
                textTransform: 'capitalize'
              }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
    </ListItemButton>
  );
};

export default NavItem;
