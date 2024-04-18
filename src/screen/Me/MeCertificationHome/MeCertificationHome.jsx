/*
 * @Description: 咨询主页
 * @Version:
 * @Autor: Austral
 * @Date: 2024-04-17 10:33:33
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 22:06:52
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { color } from '../../../assets/color';
import { Avatar } from '@rneui/base';
import { getUserInfo } from '../../../network/modules/user';
import Icon from '../../../components/Icon';

const MeCertificationHome = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    getUserInfo().then(res => {
      setUserInfo(res.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* 头像信息卡片 */}
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar size={40} source={{ uri: userInfo.avatar }} rounded />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: '#000',
              fontWeight: '600',
            }}>
            {userInfo.username}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 5,
            borderWidth: 1,
            height: 34,
            borderColor: color.pink,
            marginLeft: 10,
          }}>
          <Text style={{ color: color.pink }}>我的主页</Text>
        </Pressable>
      </View>
      {/* 我的咨询室 */}
      <View
        style={{
          padding: 10,
          backgroundColor: 'rgb(255,240,232)',
          borderRadius: 16,
          width: '100%',
          height: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View>
          <Text style={{ fontSize: 16, color: 'rgb(254,139,83)' }}>
            我的咨询室
          </Text>
          <Text style={{ color: '#000', fontSize: 12 }}>免费量表等你测</Text>
        </View>
        <Pressable
          style={{
            backgroundColor: 'rgb(255,152,120)',
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 5,
            // borderWidth: 1,
            height: 30,
            // borderColor: color.pink,
            marginLeft: 10,
          }}>
          <Text style={{ color: '#fff' }}>检测</Text>
        </Pressable>
      </View>
      {/* 我的服务 */}
      <View style={styles.contain}>
        <Text style={styles.text}>我的服务</Text>
        <View style={styles.serviceBox}>
          <View style={styles.iconBox}>
            <Icon size={24} icode={'\ue604'} color={color.pink} />
            <Text style={{ marginVertical: 10 }}>我的咨询</Text>
          </View>
          <View style={styles.iconBox}>
            <Icon icode={'\ue607'} size={24} color={color.pink} />
            <Text style={{ marginVertical: 10 }}>我的倾诉</Text>
          </View>
          <View style={styles.iconBox}>
            <Icon icode={'\ue659'} size={24} color={color.pink} />
            <Text style={{ marginVertical: 10 }}>我的测评</Text>
          </View>
          <View style={styles.iconBox}>
            <Icon icode={'\ue605'} size={24} color={color.pink} />
            <Text style={{ marginVertical: 10 }}>我的订单</Text>
          </View>
        </View>
      </View>
      <View style={styles.contain}>
        <Text style={styles.text}>我的足迹</Text>
        <View style={styles.serviceBox}>
          <View style={styles.iconBox}>
            <Icon size={24} icode={'\ue604'} color={color.pink} />
            <Text style={{ marginVertical: 10 }}>我的点赞</Text>
          </View>
          <View style={styles.iconBox}>
            <Icon icode={'\ue607'} size={24} color={color.pink} />
            <Text style={{ marginVertical: 10 }}>浏览历史</Text>
          </View>
        </View>
      </View>
      {/* 我的发布 */}
      <View style={styles.box}>
        <Text style={{ fontSize: 15, color: '#000' }}>我发布了1条内容</Text>
        <Text style={{ fontSize: 10 }}>创作者中心{'  >  '}</Text>
      </View>
      <View style={styles.box}>
        <Text style={{ fontSize: 15, color: '#000' }}>邀请好友</Text>
        {/* <Text style={{ fontSize: 10 }}>创作者中心{'  >  '}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(251,250,252)',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  contain: {
    borderRadius: 14,
    width: '100%',
    padding: 10,
    height: 155,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
    elevation: 1,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  serviceBox: {
    flexDirection: 'row',
    marginVertical: 5,
    // justifyContent: 'space-evenly',
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 18,
  },
  box: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default MeCertificationHome;
