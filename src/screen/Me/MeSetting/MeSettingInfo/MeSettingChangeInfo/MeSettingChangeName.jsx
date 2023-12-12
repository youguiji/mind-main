/*
 * @Description: 修改昵称
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-17 19:12:54
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-24 11:36:31
 */

import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import TitleHeader from '../../../../../components/TitleHeader';
import {
  changeUserInfo,
  getUserInfo,
} from '../../../../../network/modules/user';

const MeSettingChangeName = ({ navigation }) => {
  const nameRef = useRef(null);
  const [name, setName] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo().then(res => {
      const { username, birthdate, sex } = res.data;
      setName(res.data.username);
      setUserInfo({
        username,
        birthdate,
        sex,
      });
    });
  }, []);

  return (
    <Pressable
      style={{ height: '100%' }}
      onPress={event => {
        nameRef.current.blur();
      }}>
      <TitleHeader
        title="修改昵称"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.box}>
        <Text style={styles.title}>昵称:</Text>
        <TextInput
          ref={nameRef}
          style={styles.input}
          value={userInfo.username}
          onChangeText={text =>
            setUserInfo(prevUserInfo => ({ ...prevUserInfo, username: text }))
          }
          onBlur={() => {
            console.log(userInfo);
            changeUserInfo({...userInfo}).then(res => {
              console.log(res);
            });
          }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default MeSettingChangeName;
