/*
 * @Description: 消息模块
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-07 19:08:30
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-15 14:32:27
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

  const [messageList, setMessageList] = useState([]);

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
        showsVerticalScrollIndicator={false}
        data={messageList}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={
          <View>
            <View>
              <Text style={styles.topTitle}>消息</Text>
            </View>
            <View style={styles.top}>
              {/* 赞和收藏 */}
              <Pressable
                onPress={() => {
                  console.log('zan');
                  navigation.navigate('MESSAGENOTICEUP');
                }}>
                <View style={styles.box1}>
                  <Icon size={32} icode={'\ue8c3'} color={'rgb(253,94,91)'} />
                </View>
                <Text>赞和收藏</Text>
              </Pressable>
              {/* 新增关注 */}
              <Pressable
                onPress={() => {
                  navigation.navigate('MESSAGENOTICEATTENTION');
                }}>
                <View style={styles.box2}>
                  <Icon size={38} icode={'\uebac'} color={'rgb(245,109,150)'} />
                </View>
                <Text>新增关注</Text>
              </Pressable>
              {/* 新增评论 */}
              <Pressable
                onPress={() => {
                  navigation.navigate('MESSAGENOTICECOMMENT');
                }}>
                <View style={styles.box3}>
                  <Icon size={32} icode={'\ue60c'} color={'rgb(52,218,152)'} />
                </View>
                <Text>新增评论</Text>
              </Pressable>
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
                    lastTime: item.lastTime,
                  });
                }}>
                {item.data.avatar && (
                  <Avatar
                    size={48}
                    rounded
                    source={{ uri: item.data.avatar }}
                  />
                )}
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
                    <Text>{extractTimeFromDateTime(item.lastTime)}</Text>
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
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',

    color: '#000',
  },
  box1: {
    width: 55,
    height: 55,
    backgroundColor: 'rgb(253,225,222)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  box2: {
    width: 55,
    height: 55,
    backgroundColor: 'rgb(254,225,235)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  box3: {
    width: 55,
    height: 55,
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
    width: '95%',
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
