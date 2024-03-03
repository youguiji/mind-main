/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-05 20:35:48
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-05 21:47:43
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from '../assets/color';

const Tag = ({ text }) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: color.purple.light, // 背景颜色
    borderRadius: 10, // 圆角大小
    paddingHorizontal: 8, // 左右内边距
    paddingVertical: 3, // 上下内边距
    marginRight: 4, // 左右边距
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  tagText: {
    color: '#fff', // 文字颜色
    fontSize: 12, // 字体大小
  },
});

export default Tag;
