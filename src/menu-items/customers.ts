import { IconDashboard, IconUsers } from '@tabler/icons';
import { MenuItemType } from '../utils/constants';
import { IMenuItem } from '../utils/types';

const icons = { IconDashboard, IconUsers };

const customers: IMenuItem = {
  id: 'customers',
  title: 'Khách Hàng',
  type: MenuItemType.GROUP,
  children: [
    {
      id: 'customers',
      title: 'Khách Hàng',
      type: MenuItemType.ITEM,
      url: '/customers',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default customers;
