import axios, { ResDataType } from './ajax';

/**
 * 获取用户信息
 * @returns
 */
export async function getUserInfoService(id: string): Promise<ResDataType> {
  const url = `/api/user/${id}`;
  const data = (await axios.get(url)) as ResDataType;
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
  return data;
}
