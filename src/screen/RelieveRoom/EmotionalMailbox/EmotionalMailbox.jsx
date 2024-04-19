/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-23 11:09:21
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-09 20:09:02
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MeDiaryFriend from '../../Me/MeDiary/MeDiaryClassification/MeDiaryFriend';
import MeDiarySchool from '../../Me/MeDiary/MeDiaryClassification/MeDiarySchool';
import MeDiaryHome from '../../Me/MeDiary/MeDiaryClassification/MeDiaryHome';
import WorkMailbox from './EmotionalMailbox/WorkMailbox';
import { color } from '../../../assets/color';

const EmotionalMailbox = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <ImageBackground
      source={require('../../../assets/systemImage/0FBA4BEFDDFE4ADE70E423D39FF50888.png')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <Pressable
        style={styles.go}
        onPress={() => {
          navigation.navigate('EmotionalMailboxAdd');
        }}>
        <Text style={styles.goto}>去写信</Text>
      </Pressable>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'rgb(51,51,51)',
            tabBarInactiveTintColor: 'rgb(140,140,140)',
            tabBarLabelStyle: {
              // fontWeight: 'bold',
              fontSize: 12, // 设置字体大小为16
            },
            tabBarStyle: {
              height: 45,
              justifyContent: 'center',
              elevation: 0, // 去掉底部边框阴影
              // backgroundColor: 'rgb(254,206,170)',
            },
            tabBarBackground: () => (
              <View style={{ backgroundColor: 'rgb(255,255,160)', flex: 1 }} />
            ),
            tabBarIndicatorStyle: {
              backgroundColor: 'rgb(254,206,170)',
            },
            tabBarPressColor: 'transparent', // 取消点击Tab时的黑灰色过渡
            tabBarPressOpacity: 1, // 取消点击Tab时的黑灰色过渡
          }}>
          <Tab.Screen
            name="工作"
            component={WorkMailbox}
            options={{
              title: '工作',
              key: 'work_tab',
            }}
          />
          <Tab.Screen
            name="学校"
            component={MeDiarySchool}
            options={{
              title: '学校',
              key: 'school_tab',
            }}
          />
          <Tab.Screen
            name="朋友"
            component={MeDiaryFriend}
            options={{
              title: '朋友',
              key: 'friend_tab',
            }}
          />
          <Tab.Screen
            name="家庭"
            component={MeDiaryHome}
            options={{
              title: '论坛',
              key: 'home_tab',
            }}
          />
        </Tab.Navigator>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabContainer: {
    flex: 0.73, // 将 tabContainer 的高度设置为屏幕高度的一半
  },
  go: {
    backgroundColor: color.purple.light,
    borderRadius: 10,
    width: 70,
    height: 40,
    paddingHorizontal: 2, // 左右内边距
    paddingVertical: 3, // 上下内边距
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -190,
    right: -400,
  },
  goto: {
    color: '#fff',
    fontSize: 14,
  },
});

export default EmotionalMailbox;
