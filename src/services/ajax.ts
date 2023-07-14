import { message } from 'antd';
import axios from 'axios';

import { getToken } from '@/utils/user-token';

console.log(import.meta.env.VITE_API_BASE_URL);
const instance = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_BASE_URL : '',
  timeout: 10 * 1000,
});

// request 拦截处理 token
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// response 拦截处理 errno 和 msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }

  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
