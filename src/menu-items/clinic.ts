import { IconEyeglass, IconNotes, IconReceiptTax, IconChartBar } from '@tabler/icons';
import { MenuItemType } from '../utils/constants';
import { IMenuItem } from '../utils/types';

const icons = {
  IconEyeglass,
  IconNotes,
  IconReceiptTax,
  IconChartBar
};

const clinic: IMenuItem = {
  id: 'clinic',
  title: 'Phòng Khám',
  type: MenuItemType.GROUP,
  children: [
    {
      id: 'activities-log',
      title: 'Lịch Sử',
      type: MenuItemType.ITEM,
      url: 'clinic/history',
      icon: icons.IconNotes,
      breadcrumbs: false
    },
    {
      id: 'products',
      title: 'Sản Phẩm',
      type: MenuItemType.ITEM,
      url: '/clinic/products',
      icon: icons.IconEyeglass,
      breadcrumbs: false
    },
    {
      id: 'promotions',
      title: 'Ưu Đãi',
      type: MenuItemType.ITEM,
      url: '/clinic/promotions',
      icon: icons.IconReceiptTax,
      breadcrumbs: false
    }
    // {
    //   id: 'statistics',
    //   title: 'Thống Kê',
    //   type: MenuItemType.COLLAPSE,
    //   icon: icons.IconChartBar,
    //   children: [
    //     {
    //       id: 'tabler-icons',
    //       title: 'Tabler Icons',
    //       type: MenuItemType.ITEM,
    //       url: '/icons/tabler-icons',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'material-icons',
    //       title: 'Material Icons',
    //       type: MenuItemType.ITEM,
    //       url: '/icons/material-icons',
    //       breadcrumbs: false
    //     }
    //   ]
    // }
  ]
};

export default clinic;
