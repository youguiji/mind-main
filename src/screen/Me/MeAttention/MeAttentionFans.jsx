/*
 * @Description: 粉丝列表
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-03 20:40:51
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-14 08:39:47
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { Avatar } from '@rneui/base';
import { color } from '../../../assets/color';

const MeAttentionFans = ({ navigation }) => {
  const [fans, setFans] = useState([
    {
      id: 1,
      name: '今日不定',
      avatar:
        'https://img2.baidu.com/it/u=2563905782,171946313&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    },
    {
      id: 2,
      name: '乌鸦和麻雀',
      avatar:
        'https://img1.baidu.com/it/u=4243707043,517558408&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    },
  ]);

  return (
    <View style={styles.container}>
      <TitleHeader
        title="粉丝列表"
        navigator={navigation}
        headLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contain}>
        {fans.map(item => {
          return (
            <Pressable
              style={styles.listBox}
              key={item.id}
              onPress={() => {
                navigation.navigate('MEATTENTIONPERPAGE');
              }}>
              <Avatar size={40} rounded source={{ uri: item.avatar }} />
              <Text style={styles.text}>{item.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  contain: {
    marginTop: 40,
  },
  listBox: {
    height: 70,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: color.gray.light,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
});

export default MeAttentionFans;
