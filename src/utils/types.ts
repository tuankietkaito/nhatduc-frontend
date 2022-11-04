import { TablerIcon } from '@tabler/icons';
import { AccountRole, Gender, MenuItemType } from './constants';

export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  payload: any;
}

export interface IAccount {
  _id?: string;
  username: string;
  roles: AccountRole[];
}

export interface IMenuItem {
  id: string;
  title?: string;
  caption?: string;
  type: MenuItemType;
  icon?: TablerIcon;
  url?: string;
  target?: boolean;
  breadcrumbs?: boolean;
  external?: boolean;
  children?: IMenuItem[];
}

export interface IMenuItems {
  items: IMenuItem[];
}

export interface ICustomer {
  _id?: string;
  name: string;
  gender?: Gender;
  birthday?: Date;
  address?: string;
  phone?: string;
  totalSpend?: number;
}

export interface IProduct {
  _id?: string;
  name: string;
  code: string;
  unit?: string;
  price: number;
}

export interface IBill {
  _id?: string;
  customer: ICustomer;
  products: { product: IProduct; quantity: number }[];
  total: number;
  discount?: number;
  paid?: number;
  createdAt?: Date;
}

interface TwoEyes {
  left?: number;
  right?: number;
}

interface ExamProperties {
  sphere?: TwoEyes;
  cylinder?: TwoEyes;
  axis?: TwoEyes;
  visualAcuityGlasses?: TwoEyes;
  visualAcuity?: TwoEyes;
  pupillaryDistance?: TwoEyes;
  addition?: number;
  otherProperties?: {
    key: string;
    value: string | number | null;
  }[];
}

export interface IExamination {
  _id?: string;
  customer: ICustomer;
  doctor: string;
  eyes: ExamProperties;
  glasses: ExamProperties;
  fee?: number;
  createdAt?: Date;
}
