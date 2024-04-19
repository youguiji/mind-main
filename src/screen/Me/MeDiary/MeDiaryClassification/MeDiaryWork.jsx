/*
 * @Description: 日记工作
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-04 06:31:59
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 15:10:23
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MeDiaryCard from '../Components/MeDiaryCard';

const MeDiaryWork = () => {
  const [diary, setDiary] = useState([
    { id: 0, title: '今天是一个好天气', content: '今天去跑步了，很有成就感' },
    { id: 1, title: '今天是一个好天气', content: '今天去跑步了，很有成就感' },
  ]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {diary.map(item => {
        return (
          <MeDiaryCard
            key={item.id}
            title={item.title}
            content={item.content}
            onPress={console.log('res')}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff'
  },
});

export default MeDiaryWork;
