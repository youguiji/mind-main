/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-22 10:52:55
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-18 09:42:51
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const ClickItem = ({ title, navigation, destination }) => {
  return (
    <Pressable
      style={styles.itemBox}
      onPress={() => {
        {
          console.log(title,destination);
          if (destination != '') {
            navigation.navigate(destination);
          }
        }
      }}>
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#ccc' }}>
          {'\ueb03'}
        </Text>
      </View>
    </Pressable>
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

export default ClickItem;
