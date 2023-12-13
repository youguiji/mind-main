// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Avatar } from '@rneui/base';
import Icon from '../../../components/Icon';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native-svg';
import { getUserArticle } from '../../../network/modules/community';
import { getUsersInfo } from '../../../network/modules/user';
import { transforTime } from '../../../util';
import { color } from '../../../assets/color';
import { currentTime } from '../../../util';

const MeUserPage = ({ navigation, route }) => {
  //用户id
  const { userId } = route.params;

  const [trends, setTrends] = useState([]);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    username: 'Austral',
    attention: 12,
    ID: '124jfs321',
    fans: 23,
    sex: 0,
    userId: '023384',
    avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    personnalLabel: '没什么想说的',
  });
  useEffect(() => {
    //获取用户信息
    getUsersInfo(userId).then(res => {
      console.log('获取其他用户信息' + res);
      //获取用户动态
      setUserInfo(res.data);
      getUserArticle(userId, 2, 1, 10, true).then(res => {
        console.log('获取用户动态' + res.data.List);
        setTrends(res.data.list);
      });
    });
    //获取用户
    getUserArticle();
  }, []);

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
            navigation.goBack();
          }}
          style={{
            position: 'relative',
            left: '-45%',
            top: '-1%',
            fontSize: 20,
            fontFamily: 'iconfont',
          }}>
          {'\ueb05'}
        </Text>
        <Avatar size={64} rounded source={{ uri: userInfo.avatar }}></Avatar>
        <Text style={styles.name}>{userInfo.username}</Text>
        <Text>ID:{userInfo.userId}</Text>
        <Text>{userInfo.personnalLabel}</Text>
        <View style={styles.contain}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              navigation.navigate('MEATTENTIONFOLLOW', {
                id: 1,
              });
            }}>
            <Text>关注 {userInfo.attention}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MEATTENTIONFANS');
            }}>
            <Text style={{ marginHorizontal: 20 }}>粉丝 {userInfo.fans}</Text>
          </Pressable>
          <Text>动态 {trends.length}</Text>
        </View>
        {trends.map(item => {
          return (
            <Pressable
              key={item.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate('FORUMDETAIL',{id: item.id});
              }}>
              <View style={styles.left}>
                <Text style={styles.day}>
                  {transforTime(item.creatTime).day}
                </Text>
                <Text style={styles.month}>
                  {transforTime(item.creatTime).month}
                </Text>
              </View>
              <View style={styles.right}>
                <Text>{item.title}</Text>
                <Text style={styles.content} numberOfLines={2}>
                  {item.content}
                </Text>
                {/* <View style={styles.imgBox}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: item.pictures && item.pictures[0] && item.pictures[0].url,
                    }}
                  />
                </View> */}
                {/* <View style={styles.comment}>
                  <Icon size={18} icode={'\ue64a'} />
                  <Text style={{ marginRight: 20 }}>{item.likeCount}</Text>

                </View> */}
                
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.bottomBox}>
                  <Pressable style={styles.botn}>
                    <Text style={styles.boText}>关注</Text>
                  </Pressable>
                  <Pressable onPress={()=>{
                    navigation.navigate('MESSAGEDETAIL',{receiverId: userId,lastTime:currentTime})
                  }}  style={styles.botn}>
                    <Text style={styles.boText}>私信</Text>
                  </Pressable>
                </View>
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
  bottomBox: {
    width: '100%',
    position: 'absolute',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#ccc',
    bottom: 10,
  },
  botn: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.purple.deep,
    borderRadius: 16,
    
  },
  boText: {
    color: '#fff',
  }
});
export default MeUserPage;
