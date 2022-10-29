import customers from './customers';
import examination from './examination';
import clinic from './clinic';
import sell from './sell';
import { IMenuItems } from '../utils/types';
import dashboard from './dashboard';

const menuItems: IMenuItems = {
  items: [dashboard, customers, examination, sell, clinic]
};

export default menuItems;
