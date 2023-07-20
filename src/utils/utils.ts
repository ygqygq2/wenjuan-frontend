import CryptoJS from 'crypto-js';

// 加密密码
export const encryptPassword = (password: string): string => {
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return hashedPassword;
};
