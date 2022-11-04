import axios from 'axios';

export const publicInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

publicInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('🚀 ~ error', error);
    return Promise.reject(error);
  }
);

export const privateInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});

privateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    config.headers!.Authorization = `Bearer ${token || ''}`;
    return config;
  },
  (error) => {
    console.log('🚀 ~ error', error);
    return Promise.reject(error);
  }
);

privateInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('🚀 ~ error', error);
    return Promise.reject(error);
  }
);
