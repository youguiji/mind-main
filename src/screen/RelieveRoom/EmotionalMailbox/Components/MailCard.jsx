/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-31 07:56:39
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 22:18:35
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const MailCard = ({ title, content, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          paddingBottom: 10,
          color: '#000',
        }}>
        {title}
      </Text>
      <Text
        numberOfLines={3}
        style={{
          color: '#000',
          fontSize: 12,
          paddingBottom: 10,
          fontWeight: '400',
        }}>
        {content}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 20,
    marginTop: -10,
    height: 140,
    paddingVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'rgb(255,237,233)',
  },
});

export default MailCard;
