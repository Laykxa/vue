import CryptoJS from 'crypto-js'

// 密钥
const SECRET_KEY = 'your-secret-key'

// MD5加密
export const md5 = (text) => {
  return CryptoJS.MD5(text).toString()
}

// 生成随机盐值
export const generateSalt = (length = 16) => {
  return CryptoJS.lib.WordArray.random(length).toString()
}

// 带盐值的密码加密
export const encryptPassword = (password, salt) => {
  const saltedPassword = md5(password + salt)
  const timestamp = new Date().getTime()
  return {
    password: md5(saltedPassword + timestamp),
    salt,
    timestamp
  }
}