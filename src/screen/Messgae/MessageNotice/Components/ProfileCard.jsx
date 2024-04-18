/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-30 11:57:52
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-15 14:39:41
 */
import { Avatar } from '@rneui/base';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { color } from '../../../../assets/color';

const ProfileCard = ({
  userName,
  lastSeen,
  onPressButton,
  profileImageURL,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Avatar size={32} rounded source={{ uri: profileImageURL }} />
        {/* <Image
          source={{ uri: profileImageURL }}
          style={styles.profileImage}
          resizeMode="cover"
        /> */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.lastSeen}>上次在线 {lastSeen}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressButton}>
        <Text style={styles.buttonText}>关注</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#ff0000', // Red color border
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  lastSeen: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    // backgroundColor: '#ff0000', // Red color background
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.purple.light,
  },
  buttonText: {
    color: color.purple.light,
    // fontWeight: 'bold',
  },
});

export default ProfileCard;
