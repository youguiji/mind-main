/*
 * @Description: login
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 15:57:22
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-13 20:13:16
 */

// import Dialog from '../../components/Notification';
import React, { useState, useRef } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { color } from '../../assets/color';
import { getCode, login } from '../../network/modules/user';
import { useDispatch } from 'react-redux/es/exports';
import Icon from '../../components/Icon';
import { LoginIn } from '../../store/modules/login';
import { useNotification } from '../../components/Notification';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);

  const showNotification = useNotification();
  const phoneRef = useRef(null);

  return (
    <Pressable
      style={styles.outContent}
      onPress={event => {
        phoneRef.current.blur();
      }}>
      <View style={styles.contains}>
        {/* <View>
          <Dialog visible={visible} message="请输入登录邮箱" />
        </View> */}
        <Text
          style={{
            fontSize: 40,
            color: color.purple.light,
            paddingTop: 10,
            // paddingVertical: 20,
          }}>
          {' '}
          MindInsight{' '}
        </Text>
        <Text style={{ marginBottom: 10 }}>属于您的心理专属心理管家</Text>
        <Input
          type="text"
          placeholder="请输入登录邮箱或者手机号"
          style={StyleSheet.flatten([{ width: '100%' }, styles.inputBoxItem])}
          keyboardType="numeric"
          value={[phone, setPhone]}
          ref={phoneRef}
        />
        <Button
          title="获取验证码"
          style={[
            styles.inputBoxItem,
            {
              height: 60,
            },
          ]}
          textStyle={{
            fontSize: 18,
            fontWeight: '500',
          }}
          onPress={async () => {
            dispatch(LoginIn);
            try {
              if (phone.length != 0) {
                const res = await getCode(phone, 'login');
                console.log(res);
                // if (res.code != '00000') {
                //   showNotification(res.message);
                // }
                navigation.navigate('LOGINGETCODE', {
                  phone: phone,
                });
                showNotification('验证码已发送，请注意查收');
              } else {
                showNotification('请输入邮箱哦！');
              }
            } catch (error) {
              console.error('Network Error: ', error.message);
            }
          }}></Button>
        <Button
          title="密码登录"
          style={[
            styles.inputBoxItem,
            {
              height: 60,
            },
          ]}
          textStyle={{
            fontSize: 18,
            fontWeight: '500',
          }}
          onPress={() => {
            navigation.navigate('LOGINREGISTER');
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
    width: '100%',
    height: '100%',
    paddingHorizontal: 50,
    paddingTop: 80,
    marginTop: 40,
    backgroundColor: '#fff',
    display: 'flex',
    color: '#fff',
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

export default Login;
