/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-11 09:06:58
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-16 09:30:48
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Forum from './Forum/Forum';
import Article from './Article/Article';
import Icon from '../../components/Icon';
import VoiceNavigaion from '../../components/VoiceNavigation';
import WaveAnimation from '../../components/WaveAnimation';
import Spinner from '../../components/Spinner';

const CustomSearchBar = () => {
  return (
    <Pressable
      style={styles.searchContainer}
      onPress={() => console.log('搜索框点击')}>
      <Icon size={16} icode={'\ue60e'} />
      <Text style={styles.text}>心情治愈</Text>
    </Pressable>
  );
};

const GlobalContainer = () => {
  return (
    <View
      style={{
        height: 20,
        width: 100,
        position: 'absolute',
        bottom: 100,
        // right: 20,
      }}>
      <VoiceNavigaion />
      <WaveAnimation text={'我要发布文章'} duration={10000} />
    </View>
  );
};

const Community = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'rgb(51,51,51)',
          tabBarInactiveTintColor: 'rgb(140,140,140)',
          tabBarLabelStyle: {
            // fontWeight: 'bold',
            fontSize: 15, // 设置字体大小为16
          },
          tabBarItemStyle: { marginLeft: 14, width: '200px' }, // 控制标签页位置
          tabBarStyle: { backgroundColor: 'white' },
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
          },
          tabBarStyle: {
            height: 60,
            justifyContent: 'center',
            elevation: 0, // 去掉底部边框阴影
            backgroundColor: '#fff', // 设置背景颜色为 #fff
          },
          tabBarPressColor: 'transparent', // 取消点击Tab时的黑灰色过渡
          tabBarPressOpacity: 1, // 取消点击Tab时的黑灰色过渡
        }}>
        <Tab.Screen
          name="文章"
          component={Article}
          options={{
            title: '文章',
            key: 'article_tab',
          }}
        />
        <Tab.Screen
          name="论坛"
          component={Forum}
          options={{
            title: '论坛',
            key: 'forum_tab',
          }}
        />
      </Tab.Navigator>
      <CustomSearchBar />
      {/* <GlobalContainer /> */}
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
        {/* <Spinner size="large" /> */}
        {/* 指定加载指示器的大小，可选值有：'small'、'large' */}
      {/* </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: 200,
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
    right: 16,
    paddingHorizontal: 14,
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 24,
  },
  text: {
    fontSize: 12,
    color: 'rgb(154,154,154)',
    paddingLeft: 4,
  },
});
export default Community;
