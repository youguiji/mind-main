/*
 * @Description: 账号与安全
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-22 16:41:40
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-23 23:07:49
 */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import TitleHeader from '../../../../components/TitleHeader';
import ClickItem from '../../Components/ClickItem';
import {
  getUserInfo,
  getCode,
  changePassword,
} from '../../../../network/modules/user';
import { color } from '../../../../assets/color';
import { useNotification } from '../../../../components/Notification';
import { selectUserInfo } from '../../../../store/modules/user';
import { useSelector } from 'react-redux';

const MeSettingSecrity = ({ navigation }) => {
  const userInfo = useSelector(selectUserInfo);
  const showNotification = useNotification();

  const phoneRef = useRef(null);
  const oldPassRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPassRef = useRef(null);
  const codeRef = useRef(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const finish = () => {
    if (
      code.length != 0 &&
      phone.length != 0 &&
      oldPass.length != 0 &&
      newPassword.length != 0 &&
      confirmPass.length != 0 &&
      newPassword == confirmPass
    ) {
      changePassword(phone, oldPass, newPassword, confirmPass, code)
        .then(res => {
          console.log(res);
          if (res.ok) {
            showNotification('修改成功');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      showNotification('请输入完整信息');
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Pressable
      style={{ height: '100%' }}
      onPress={event => {
        phoneRef.current.blur();
      }}>
      <TitleHeader
        title="账号安全"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {
          return (
            <Pressable style={styles.btn} onPress={finish}>
              <Text style={styles.btnText}>完成</Text>
            </Pressable>
          );
        }}
      />
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>账号:</Text>
            <TextInput
              ref={phoneRef}
              style={styles.input}
              value="account"
              onChangeText={setPhone}
            />
          </View>
          <Pressable
            Pressable={() => {
              if (phone.length != 0) {
                getCode(phone, 'login')
                  .then(res => {
                    showNotification('已发送验证码，请注意查收！');
                    console.log(res);
                  })
                  .catch(err => {
                    showNotification('验证码发送失败');
                    console.log(err);
                  });
              }
            }}>
            <Text>获取验证码</Text>
          </Pressable>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>验证码:</Text>
          <TextInput
            ref={codeRef}
            style={styles.input}
            value="code"
            onChangeText={setCode}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>旧密码:</Text>
          <TextInput
            ref={oldPassRef}
            style={styles.input}
            value="oldPass"
            onChangeText={setOldPass}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>新密码:</Text>
          <TextInput
            ref={newPasswordRef}
            style={styles.input}
            value="newPassword"
            onChangeText={setNewPassword}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>确认密码:</Text>
          <TextInput
            ref={newPasswordRef}
            style={styles.input}
            value="confirmPassword"
            onChangeText={setConfirmPass}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  container: {
    marginTop: 40,
  },
  title: {
    marginRight: 10,
  },
  btn: {
    backgroundColor: color.purple.deep,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MeSettingSecrity;
