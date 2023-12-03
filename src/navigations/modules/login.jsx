/*
 * @Description: 登录导航
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-13 22:06:05
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-12 11:45:39
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { initAuthNavigation, initStackNavigation } from '../navigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../screen/Login/Login';
import LoginRegister from '../../screen/Login/LoginRegister';
import { LOGIN } from '../navigationNames';
import LoginGetcode from '../../screen/Login/LoginGetcode';

const LoginNavigation = () => {
  const LoginStack = createStackNavigator();

  return (
    <LoginStack.Navigator>
      {initStackNavigation(LoginStack, 'LOGIN', Login)}
      {initAuthNavigation("密码登录",'LOGINREGISTER', LoginRegister, LoginStack)}
      {initAuthNavigation(
        '获取验证码',
        'LOGINGETCODE',
        LoginGetcode,
        LoginStack,
      )}
    </LoginStack.Navigator>
  );
};

export default LoginNavigation;
