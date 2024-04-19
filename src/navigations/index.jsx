/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-11 08:53:31
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-15 20:41:24
 */
// In App.js in a new project

import React from 'react';
import { View } from 'react-native';
import BottomTabNavigator from './BottomTab';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityNavigation } from './modules/Community';
import { MeNavigation } from './modules/Me';
import { MessageNavigation } from './modules/Message';
import LoginNavigation from './modules/login';
import { RelieveRoomNavagation } from './modules/RelieveRoom';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import VoiceNavigaion from '../components/VoiceNavigation';
import WaveAnimation from '../components/WaveAnimation';

const GlobalContainer = () => {
  return (
    <View
      style={{
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 10,
        right: 20,
      }}>
      <VoiceNavigaion />
      <WaveAnimation text={'我要发布文章'} duration={10000} />
    </View>
  );
};

const Navigation = () => {
  const stack = createStackNavigator();

  return (
    <stack.Navigator>
      {/* <stack.Screen
        name="Global"
        component={GlobalContainer}
        options={{ headerShown: false }}
      /> */}
      <stack.Screen
        name={'BOTTOM'}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      {CommunityNavigation(stack)}
      {MeNavigation(stack)}
      {MessageNavigation(stack)}
      {RelieveRoomNavagation(stack)}
    </stack.Navigator>
  );
};

export { BottomTabNavigator, LoginNavigation, Navigation as default };
