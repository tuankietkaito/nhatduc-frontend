import { IconHome } from '@tabler/icons';
import { MenuItemType } from '../utils/constants';
import { IMenuItem } from '../utils/types';

const icons = { IconHome };

const dashboard: IMenuItem = {
  id: 'dashboard',
  title: 'Trang Chủ',
  type: MenuItemType.ITEM,
  url: '/dashboard',
  icon: icons.IconHome,
  breadcrumbs: false
};

export default dashboard;
