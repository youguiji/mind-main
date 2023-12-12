/*
 * @Description: 获取验证码
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 15:57:22
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-11 10:59:25
 */

// screens/HomeScreen.js
import Dialog from '../../components/Notification';
import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { color } from '../../assets/color';
import { getCode, getUserInfo, login } from '../../network/modules/user';
import { useDispatch } from 'react-redux/es/exports';
import Icon from '../../components/Icon';
import { useNotification } from '../../components/Notification';
import { LoginIn } from '../../store/modules/login';
import { setUserInfoState, setUserToken } from '../../store/modules/user';
import { getData, storeData } from '../../store/AsyncStorage';

const LoginGetcode = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const codeRef = useRef(null);
  const showNotification = useNotification(); //消息提示

  const { phone } = route.params; //手机号

  //请求验证码
  useEffect(() => {
    console.log('getcode');
    console.log(typeof phone);
    // getCode(phone, 'login').then(res => {
    //   console.log(res);
    // });
  }, []);
  return (
    <Pressable
      style={styles.outContent}
      onPress={event => {
        codeRef.current.blur();
      }}>
      <View style={styles.contains}>
        <Text
          style={{
            fontSize: 40,
            color: color.purple.light,
            paddingTop: 10,
          }}>
          {' '}
          MindInsight{' '}
        </Text>
        <Text style={{ marginBottom: 10 }}>属于您的心理专属心理管家</Text>

        <Input
          type="number"
          placeholder="请输入验证码"
          style={StyleSheet.flatten([{ width: '100%' }, styles.inputBoxItem])}
          keyboardType="numeric"
          value={[code, setCode]}
          ref={codeRef}
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
          onPress={() => {
            if (code.length == 6) {
              console.log(phone, code, typeof phone, typeof code);
              //改变登录状态
              dispatch(LoginIn()); //(待删)
              login(phone, 'null', code)
                .then(res => {
                  console.log(res);
                  if (res.ok) {
                    dispatch(setUserToken(res.data.tokenValue)); //
                    getUserInfo() //获取用户信息
                      .then(res => {
                        console.log(res);
                        dispatch(setUserInfoState(res.data));
                        //storeData('userInfo', res.data); //本地缓存useInfo
                        //getData('userInfo').then(res => console.log(res)); //获取缓存
                      })
                      .catch(err => {
                        console.log('getUserInfoError:', err);
                      });

                    dispatch(LoginIn());
                    storeData('token', res.data.tokenValue); //本地缓存token
                  }
                })
                .catch(err => {
                  console.log('loginErr:' + err);
                });
            } else {
              showNotification('请输入完整的验证码');
            }
          }}></Button>
        <Text
          style={{
            color: '#000',
          }}>
          其他方式登录
        </Text>
        <View style={styles.other}>
          <Pressable>
            <Icon
              style={{ marginRight: 20 }}
              icode={'\ue618'}
              size={20}
              color="rgb(9,187,7)"
            />
          </Pressable>
          <Pressable>
            <Icon
              style={{ marginRight: 20 }}
              icode={'\ue6ca'}
              size={20}
              color="rgb(54,155,206)"
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outContent: {
    height: '100%',
    backgroundColor: '#fff',
  },
  contains: {
    height: '100%',
    paddingHorizontal: 50,
    paddingTop: 80,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  inputBoxItem: {
    marginVertical: 10,
    width: '80%',
  },
  btn: {
    width: '80%',
  },
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

export default LoginGetcode;
