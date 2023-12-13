/*
 * @Description: userAPI
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-13 20:57:00
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-10 14:07:43
 */
import {
  Get,
  Post,
  Put
} from '../requests';

/**
 * @description: 获取验证码
 * @param {String} account 邮箱
 * @param {String} action 行为
 * @return {*}
 * @author: Austral
 */
export const getCode = (account, action) => {
  return Get({
    url: '/profile/user/code',
    params: {
      account,
      action,
    }
  })
}

/**
 * @description: 登录
 * @param {String} account 手机号
 * @param {String} password 密码
 * @param {String} code 验证码
 * @return {*}
 * @author: Austral
 */
export const login = (
  account,
  password,
  code
) => {
  return Post({
    url: '/profile/user/login',
    data: {
      account,
      password,
      code,
    },

  })
}

/**
 * @description: 注销登录
 * @return {*}
 * @author: Austral
 */
export const loginOut = () => {
  return Get({
    url: '/profile/user/logout'
  })
}

/**
 * @description: 获取本机用户信息
 * @param {string} id 用户id
 * @return {*}
 * @author: Austral
 */
export const getUserInfo = (id) => {
  return Get({
    url: '/profile/user/info/detail',
  })
}

/**
 * @description: 获取其他用户信息
 * @param {string} userId 用户id
 * @return {*}
 * @author: Austral
 */
export const getUsersInfo = (userId) => {
  return Get({
    url: `/profile/user/${userId}`,
  })
}

/**
 * @description: 修改密码
 * @param {String} account 账户
 * @param {String} newPass 新密码
 * @param {String} confirmPass 确认密码
 * @param {String} code 验证码
 * @return {*}
 * @author: Austral
 */
export const changePassword = ({
  account,
  newPass,
  confirmPass,
  code
}) => {
  return Put({
    url: '/profile/user/password',
    data: {
      account,
      newPass,
      confirmPass,
      code,
    }
  })
}

/**
 * @description: 修改用户信息
 * @param {String} username 用户名
 * @param {String} birthdate 生日
 * @param {Number} sex 性别 1为男，2为女
 * @return {*}
 * @author: Austral
 */
export const changeUserInfo = (
  username,
  birthdate,
  sex
) => {
  return Put({
    url: '/profile/user/info',
    data: {
      username,
      birthdate,
      sex
    }
  })
}

/**
 * @description: 修改头像
 * @param {object} formData 文件
 * @return {*}
 * @author: Austral
 */
export const changeAvatar = (
  formData
) => {
  return Post({
    url: '/profile/user/avatar',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData
  })
}

/**
 * @description: 日记分页查询
 * @param { String } categoryId 日记ID
 * @param { Number} pageNum 
 * @param { Number} pageSize
 * @return {*}
 * @author: Austral
 */
export const getUserDirary = ({
  categoryId,
  pageNum,
  pageSize
}) => {
  return Post({
    url: '/profile/diary/page',
    data: {
      categoryId,
      pageNum,
      pageSize
    }
  })
}


/**
 * @description: 添加日记分类
 * @param {String} name 分类
 * @return {*}
 * @author: Austral
 */
export const addDiraryCategory = ({
  name
}) => {
  return Post({
    url: '/profile/diary/category',
    data: {
      name
    }
  })
}

/**
 * @description: 添加or修改日记
 * @param {string} content
 * @param {string} title
 * @param {string} id 日记id
 * @param {string} categoryId 分类id
 * @return {*}
 * @author: Austral
 */
export const changeDirary = ({
  content,
  title,
  categoryId,
  id
}) => {
  return Post({
    url: '/profile/diary',
    data: {
      content,
      title,
      categoryId,
      id
    }
  })
}


/**
 * @description: 查询日记详情
 * @param {String} id 日记
 * @return {*}
 * @author: Austral
 */
export const getDiraryDetail = ({
  id
}) => {
  return Get({
    url: '/profile/diary',
    params: {
      id
    }
  })
}

/**
 * @description: 查询日记分类
 * @return {*}
 * @author: Austral
 */
export const getDiraryCategory = () => {
  return Get({
    url: '/profile/diary',
  })
}