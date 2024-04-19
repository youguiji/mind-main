/*
 * @Description: 关注列表
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-03 20:40:11
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-14 08:42:36
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { Avatar } from '@rneui/base';
import { color } from '../../../assets/color';

const MeAttentionFollow = ({ route, navigation }) => {
  const [fans, setFans] = useState([
    {
      id: 1,
      name: 'austrul',
      avatar:
        'https://p8.itc.cn/q_70/images03/20211110/73e3c30851a44f95907026692f559fa5.jpeg',
    },
  ]);

  const { id } = route.params;
  console.log(id);

  return (
    <View style={styles.container}>
      <TitleHeader
        title="关注列表"
        navigator={navigation}
        headLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contain}>
        {fans.map(item => {
          return (
            <Pressable
              key={item.id}
              style={styles.listBox}
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

export default MeAttentionFollow;
