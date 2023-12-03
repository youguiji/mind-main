/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-14 10:55:13
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-12 11:46:38
 */
import { formToJSON } from 'axios';
import * as React from 'react';
import { Text } from 'react-native';
import Icon from '../components/Icon';

const initBottomNavigation = (
  title,
  name,
  component,
  iconCode,
  navigator,
  fontColor = '#000000',
  activeFontColor = '#9471E3',
  headerShown = false,
  fontSize = 10,
) => {
  return (
    <navigator.Screen
      name={name}
      component={component}
      options={{
        headerShown: headerShown,
        title: title,
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={{
                color: focused ? activeFontColor : fontColor,
                fontSize: fontSize,
              }}>
              {title}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (iconCode == 'logo') {
            return (
              <Text
                style={{
                  fontFamily: 'iconfont',
                  color: focused ? activeFontColor : fontColor,
                  fontSize: 20,
                }}>
                {iconCode}
              </Text>
            );
          }
          return (
            <Text
              style={{
                fontFamily: 'iconfont',
                color: focused ? activeFontColor : fontColor,
                fontSize: 20,
              }}>
              {iconCode}
            </Text>
          );
        },
      }}
    />
  );
};

const initAuthNavigation = (
  title,
  name,
  component,
  navigator,
  headerShown = true,
) => {
  return (
    <navigator.Screen
      name={name}
      component={component}
      options={{ title: title, headerShown: headerShown }}
    />
  );
};

const initStackNavigation = (Stack, name, component, otherOptions = {}) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={({ navigation, route }) => ({
        headerShown: false,
        ...otherOptions,
      })}
    />
  );
};

export { initStackNavigation, initAuthNavigation, initBottomNavigation };
