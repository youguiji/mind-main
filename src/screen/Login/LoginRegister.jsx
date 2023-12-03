/*
 * @Description: 密码登录
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 15:57:22
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-13 16:12:25
 */
// screens/HomeScreen.js

import { Dialog } from '@rneui/base';
import React, { useState, useRef } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { color } from '../../assets/color';
import { login } from '../../network/modules/user';
import { useDispatch } from 'react-redux';
import { LoginIn } from '../../store/modules/login';
import Icon from '../../components/Icon';
import { useNotification } from '../../components/Notification';
import { getUserInfo } from '../../network/modules/user';

const LoginRegister = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const showNotification = useNotification();

  return (
    <Pressable
      style={styles.outContain}
      onPress={event => {
        phoneRef.current.blur();
        passwordRef.current.blur();
      }}>
      <View style={styles.contains}>
        <Text
          style={{
            fontSize: 40,
            color: color.purple.light,
            paddingTop: 10,
          }}>
          MindInsight
        </Text>
        <Text style={{ marginBottom: 10 }}>属于您的心理专属心理管家</Text>
        <Input
          type="text"
          placeholder="请输入邮箱"
          style={StyleSheet.flatten([{ width: '100%' }, styles.inputBoxItem])}
          keyboardType="numeric"
          value={[phone, setPhone]}
          ref={phoneRef}
        />
        <Input
          type="password"
          placeholder="请输入密码"
          style={StyleSheet.flatten([{ width: '100%' }, styles.inputBoxItem])}
          keyboardType="numeric"
          value={[password, setPassword]}
          ref={passwordRef}
        />
        <Button
          title="登录"
          style={[
            styles.inputBoxItem,
            {
              height: 60,
            },
          ]}
          textStyle={{
            fontSize: 22,
            fontWeight: '500',
          }}
          onPress={async () => {
            try {
              if (password.length != 0 && password.length != 0) {
                const res = await login(phone, password, 'null');
                console.log(res);

                getUserInfo
                  .then(res=>{
                    
                  })
                  .catch(err=>{})

                dispatch(LoginIn());
              } else {
                showNotification('请输入完整的邮箱或密码');
              }
            } catch (error) {
              console.error('Network Error:', error.message);
            }
          }}></Button>
        <Text
          style={{
            color: '#000',
          }}>
          其他方式登录
        </Text>
        <View style={styles.other}>
          <Icon
            style={{ marginRight: 20 }}
            icode={'\ue618'}
            size={20}
            color="rgb(9,187,7)"
          />
          <Icon icode={'\ue6ca'} size={20} color="rgb(54,155,206)" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outContain: {
    height: '100%',
    backgroundColor: '#fff',
  },
  contains: {
    height: '100%',
    paddingHorizontal: 50,
    paddingTop: 80,
    backgroundColor: '#fff',
    display: 'flex',
    color: color.purple.light,
    alignItems: 'center',
  },
  inputBoxItem: {
    marginVertical: 10,
    width: '80%',
  },
  dialog: {
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn: {
    width: '80%',
  },
  bottomBox: {},
  other: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
  bottom: {
    color: '#fff',
    position: 'absolute',
    bottom: 100,
  },
});

export default LoginRegister;
