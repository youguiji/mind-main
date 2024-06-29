/*
 * @Description:精选分类
 * @Version:
 * @Autor: Austral
 * @Date: 2024-05-03 14:27:10
 * @LastEditors: Austral
 * @LastEditTime: 2024-05-03 14:28:44
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from '../../../../assets/color';

const ArticleClassification = ({
  avatar,
  username,
  content,
  title,
  tagText,
  onPressChat,
}) => {
  return (
    <View style={styles.container}>
      <Avatar size={28} source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.info}>{content}</Text>
        {/* <View style={styles.boldContainer}>
          <Text style={styles.boldText}>{boldText}</Text>
        </View> */}
        {/* <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tagText}</Text>
          </View>
        </View> */}
      </View>
      {/* <TouchableOpacity style={styles.chatButton} onPress={onPressChat}>
        <Text style={styles.chatButtonText}>私聊</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  avatar: {
    width: 50,
    height: 60,
    borderRadius: 14,
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
    marginVertical: 15,
  },
  boldContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
    color: color.purple.deep,
  },
  chatButton: {
    backgroundColor: 'rgb(228,224,247)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonText: {
    fontSize: 12,
    color: color.purple.deep,
  },
});

export default ArticleClassification;
