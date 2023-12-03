// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { LoginOut } from '../../store/modules/login';
import { Avatar } from '@rneui/base';
import { FlatList } from 'react-native-gesture-handler';
import Icon from '../../components/Icon';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native-svg';
import { getUserInfo } from '../../network/modules/user';
import { getArticle } from '../../network/modules/community';

const Me = ({ navigation }) => {
  const [trends, setTrends] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);
  const dispatch = useDispatch();
  
  const [userInfo, setUserInfo] = useState({
    username: 'Austral',
    attention: 12,
    ID: '124jfs321',
    fans: 23, 
    sex:0,
    userId:'023384',
    avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    personnalLabel:'没什么想说的'
  });
  useEffect(()=>{
    //获取用户信息
    getUserInfo().then(res=>{
      console.log(res);
      setUserInfo(res.data)
    })
    //获取用户日记
    
  },[])
  
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          onPress={() => {
            navigation.navigate('MESETTING');
          }}
          style={{
            position: 'relative',
            right: '-45%',
            top: '-2%',
            fontSize: 20,
            fontFamily: 'iconfont',
          }}>
          {'\ue68f'}
        </Text>
        <Avatar size={64} rounded source={{ uri: userInfo.avatar }}></Avatar>
        <Text style={styles.name}>{userInfo.username}</Text>
        <Text>ID:{userInfo.userId}</Text>
        <Text>{userInfo.personnalLabel}</Text>
        <View style={styles.contain}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              navigation.navigate('MEATTENTIONFOLLOW',{
                id:1,
              });
            }}>
            <Text>关注 {userInfo.attention}</Text>
          </Pressable>
          <Pressable onPress={()=>{
            navigation.navigate('MEATTENTIONFANS')
          }}>
            <Text style={{ marginHorizontal: 20 }}>粉丝 {userInfo.fans}</Text>
          </Pressable>
          <Pressable onPress={()=>{
            navigation.navigate('MEDIARY')
          }}>
            <Text style={{ marginRight: 20 }}>日记 {userInfo.fans}</Text>
          </Pressable>
          <Text>动态 {trends.length}</Text>
        </View>
        {trends.map(item => {
          return (
            <Pressable
              key={item.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate('FORUMDETAIL');
              }}>
              <View style={styles.left}>
                <Text style={styles.day}>23</Text>
                <Text style={styles.month}>May</Text>
              </View>
              <View style={styles.right}>
                <Text>今天出门的时候遇见一只小狗</Text>
                <Text style={styles.content} numberOfLines={2}>
                  今天的天气真不错，很适合出门，所以我来到了这里，你觉得这是一个对的决定吗？
                </Text>
                <View style={styles.imgBox}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: 'https://w.wallhaven.cc/full/zy/wallhaven-zy9dly.jpg',
                    }}
                  />
                </View>
                <View style={styles.comment}>
                  <Icon size={18} icode={'\ue64a'} />
                  <Text style={{ marginRight: 20 }}>12</Text>
                  <Icon size={18} icode={'\ue74e'} />
                  <Text>12</Text>
                </View>
              </View>
            </Pressable>
          );
        })}

        <Button
          title="退出"
          style={{ padding: 10 }}
          onPress={() => {
            console.log('out');
            dispatch(LoginOut());
          }}></Button>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingIconContainer}
        onPress={() => {
          navigation.navigate('FORUMADD');
        }}>
        <Text
          style={{
            fontFamily: 'iconfont',
            fontSize: 32,
            color: '#9471E3',
          }}>
          {'\ue762'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  contain: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 7,
    paddingVertical: 15,
  },
  day: {
    fontSize: 26,
    fontWeight: '500',
    color: '#000',
  },
  month: {
    color: '#000',
  },
  content: {
    marginVertical: 10,
  },
  imgBox: {
    height: 100,
    flex: 1,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 24,
  },
  comment: {
    flexDirection: 'row',
    alignItem: 'center',
  },
});
export default Me;
