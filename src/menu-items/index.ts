import { IMenuItems } from '../utils/types';
import clinic from './clinic';
import customers from './customers';
import dashboard from './dashboard';
import examination from './examination';
import sell from './sell';

const menuItems: IMenuItems = {
  items: [dashboard, customers, examination, sell, clinic]
};

export default menuItems;
