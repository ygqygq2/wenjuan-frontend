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
