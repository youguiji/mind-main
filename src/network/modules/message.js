/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-12-07 20:25:06
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-07 20:25:31
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