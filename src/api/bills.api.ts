import { ApiResponse, IBill } from '../utils/types';
import { privateInstance } from './';

const getAllBills = async (customerId?: string): Promise<IBill[]> => {
  const res: ApiResponse = await privateInstance.get(
    `/bills${customerId ? `?customerId=${customerId}` : ''}`
  );
  return res.payload as IBill[];
};

const createNewBill = async (data: IBill): Promise<IBill> => {
  const res: ApiResponse = await privateInstance.post('/bills', data);
  return res.payload;
};

const updateBill = async (billId: string, data: IBill): Promise<IBill> => {
  const res: ApiResponse = await privateInstance.patch(`/bills/${billId}`, data);
  return res.payload;
};

const deleteBill = async (billId: string): Promise<IBill> => {
  const res: ApiResponse = await privateInstance.delete(`/bills/${billId}`);
  return res.payload;
};

const BillApi = {
  getAllBills,
  createNewBill,
  updateBill,
  deleteBill
};

export default BillApi;
