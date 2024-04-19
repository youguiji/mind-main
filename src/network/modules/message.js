/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-12-07 20:25:06
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-11 14:58:13
 */

import {
  Get,
  Put,
  Post
} from '../requests'

/**
 * @description: 获取聊天分页
 * @param {integer} pageNum
 * @param {integer} pageSize
 * @return {*}
 * @author: Austral
 */
export const getChatGroup = (pageNum, pageSize) => {
  return Post({
    url: '/chat/group/page',
    data: {
      pageNum,
      pageSize,
    }
  })

}

/**
 * @description: 获取用户聊天记录
 * @param {string} viewId
 * @param {*} dateTime
 * @return {*}
 * @author: Austral
 */
export const getChathistory = (viewId, dateTime) => {
  return Post({
    url: '/chat/user',
    data: {
      viewId,
      dateTime,
    }
  })
}

/**
 * @description: 获取事件分页提醒
 * @param {string} action 获取事件类型如like
 * @param {integer} pageNum 
 * @param {pageSize} pageSize
 * @return {*}
 * @author: Austral
 */
export const getChatEvent = (action,pageNum,pageSize) => {
  return Post({
    url: '/chat/user',
    data: {
      action,
      pageNum,
      pageSize,
    }
  })
}