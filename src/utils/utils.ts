import CryptoJS from 'crypto-js';

// 加密密码
export const encryptPassword = (password: string): string => {
  const hashedPassword = CryptoJS.SHA256(`${password}${import.meta.env.CRYPTO_SECRET}`).toString(CryptoJS.enc.Hex);
  return hashedPassword;
};

// 判断两个数组是否相等
export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
};
