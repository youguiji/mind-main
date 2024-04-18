/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-17 10:40:01
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 21:25:54
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
  url,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            paddingRight: 10,
            paddingBottom: 10,
            fontSize: 15,
            fontWeight: '900',
            color: '#333',
            paddingTop: 20,
          }}
          numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.contentBox}>
          <Text
            style={{ paddingBottom: 20, width: '100%', fontSize: 14 }}
            numberOfLines={3}>
            {content}
          </Text>
          {/* {url && (
            <View style={styles.imgBox}>
              <Image style={styles.img} source={{ uri: url }} />
            </View>
          )} */}
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar size={28} rounded source={{ uri: avatar }} />
        <Text style={{ padding: 5, fontSize: 12 }}>{username}</Text>
        <Pressable style={styles.health}>
          <Text style={styles.healthText}>心理健康师</Text>
        </Pressable>
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
    // marginTop: 5,

    marginHorizontal: 10,
    borderRadius: 16,
    fontSize: 16,
    borderColor: 'rgb(243,243,243)',
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000', // 阴影颜色
    shadowOpacity: 0.3, // 阴影透明度
    shadowRadius: 5, // 阴影模糊半径
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },

  health: {
    height: 25,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
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
