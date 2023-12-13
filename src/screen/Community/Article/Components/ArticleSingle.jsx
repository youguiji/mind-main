/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-17 10:40:01
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-13 10:59:23
 */
import { Avatar } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Icon from '../../../../components/Icon';

const ArticleSingle = ({
  avatar,
  username,
  content,
  title,
  onPress = () => {},
  sun,
  viewCount,
  pictures,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Avatar size={32} rounded source={{ uri: avatar }} />
        <Text style={{ padding: 5 }}>{username}</Text>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{ paddingRight: 10, paddingBottom: 10, fontSize: 16 }}
          numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.contentBox}>
          <Text style={{ paddingBottom: 20, width: '60%' }} numberOfLines={3}>
            {content}
          </Text>
          <View style={styles.imgBox}>
            <Image style={styles.img} source={{ uri: pictures }} />
          </View>
        </View>
      </View>
      <View style={styles.commentBox}>
        <Icon icode={'\ue64a'} size={18}></Icon>
        <Text style={styles.iconMargin}>{sun}</Text>
        <Icon icode={'\ue634'} size={16}></Icon>
        <Text style={styles.iconMargin}>{viewCount}</Text>
        <Text
          style={{
            fontFamily: 'iconfont',
            fontSize: 20,
            position: 'absolute',
            right: 20,
            top: 10,
          }}>
          {'\ue612'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 10,
    //borderRadius: 20,
    fontSize: 16,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  imgBox: {
    flex: 1,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 20,
  },
  commentBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconMargin: {
    paddingLeft: 8,
    paddingRight: 20,
  },
});

export default ArticleSingle;
