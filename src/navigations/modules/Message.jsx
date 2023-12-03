/*
 * @Description: 消息模块
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-10-07 21:21:18
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-07 21:25:10
 */
import { initStackNavigation } from '../navigation';
import React from 'react';

import Message from '../../screen/Messgae/Message';

export const MessageNavigation = Stack =>{
  return (
    <>
    {initStackNavigation(Stack, 'MESSAGE', Message)}
    </>
  )
}