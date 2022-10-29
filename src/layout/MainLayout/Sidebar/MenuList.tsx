import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import menuItem from '../../../menu-items';
import { MenuItemType } from '../../../utils/constants';
import NavGroup from './MenuItem/Group';
import NavItem from './MenuItem/Item';

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case MenuItemType.ITEM:
        return (
          <>
            <NavItem key={item.id} item={item} level={0} />
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
          </>
        );
      case MenuItemType.GROUP:
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
