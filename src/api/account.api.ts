import { privateInstance } from '.';
import { ApiResponse } from '../utils/types';

export const getProfile = async () => {
  const res: ApiResponse = await privateInstance.get('/account/profile');
  return res;
};
