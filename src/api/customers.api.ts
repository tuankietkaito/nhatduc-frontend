import { privateInstance } from '.';
import { ApiResponse, ICustomer } from '../utils/types';

const getAllCustomers = async (): Promise<ICustomer[]> => {
  const res: ApiResponse = await privateInstance.get('/customers');
  return res.payload as ICustomer[];
};

const createNewCustomer = async (data: ICustomer): Promise<ICustomer> => {
  const res: ApiResponse = await privateInstance.post('/customers', data);
  return res.payload;
};

const updateCustomer = async (custId: string, data: ICustomer): Promise<ICustomer> => {
  const res: ApiResponse = await privateInstance.patch(`/customers/${custId}`, data);
  return res.payload;
};

const deleteCustomer = async (custId: string): Promise<ICustomer> => {
  const res: ApiResponse = await privateInstance.delete(`/customers/${custId}`);
  return res.payload;
};

const CustomerApi = {
  getAllCustomers,
  createNewCustomer,
  updateCustomer,
  deleteCustomer
};

export default CustomerApi;
