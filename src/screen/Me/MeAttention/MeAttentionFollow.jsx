/*
 * @Description: 关注列表
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-03 20:40:11
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-06 19:43:18
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
      name: 'user1',
      avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    },
    {
      id: 2,
      name: 'user2',
      avatar: '',
    },
    {
      id: 3,
      name: 'user3',
      avatar: '',
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
              style={styles.listBox}
              onPress={() => {
                navigation.navigate('MEATTENTIONPERPAGE');
              }}>
              <Avatar rounded source={{ uri: item.avatar }} />
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
    height: 50,
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
