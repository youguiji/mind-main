/*
 * @Description: 消息模块
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-07 19:08:30
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-07 19:57:01
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // 替换为你的Socket服务器地址

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 连接到Socket服务器
    const SOCKET_SERVER_URL = '192.168.227.117:3000'; // 替换为你的Socket服务器地址

    const newSocket = io(SOCKET_SERVER_URL);
    // 监听连接事件
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    // 监听断开连接事件
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });
    setSocket(newSocket);

    // 监听来自服务器的消息
    newSocket.on('message', message => {
      setMessages([...messages, message]);
      console.log(message);
    });

    // 清理副作用
    return () => newSocket.disconnect();
  }, [messages]);

  const sendMessage = () => {
    if (socket && message) {
      // 发送消息到服务器
      socket.emit('message', message);
      console.log(message);
      console.log(socket);
      setMessage('');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          {isConnected ? 'Connected to Server' : 'Not Connected to Server'}
        </Text>
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
        onChangeText={setMessage}
        value={message}
      />
      <Button title="发送" onPress={sendMessage} />
    </View>
  );
};

export default Message;
