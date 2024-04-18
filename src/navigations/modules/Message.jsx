/*
 * @Description: 消息模块
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-07 21:21:18
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-30 16:57:00
 */
import { initStackNavigation } from '../navigation';
import React from 'react';

import Message from '../../screen/Messgae/Message';
import MessageDetail from '../../screen/Messgae/MessageDetail';
import SendMessage from '../../screen/Messgae/SendMessage';
import MessageNoticeUp from '../../screen/Messgae/MessageNotice/MessageNoticeUp';
import MessageNoticeAttention from '../../screen/Messgae/MessageNotice/MessageNoticeAttention';
import MessageNoticeComment from '../../screen/Messgae/MessageNotice/MessageNoticeComment';

export const MessageNavigation = Stack => {
  return (
    <>
      {initStackNavigation(Stack, 'MESSAGE', Message)}
      {initStackNavigation(Stack, 'MESSAGEDETAIL', MessageDetail)}
      {initStackNavigation(Stack, 'SENDMESSAGE', SendMessage)}
      {initStackNavigation(Stack, 'MESSAGENOTICEUP', MessageNoticeUp)}
      {initStackNavigation(
        Stack,
        'MESSAGENOTICEATTENTION',
        MessageNoticeAttention,
      )}
      {initStackNavigation(Stack, 'MESSAGENOTICECOMMENT', MessageNoticeComment)}
    </>
  );
};
