/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-11 08:53:31
 * @LastEditors: Austral
 * @LastEditTime: 2023-09-24 20:10:26
 */
// In App.js in a new project

import React from 'react';
import BottomTabNavigator from './BottomTab';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityNavigation } from './modules/Community';
import { MeNavigation } from './modules/Me';
import LoginNavigation from './modules/login';
import { RelieveRoomNavagation } from './modules/RelieveRoom';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

const Navigation = () => {
  const stack = createStackNavigator();

  return (
    <stack.Navigator>
      <stack.Screen
        name={'BOTTOM'}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      {CommunityNavigation(stack)}
      {MeNavigation(stack)}
      {RelieveRoomNavagation(stack)}
    </stack.Navigator>
  );
};

export { BottomTabNavigator, LoginNavigation, Navigation as default };
