/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-31 07:46:47
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 15:08:42
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import MeDiaryCard from '../../../Me/MeDiary/Components/MeDiaryCard';
import MailCard from '../Components/MailCard';
import { color } from '../../../../assets/color';

const WorkMailbox = () => {
  const [diary, setDiary] = useState([
    {
      id: 0,
      title: '陌生人我该不该坚持下去呢',
      content:
        '陌生人你好呀，我在这寻求一下建议，先说说自己处境吧。我从毕业后就一直从事电气工作，一直在外地出差调试的工作，至今已经快有2年了。在外调试基本全年无休，待遇算得上只能养活自己，但越工作自己越迷茫，因为没有休息时间常常加班，现',
    },
    {
      id: 1,
      title: '工作想去外地，但是被限制在了家里',
      content:
        '昨天忙了一天，但直到上场的时候，出现了前所未有的卡壳，或许越想要的东西，越把它想的触不可及，就越紧张。一紧张就很容易出现耳鸣',
    },
  ]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable style={styles.go}>
        <Text style={styles.goto}>去写信</Text>
      </Pressable>
      {diary.map(item => {
        return (
          <MailCard
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
    backgroundColor: '#fff',
    paddingTop: 0,
    height: '100%',
  },
  go: {
    backgroundColor: color.purple.light,
    borderRadius: 10,
    width: 100,
    height: 40,
    paddingHorizontal: 8, // 左右内边距
    paddingVertical: 3, // 上下内边距
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: -440,
  },
  goto: {
    color: '#fff',
    fontSize: 14,
  },
});

export default WorkMailbox;
