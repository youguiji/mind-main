/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-17 10:40:01
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-30 15:32:53
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
          alignItems: 'center',
        }}>
        <Avatar size={32} rounded source={{ uri: avatar }} />
        <Text style={{ padding: 5 }}>{username}</Text>
        <Pressable style={styles.health}>
          <Text style={styles.healthText}>心理健康师</Text>
        </Pressable>
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
            {/* <Image style={styles.img} source={{ uri: pictures[0].url }} /> */}
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
  health: {
    height: 25,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: 'rgb(255,236,245)',
    borderRadius: 10,
  },
  healthText: {
    color: 'rgb(255,130,192)',
    fontSize: 8,
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
