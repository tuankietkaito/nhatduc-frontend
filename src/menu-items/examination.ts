import { IconFilePlus, IconStethoscope } from '@tabler/icons';
import { MenuItemType } from '../utils/constants';
import { IMenuItem } from '../utils/types';

const icons = { IconFilePlus, IconStethoscope };

const examination: IMenuItem = {
  id: 'examinations',
  title: 'Khám Mắt',
  type: MenuItemType.GROUP,
  children: [
    {
      id: 'new-examination',
      title: 'Tạo Đơn Mới',
      type: MenuItemType.ITEM,
      url: '/examinations/new',
      icon: icons.IconFilePlus,
      breadcrumbs: false
    },
    {
      id: 'examinations',
      title: 'Đơn Khám',
      type: MenuItemType.ITEM,
      url: '/examinations',
      icon: icons.IconStethoscope,
      breadcrumbs: false
    }
    // {
    //   id: 'authentication',
    //   title: 'Authentication',
    //   type: MenuItemType.COLLAPSE,
    //   icon: icons.IconKey,
    //   children: [
    //     {
    //       id: 'login3',
    //       title: 'Login',
    //       type: MenuItemType.ITEM,
    //       url: '/pages/login/login3',
    //       target: true
    //     },
    //     {
    //       id: 'register3',
    //       title: 'Register',
    //       type: MenuItemType.ITEM,
    //       url: '/pages/register/register3',
    //       target: true
    //     }
    //   ]
    // }
  ]
};

export default examination;
