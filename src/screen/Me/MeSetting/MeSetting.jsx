/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-20 17:16:26
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-04 01:34:09
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { Avatar } from '@rneui/base';
import ClickItem from '../Components/ClickItem';

const MeSetting = ({ navigation }) => {
  const [title, setTitle] = useState([
    {
      id: 1,
      title: '个人信息',
      destination: 'MESETTINGINFO',
    },
    {
      id: 2,
      title: '账号与安全',
      destination: 'MESETTINGSECRITY',
    },
    {
      id: 3,
      title: '隐私',
      destination: 'MESETTINGPRIVACY',
    },
    {
      id: 4,
      title: '成为咨询师',
      destination: 'MECERTIFICATION',
    },
    {
      id: 5,
      title: '清除缓存',
      destination: '',
    },
    {
      id: 6,
      title: '给我们打赏，支持我们',
      destination: '',
    },
  ]);
  return (
    <View>
      <TitleHeader
        title="设置"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 40 }}>
        {title.map(item => {
          console.log(item.title, item.destination);
          return (
            <ClickItem
              key={item.id}
              navigation={navigation}
              title={item.title}
              destination={item.destination}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default MeSetting;
