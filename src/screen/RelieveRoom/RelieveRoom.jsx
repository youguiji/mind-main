/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-15 08:11:31
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-28 09:06:54
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Pressable,
  ImageBackground,
} from 'react-native';

const RelieveRoom = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/systemImage/4603667E85834CC9975088B3A06C17D9.png')}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* 音乐 */}
        <Pressable
          style={styles.ItemBox1}
          onPress={() => {
            navigation.navigate('MUSIC');
          }}>
          {/* <Text>心灵音乐盒</Text> */}
        </Pressable>
        {/* ai对话 */}
        <Pressable
          style={styles.ItemBox2}
          onPress={() => {
            navigation.navigate('AIDialogue');
          }}>
          {/* <Text>智慧倾诉者</Text> */}
        </Pressable>
        {/*  心理咨询师 */}
        <Pressable
          style={styles.ItemBox3}
          onPress={() => {
            navigation.navigate('ConsultingRoom');
          }}>
          {/* <Text>心灵引航</Text> */}
        </Pressable>
        {/* 情绪信箱 */}
        <Pressable
          style={styles.ItemBox4}
          onPress={() => {
            navigation.navigate('EmotionalMailbox');
          }}>
          {/* <Text>心声港湾</Text> */}
        </Pressable>
        {/* 心理测评 */}
        <Pressable
          style={styles.ItemBox5}
          onPress={() => {
            navigation.navigate('Assessment');
          }}>
          {/* <Text>情绪晴雨表</Text> */}
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 音乐
  ItemBox1: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 200,
    right: -60,
    // backgroundColor: '#fff',
  },
  // 智慧
  ItemBox2: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 330,
    left: -190,
    // backgroundColor: '#fff',
  },
  // 咨询师
  ItemBox3: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 350,
    left: 50,
    // backgroundColor: '#fff',
  },
  // 信箱
  ItemBox4: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 80,
    left: -120,
    // backgroundColor: '#fff',
  },
  // 测评
  ItemBox5: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 100,
    left: -50,
    // backgroundColor: '#fff',
  },
});

export default RelieveRoom;
