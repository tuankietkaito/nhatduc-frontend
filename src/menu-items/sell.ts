import { IconCoin, IconFilePlus } from '@tabler/icons';
import { MenuItemType } from '../utils/constants';
import { IMenuItem } from '../utils/types';

const icons = { IconCoin, IconFilePlus };

const sell: IMenuItem = {
  id: 'sell',
  title: 'Bán Hàng',
  type: MenuItemType.GROUP,
  children: [
    {
      id: 'new-bill',
      title: 'Tạo Đơn Mới',
      type: MenuItemType.ITEM,
      url: '/sell/new',
      icon: icons.IconFilePlus,
      breadcrumbs: false
    },
    {
      id: 'bills',
      title: 'Đơn Bán Hàng',
      type: MenuItemType.ITEM,
      url: '/sell',
      icon: icons.IconCoin,
      breadcrumbs: false
    }
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: MenuItemType.ITEM,
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ]
};

export default sell;
