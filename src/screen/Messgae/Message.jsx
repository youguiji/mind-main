/*
 * @Description: 消息模块
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-07 19:08:30
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-09 02:35:39
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { create } from 'react-test-renderer';
import io from 'socket.io-client';
import Icon from '../../components/Icon';
import { color } from '../../assets/color';
import { WebSocket } from 'react-native';
import { getChatGroup } from '../../network/modules/message';
import { getUsersInfo } from '../../network/modules/user';

const Message = ({ navigation }) => {
  //const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userList, setUserList] = useState([]);

  // useEffect(() => {
  //   getChatGroup(1,10).then(res=>{
  //     console.log(res);
  //     setUserList(res.data.list);
  //   })
  // }, []);

  // 获取其他用户信息
  const getUserInfo = async userId => {
    try {
      const res = await getUsersInfo(userId);
      return res.data;
    } catch (err) {
      console.error(`Error fetching user info for user ${userId}:`, error);
      return null;
    }
  };

  // 更新数组
  const updateChatGroupArray = async () => {
    try {
      const chatGroupArray = await getChatGroup(1, 10);
      const updatedArray = await Promise.all(
        chatGroupArray.map(async item => {
          const userInfo = await getUserInfoById(item.touserId);
          if (userInfo) {
            return { ...item, ...userInfo };
          }
          return item;
        }),
      );

      // 根据 updateTime 排序数组
      const sortedArray = updatedArray.sort(
        (a, b) => new Date(b.updateTime) - new Date(a.updateTime),
      );

      console.log(sortedArray);
      // 这里可以使用 sortedArray，它是更新并排序后的数组
    } catch (error) {
      console.error('Error updating and sorting array:', error);
    }
  };

  useEffect(() => {


    updateChatGroupArray();
  }, []);

  const [messageList, setMessageList] = useState([
    {
      id: 1,
      name: 'user1',
      userId: '1',
      avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    },
    {
      id: 2,
      name: 'user2',
      userId: '2',
      avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    },
    {
      id: 3,
      userId: '3',
      name: 'user3',
      avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    },
  ]);

  // const sendMessage = () => {
  //   if (socket && message) {
  //     // 发送消息到服务器
  //     socket.emit('message', message);
  //     console.log(message);
  //     console.log(socket);
  //     setMessage('');
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* 标题
      <View>
        <Text style={styles.topTitle}>消息</Text>
      </View>
      顶部
      <View style={styles.top}>
        <View>
          <View style={styles.box1}>
            <Icon size={32} icode={'\ue8c3'} color={'rgb(253,94,91)'} />
          </View>
          <Text>赞和收藏</Text>
        </View>
        <View>
          <View style={styles.box2}>
            <Icon size={38} icode={'\uebac'} color={'rgb(50,136,255)'} />
          </View>
          <Text>新增关注</Text>
        </View>
        <View>
          <View style={styles.box3}>
            <Icon size={32} icode={'\ue60c'} color={'rgb(52,218,152)'} />
          </View>
          <Text>新增评论</Text>
        </View>
      </View>
      聊天列表 */}
      <FlatList
        data={messageList}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={
          <View>
            <View>
              <Text style={styles.topTitle}>消息</Text>
            </View>
            <View style={styles.top}>
              <View>
                <View style={styles.box1}>
                  <Icon size={32} icode={'\ue8c3'} color={'rgb(253,94,91)'} />
                </View>
                <Text>赞和收藏</Text>
              </View>
              <View>
                <View style={styles.box2}>
                  <Icon size={38} icode={'\uebac'} color={'rgb(50,136,255)'} />
                </View>
                <Text>新增关注</Text>
              </View>
              <View>
                <View style={styles.box3}>
                  <Icon size={32} icode={'\ue60c'} color={'rgb(52,218,152)'} />
                </View>
                <Text>新增评论</Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.listBox}
              onPress={() => {
                navigation.navigate('MESSAGEDETAIL');
              }}>
              <Avatar size={48} rounded source={{ uri: item.avatar }} />
              <View style={styles.userRight}>
                <View style={styles.innerLeft}>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.context}>消息</Text>
                </View>
                <View style={styles.innerRight}>
                  <Text>11:30</Text>
                </View>
              </View>
            </Pressable>
          );
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  topTitle: {
    width: '100%',
    marginVertical: 20,
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  // 顶部
  top: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',

    color: '#000',
  },
  box1: {
    width: 70,
    height: 70,
    backgroundColor: 'rgb(253,225,222)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  box2: {
    width: 70,
    height: 70,
    backgroundColor: 'rgb(231,240,255)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  box3: {
    width: 70,
    height: 70,
    backgroundColor: 'rgb(227,250,239)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  // 列表
  listBox: {
    width: '100%',
    height: 90,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: color.gray.light,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  userRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerLeft: {
    flex: 4,
  },
  innerRight: {
    flex: 1,
  },
  text: {
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
  },
  context: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default Message;
