/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-25 19:16:18
 * @LastEditors: Austral
 * @LastEditTime: 2023-09-25 19:58:15
 */
import React from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
/**
 * @description:
 * @param {string} title 标题
 * @param {function} onPress 点击触发事件
 * @param {object} style 按钮的样式
 * @param {object} textStyle 标题样式
 * @param {boolean} disabled 是否不可点击，默认为false
 * @param {object} children Button组件的子元素
 * @return {ReactNode} Button组件
 * @author: Austral
 */
const Button = ({
  title = '',
  onPress = () => {},
  style = {},
  children,
  textStyle = {},
  disabled = false,
}) => {
  const pressFn = disabled ? () => {} : onPress;
  return (
    <Pressable
      style={StyleSheet.flatten([styles.view, style])}
      onPress={pressFn}>
      <Text style={StyleSheet.flatten([styles.text, textStyle])}>{title}</Text>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  view: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9471E3',
    borderRadius: 16,
  },
  text: {
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Button;
