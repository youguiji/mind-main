/*
 * @Description: 日记
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-17 21:48:01
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-04 07:03:22
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MeDiaryFriend from './MeDiaryClassification/MeDiaryFriend';
import MeDiarySchool from './MeDiaryClassification/MeDiarySchool';
import MeDiaryWork from './MeDiaryClassification/MeDiaryWork';
import MeDiaryHome from './MeDiaryClassification/MeDiaryHome';
import Icon from '../../../components/Icon';

const MeDiary = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Icon
          iconPress={() => {
            navigation.goBack();
          }}
          icode={'\ueb05'}
          size={20}
        />
        <Text style={styles.title}> 随心记 </Text>
      </View>
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'rgb(51,51,51)',
            tabBarInactiveTintColor: 'rgb(140,140,140)',
            tabBarLabelStyle: {
              // fontWeight: 'bold',
              fontSize: 12, // 设置字体大小为16
            },
            // tabBarItemStyle: { marginLeft: 14, width: '200px' }, // 控制标签页位置
            tabBarStyle: { backgroundColor: 'white' },
            tabBarIndicatorStyle: {
              backgroundColor: '#fff',
            },
            tabBarStyle: {
              height: 45,
              justifyContent: 'center',
              elevation: 0, // 去掉底部边框阴影
              backgroundColor: '#fff', // 设置背景颜色为 #fff
            },
            tabBarPressColor: 'transparent', // 取消点击Tab时的黑灰色过渡
            tabBarPressOpacity: 1, // 取消点击Tab时的黑灰色过渡
          }}>
          <Tab.Screen
            name="工作"
            component={MeDiaryWork}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flex: 1,
  },
  headerContent: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MeDiary;
