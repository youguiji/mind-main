/*
 * @Description: 我的设置用户信息
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-17 19:05:54
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-18 11:09:54
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleHeader from '../../../../components/TitleHeader';
import ClickItem from '../../Components/ClickItem';
import { commonStyles } from '../../../../assets/commonStyle';

const MeSettingInfo = ({ navigation }) => {
  const [title, setTitle] = useState([
    {
      title: '头像',
      destination: 'MESETTINGCHANGEAVATAR',
    },
    {
      title: '昵称',
      destination: 'MESETTINGCHANGENAME',
    },
    {
      title: '个性签名',
      destination: 'MESETTINGCHANGELABEL',
    },
    {
      title: '性别',
      destination: 'MESETTINGCHANGSEX',
    },
    {
      title: '生日',
      destination: 'MESETTINGCHANGEBIRTH',
    },
  ]);
  return (
    <View>
      <TitleHeader
        title={'个人信息'}
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={commonStyles.marginTop}>
        {title.map(item => {
          return (
            <ClickItem
              title={item.title}
              navigation={navigation}
              destination={item.destination}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MeSettingInfo;
