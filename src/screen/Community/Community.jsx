/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-11 09:06:58
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-02 16:18:20
 */

import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Forum from './Forum/Forum';
import Article from './Article/Article';

const Community = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator>
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
  );
};

export default Community;
