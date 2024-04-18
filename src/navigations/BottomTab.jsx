/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-11 09:03:41
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-13 20:33:38
 */
// navigation/BottomTabNavigator.js

import React from 'react';
import { initBottomNavigation } from './navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Me from '../screen/Me/Me';
import Community from '../screen/Community/Community';
import { COMMUNITY, ME } from './navigationNames';
import RelieveRoom from '../screen/RelieveRoom/RelieveRoom';
import Message from '../screen/Messgae/Message';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      {initBottomNavigation('社区', COMMUNITY, Community, '\ue609', Tab)}
      {initBottomNavigation(
        '解忧室',
        'RELIEVEROOM',
        RelieveRoom,
        '\ue63d',
        Tab,
      )}
      {initBottomNavigation('消息', 'MESSAGE', Message, '\ue630', Tab)}
      {initBottomNavigation('我的', 'ME', Me, '\ue66b', Tab)}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
