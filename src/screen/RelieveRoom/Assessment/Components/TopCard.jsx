/*
 * @Description: 顶部卡片
 * @Version:
 * @Autor: Austral
 * @Date: 2024-04-17 09:14:04
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 15:09:11
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from '../../../../components/Icon';
import { color } from '../../../../assets/color';

const TopCard = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <View style={styles.navbar}>
        <Text style={styles.logo}>心理健康</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MBTI测试</Text>
        </TouchableOpacity>
      </View> */}
      {/* 上部icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon icode={'\ue746'} size={40} color={color.purple.light} />
        <View
          style={{
            marginLeft: 10,
            backgroundColor: 'rgb(254,232,237)',

            paddingVertical: 15,
          }}>
          <Text>快来解锁你的MBTI类型</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <Icon icode={'\ue603'} size={16} color={color.purple.deep} />
            <Text style={styles.cardText}>抑郁测评</Text>
          </View>
          <Text style={styles.cardInfo}>39人已测试</Text>
          <Text style={styles.testgo}>去测试</Text>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <Icon icode={'\ue603'} size={16} color={color.purple.deep} />
            <Text style={styles.cardText}>恋人模式</Text>
          </View>
          <Text style={styles.cardInfo}>644人已测试</Text>
          <Text style={styles.testgo}>去测试</Text>
        </View>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <Icon icode={'\ue603'} size={16} color={color.purple.deep} />
            <Text style={styles.cardText}>心绪测评</Text>
          </View>
          <Text style={styles.cardInfo}>39人已测试</Text>
          <Text style={styles.testgo}>去测试</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 200,
    padding: 10,
    backgroundColor: 'rgb(254,232,237)',
    margin: 10,
    borderRadius: 14,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3e64ff',
    padding: 10,
  },
  logo: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#3e64ff',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgb(254,248,248)',
    height: 100,
    width: 90,
    margin: 10,
    // padding: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  cardText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  cardInfo: {
    // marginLeft: 10,
    fontSize: 10,
    paddingVertical: 5,
    color: '#666',
  },
  testgo: {
    marginTop: 20,
    fontSize: 12,
    color: color.purple.light,
  },
});

export default TopCard;
