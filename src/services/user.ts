import jwt_decode from 'jwt-decode';

import { getToken } from '@/utils/user-token';

import axios, { ResDataType } from './ajax';

type DecodedToken = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
};

/**
 * 获取用户信息
 * @returns
 */
export async function getUserInfoService(): Promise<ResDataType> {
  // 首先判断是否登录
  const token = getToken();
  if (!token) {
    // 用户未登录，返回异常
    return Promise.reject(new Error('用户未登录'));
  }
  const decodedToken = jwt_decode<DecodedToken>(token);
  const id = decodedToken.sub;
  const { username } = decodedToken;
  const url = '/api/user/profile';
  const data = (await axios.get(url, {
    params: {
      id,
      username,
    },
  })) as ResDataType;
  return data;
}

/**
 * 注册用户
 * @param username
 * @param password
 * @param nickname
 * @returns
 */
export async function registerService(username: string, password: string, nickname: string): Promise<ResDataType> {
  const url = '/api/user/register';
  const body = { username, password, nickname: nickname || username };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}

/**
 * 登录
 * @param username
 * @param password
 * @returns
 */
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/auth/login';
  const body = { username, password };
  const data = (await axios.post(url, body)) as ResDataType;
  return data; // {token: 'xxxxxxxx'}
}
