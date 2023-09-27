import jwt_decode from 'jwt-decode';

import { USER_TOKEN_KEY } from '@/config/constants';

export function setToken(token: string) {
  localStorage.setItem(USER_TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(USER_TOKEN_KEY) || '';
}

export function removeToken() {
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function isTokenExpired(token: string) {
  if (!token) {
    return true; // 令牌为空，表示已过期
  }
  const decodedToken = jwt_decode<DecodedToken>(token);
  const expirationTime = decodedToken.exp * 1000; // 将过期时间转换为毫秒

  return Date.now() > expirationTime; // 检查当前时间是否晚于过期时间
}
