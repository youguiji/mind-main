/*
 * @Description: 消息模块
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-07 21:21:18
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-07 15:34:46
 */
import { initStackNavigation } from '../navigation';
import React from 'react';

import Message from '../../screen/Messgae/Message';
import MessageDetail from '../../screen/Messgae/MessageDetail';
import SendMessage from '../../screen/Messgae/SendMessage';

export const MessageNavigation = Stack => {
  return (
    <>
      {initStackNavigation(Stack, 'MESSAGE', Message)}
      {initStackNavigation(Stack, 'MESSAGEDETAIL', MessageDetail)}
      {initStackNavigation(Stack,'SENDMESSAGE',SendMessage)}
    </>
  );
};
