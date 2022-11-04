import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import Login from '../views/Authentication/Login';
import PrivateRoutes from './PrivateRoutes';

const Dashboard = Loadable(lazy(() => import('../views/Dashboard')));
const Customers = Loadable(lazy(() => import('../views/Customer/Customers')));
const Examinations = Loadable(lazy(() => import('../views/Examination/Examinations')));
const NewExamination = Loadable(lazy(() => import('../views/Examination/NewExamination')));
const Sell = Loadable(lazy(() => import('../views/Sell/Sell')));
const NewBill = Loadable(lazy(() => import('../views/Sell/NewBill')));
const Products = Loadable(lazy(() => import('../views/Clinic/products/Products')));
const ActivitiesLog = Loadable(lazy(() => import('../views/Clinic/ActivitiesLog')));
const Promotions = Loadable(lazy(() => import('../views/Clinic/Promotions')));

const AuthenRoutes = {
  path: '/login',
  element: <Login />
};

const MainRoutes = {
  element: <PrivateRoutes />,
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/customers',
          element: <Customers />
        },
        {
          path: '/examinations',
          element: <Examinations />
        },
        {
          path: '/examinations/new',
          element: <NewExamination />
        },
        {
          path: '/sell',
          element: <Sell />
        },
        {
          path: '/sell/new',
          element: <NewBill />
        },
        {
          path: '/clinic/products',
          element: <Products />
        },
        {
          path: '/clinic/history',
          element: <ActivitiesLog />
        },
        {
          path: '/clinic/promotions',
          element: <Promotions />
        }
      ]
    }
  ]
};

const AppRoutes = () => {
  return useRoutes([MainRoutes, AuthenRoutes]);
};

export default AppRoutes;
