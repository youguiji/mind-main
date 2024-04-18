/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-11-15 08:11:31
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-29 23:16:48
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
      source={require('../../assets/systemImage/1CC8072AD9D530FD58959C8F75C44A6C.jpg')}
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
  ItemBox1: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 70,
    right: -170,
    // backgroundColor: '#fff',
  },
  ItemBox2: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 380,
    left: -190,
    // backgroundColor: '#fff',
  },
  ItemBox3: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 280,
    left: 0,
    // backgroundColor: '#fff',
  },
  ItemBox4: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 480,
    left: 20,
    // backgroundColor: '#fff',
  },
  ItemBox5: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 140,
    right: 40,
    // backgroundColor: '#fff',
  },
});

export default RelieveRoom;
