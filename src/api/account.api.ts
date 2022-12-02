import { ApiResponse } from '../utils/types';
import { privateInstance } from './';

export const getProfile = async () => {
  const res: ApiResponse = await privateInstance.get('/account/profile');
  return res;
};
