import { publicInstance } from '.';
import { ApiResponse } from '../utils/types';

export const login = async (data: { username: string; password: string }) => {
  const { username, password } = data;
  const res: ApiResponse = await publicInstance.post('/auth/login', { username, password });
  if (res.statusCode === 201 && res.payload.accessToken)
    localStorage.setItem('accessToken', res.payload.accessToken);
  return res;
};
