/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-23 19:59:04
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-24 20:32:33
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/base';
import { color } from '../../../assets/color';

const ConsultantCard = ({
  avatar,
  username,
  line1,
  boldText,
  tagText,
  onPressChat,
}) => {
  return (
    <View style={styles.container}>
      <Avatar size={68} source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.info}>{line1}</Text>
        <View style={styles.boldContainer}>
          <Text style={styles.boldText}>{boldText}</Text>
        </View>
        {/* <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tagText}</Text>
          </View>
        </View> */}
      </View>
      <TouchableOpacity style={styles.chatButton} onPress={onPressChat}>
        <Text style={styles.chatButtonText}>私聊</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 100,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  info: {
    fontSize: 13,
    marginBottom: 5,
  },
  boldContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#ccc',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
  },
  chatButton: {
    backgroundColor: color.purple.light,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default ConsultantCard;
