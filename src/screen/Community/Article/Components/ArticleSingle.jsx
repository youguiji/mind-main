/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-17 10:40:01
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-27 21:35:58
 */
import { Avatar } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

const ArticleSingle = ({
  avatar,
  username,
  content,
  title,
  onPress = () => {},
  sun,
  comment,
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
        <Text style={{ padding: 5 }}>{username}name</Text>
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
            <Image style={styles.img} source={{ uri: pictures[0] }} />
          </View>
        </View>
      </View>
      <View style={styles.commentBox}>
        <Text style={{ fontFamily: 'iconfont', fontSize: 18 }}>{'\ue64a'}</Text>
        <Text>12{sun}</Text>
        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginLeft: 20 }}>
          {'\ue74e'}
        </Text>
        <Text>12{comment}</Text>
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
    margin: 10,
    borderRadius: 20,
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
    position: 'relative',
  },
});

export default ArticleSingle;
