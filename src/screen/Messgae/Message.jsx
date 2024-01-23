/*
 * @Description: 消息模块
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-07 19:08:30
 * @LastEditors: Austral
 * @LastEditTime: 2024-01-23 15:03:58
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
import { extractTimeFromDateTime } from '../../util';

const Message = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
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
    } catch (error) {
      console.error(`Error fetching user info for user ${userId}:`, err);
      return null;
    }
  };

  // 更新数组
  const updateChatGroupArray = () => {
    getChatGroup(1, 1)
      .then(res => {
        console.log(res);
        const chatGroupArray = res.data.list;
        console.log(chatGroupArray[0]);

        if (!Array.isArray(chatGroupArray)) {
          console.log('chatGroup:' + chatGroupArray[0]);
          console.error('Error: chatGroupArray is not an array');
          return Promise.reject('chatGroupArray is not an array');
        }

        // 使用 Promise.all() 处理并行请求
        return Promise.all(
          chatGroupArray.map(item => {
            console.log(item);
            // 返回一个 Promise 对象
            return getUsersInfo(item.toUserId)
              .then(userInfo => {
                console.log('userInfo');
                console.log(userInfo);
                if (userInfo) {
                  return { ...item, ...userInfo };
                }
                return item;
              })
              .catch(error => {
                console.error(
                  `Error fetching user info for user ${item.toUserId}:`,
                  error,
                );
                return item;
              });
          }),
        );
      })
      .then(updatedArray => {
        //根据 updateTime 排序数组
        const sortedArray = updatedArray.sort(
          (a, b) => new Date(b.updateTime) - new Date(a.updateTime),
        );
        console.log(sortedArray);
        //这里可以使用 sortedArray，它是更新并排序后的数组
        setMessageList(updatedArray);
      })
      .catch(error => {
        console.error('Error updating and sorting array:', error);
      });
  };

  // 在 useEffect 中使用
  useEffect(() => {
    updateChatGroupArray();
  }, []);

  const [messageList, setMessageList] = useState([
    {
      code: '200',
      creatTime: '2001-11-03 12:18:00',
      data: {
        avatar:
          'https://qiniu.flywe.xyz/MindInsight/2023/10/15/0acc06e87736a365.jpg',
        birthdate: '1983-01-04 00:14:27',
        fansCount: 82,
        personalLabel: 'ut qui',
        personnalLabel: '往参如果原步书王或百原解为。',
        registerDay: '1978-11-14 06:27:14',
        sex: 0,
        userId: 121887,
        username: '三干列真知说',
      },
      deleteFlag: 0,
      id: 3,
      lastMessage: '知放清老记方而',
      message: '获取用户数据成功',
      ok: false,
      touserId: 139,
      updateTime: '2015-09-20 02:39:16',
    },
    {
      code: '200',
      creatTime: '1974-10-07 05:23:54',
      data: {
        avatar:
          'https://qiniu.flywe.xyz/MindInsight/2023/10/15/0acc06e87736a365.jpg',
        birthdate: '2014-07-26 15:14:50',
        fansCount: 44,
        personalLabel: 'nulla laboris exercitation',
        personnalLabel: '除易给委她与得色状包题月美统研。',
        registerDay: '2012-08-21 08:01:41',
        sex: 0,
        userId: 593739,
        username: '务度领决第志',
      },
      deleteFlag: 0,
      id: 1,
      lastMessage: 'hi',
      message: '获取用户数据成功',
      ok: false,
      touserId: 1,
      updateTime: '2003-05-15 15:31:28',
    },
    {
      code: '200',
      creatTime: '2002-08-08 03:13:05',
      data: {
        avatar:
          'https://qiniu.flywe.xyz/MindInsight/2023/10/15/0acc06e87736a365.jpg',
        birthdate: '1982-04-07 13:00:05',
        fansCount: 58,
        personalLabel: 'non aliqua ut ea',
        personnalLabel: '天在府无同色据传合情整起后究市。',
        registerDay: '1998-05-08 04:44:50',
        sex: 0,
        userId: 267136,
        username: '政式观龙',
      },
      deleteFlag: 0,
      id: 2,
      lastMessage: '工最省样际整思且做',
      message: '获取用户数据成功',
      ok: false,
      touserId: 776,
      updateTime: '1999-05-10 23:13:19',
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
          if (messageList.length != 0) {
            return (
              <Pressable
                style={styles.listBox}
                onPress={() => {
                  navigation.navigate('MESSAGEDETAIL', {
                    receiverId: item.toUserId,
                    lastTime: item.updateTime,
                  });
                }}>
                  {item.data.avatar?
                  <Avatar
                  size={48}
                  rounded
                  source={{ uri: item.data.avatar }}
                />:''}
                {/* <Avatar
                  size={48}
                  rounded
                  source={{ uri: item.data.avatar }}
                /> */}
                <View style={styles.userRight}>
                  <View style={styles.innerLeft}>
                    <Text style={styles.text}>{item.data.username}</Text>
                    <Text style={styles.context}>{item.lastMessage}</Text>
                  </View>
                  <View style={styles.innerRight}>
                    <Text>{extractTimeFromDateTime(item.updateTime)}</Text>
                  </View>
                </View>
              </Pressable>
            );
          } else {
            return <Text style={styles.loss}>当前暂无好友和您聊天哦！</Text>;
          }
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
  loss: {
    width: '100%',
    paddingVertical: 40,
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
