/*
 * @Description: 输入框组件
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-04 04:55:38
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 08:56:57
 */
import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({
  title,
  value,
  onChangeText,
  onBlur,
  placeholder,
}) => {
  const inputRef = useRef(null);

  return (
    <View style={styles.container}>
      <View
        style={
          {
            // width: 80,
            // alignItems: 'center',
            // justifyContent: 'center',
          }
        }>
        <Text style={{ color: '#000' }}>{title}</Text>
      </View>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 50,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    height: 40,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default CustomTextInput;
