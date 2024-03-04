/*
 * @Description: 全部日记
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-04 07:07:14
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-04 08:13:12
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUserDirary } from '../../../../network/modules/user';
import MeDiaryCard from '../Components/MeDiaryCard';

const MeDiaryAll = ({ navigation }) => {
  const [diary, setDiary] = useState([]);
  useEffect(() => {
    getUserDirary(0, 1, 10).then(res => {
      setDiary(res.data);
    });
  }, [diary]);
  return (
    <ScrollView style={styles.container}>
      {diary.map(item => {
        return <MeDiaryCard title={item.title} content={item.content} onPress={navigation.navigate('MeDiaryDetail')}/>;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MeDiaryAll;
