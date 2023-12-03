/*
 * @Description: 修改性别
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-17 19:13:29
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-24 12:40:16
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../../../components/TitleHeader';
import Icon from '../../../../../components/Icon';
import {
  changeUserInfo,
  getUserInfo,
} from '../../../../../network/modules/user';

const MeSettingChangeSex = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUserInfo().then(res => {
      console.log(res);
      const { username, birthdate, sex } = res.data;
      setUserInfo({
        username,
        birthdate,
        sex,
      });
      console.log(userInfo);
    });
    return () => {};
  }, []);

  const [sex, setSex] = useState([
    {
      title: '男',
      sex: 1,
      check: false,
    },
    {
      title: '女',
      sex: 0,
      check: true,
    },
  ]);

  useEffect(() => {
    setSex(prevSex =>
      prevSex.map(item => ({
        ...item,
        check: item.sex === userInfo.sex,
      })),
    );
  }, [userInfo.sex, setSex]);
  // const handleSex = updatesex => {
  //   const updateSex = sex.map(item => ({
  //     ...item,
  //     check: item.sex == updatesex,
  //   }));
  //   setSex(updateSex);
  //   const updateItem = updateSex.find(item => item.check);
  //   const updateUserInfo = { ...userInfo, sex: updateItem.sex };
  //   setUserInfo(updateUserInfo);
  //   changeUserInfo().then(res => {
  //     console.log(res);
  //   });
  // };

  return (
    <View>
      <TitleHeader
        title="修改性别"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.wrap}></View>
      {sex.map(item => {
        return (
          <Pressable
            style={styles.box}
            key={item.sex}
            onPress={() => {
              setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                sex: item.sex,
              }));
              console.log(userInfo);
              // 发送请求
              changeUserInfo({ ...userInfo, sex: item.sex }).then(res => {
                console.log(res);
              });
            }}>
            <Text>{item.title}</Text>
            {item.check == true ? (
              <Text style={{ fontFamily: 'iconfont' }}>{'\ue60a'}</Text>
            ) : (
              <></>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 40,
  },
  box: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

export default MeSettingChangeSex;
