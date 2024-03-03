import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,FlatList, TouchableOpacity,TextInput, Button, ScrollView, Pressable } from 'react-native';
import { getUserInfo } from '../../../network/modules/user';
import { Avatar } from '@rneui/base';
import Icon from '../../../components/Icon';
import { currentTime } from '../../../util';

const AIDialogue = ({navigation,route})=> {
  const [serverState, setServerState] = useState('Loading...');
  const [messageText, setMessageText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [serverMessages, setServerMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [receiverInfo,setReceiverInfo] = useState({
    username: '小暖',
    receiverId: 1,
    avatar: 'https://img.zcool.cn/community/0179e358a53d9aa801219c77c25d56.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',

  })
  var ws = React.useRef(new WebSocket('ws://192.168.1.11:8079')).current;

  useEffect(() => {
    const serverMessagesList = [];
    //获取用户的基本信息
    getUserInfo().then(res => {
      setUserInfo(res.data);
    });
    ws.onopen = () => {
      setServerState('Connected to the server')
      setDisableButton(false);
    };
    ws.onclose = (e) => {
      setServerState('Disconnected. Check internet or server.')
      setDisableButton(true);
    };
    ws.onerror = (e) => {
      setServerState(e.message);
    };
    ws.onmessage = (e) => {
      const receivedMessage = JSON.parse(e.data);
      console.log(receivedMessage);
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        {
          content: receivedMessage.content,
          sendId: receiverInfo.receiverId,
          sendTime: receivedMessage.sendTime,
        },
      ]);
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList])
    };
  }, [])
  const submitMessage = () => {
    if (messageText.trim() === '') {
      return;
    }

    // 在你的代码中的后续部分，在使用 push 之前
    chatHistory.push({
      content: messageText,
      sendId: userInfo.userId,
      sendTime: currentTime(),
    });
    setChatHistory(chatHistory);
    console.log(chatHistory);
    //更新message数组
    // const newMessage = { id: messages.length + 1, content: inputMessage, sender: 'me' };
    // setMessages([...messages, newMessage]);
    // setInputMessage('');

    ws.send(
      JSON.stringify({
        type: 'send',
        data: { toUserId: receiverInfo.receiverId, content: messageText,sendTime:currentTime(), },
      }),
    );
    setMessageText('');
    setInputFieldEmpty(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Icon
          iconPress={() => {
            navigation.goBack();
          }}
          style={styles.headerLeft}
          icode={'\ueb05'}
          size={20}
        />
        <Avatar
          rounded
          size={38}
          source={{ uri: receiverInfo.avatar }}></Avatar>
        <Text style={styles.title}>{receiverInfo.username}</Text>
      </View>
      {/* <ScrollView></ScrollView> */}
      {/* 聊天记录 */}
      <FlatList
        data={chatHistory}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <>
              {item.sendId == receiverInfo.receiverId ? (
                <View style={styles.left}>
                  <Avatar
                    rounded
                    size={48}
                    source={{ uri: receiverInfo.avatar }}
                    // onPress={() => {
                    //   navigation.navigate('MEUSERPAGE', { userId: receiverId });
                    // }}
                  />
                  <View style={styles.innerBox}>
                    <Text>{receiverInfo.username}</Text>
                    <Text>{item.content}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.right}>
                  <View style={styles.innerBox}>
                    <Text>{userInfo.username}</Text>
                    <Text>{item.content}</Text>
                  </View>
                  <Avatar rounded size={48} source={{ uri: userInfo.avatar }} />
                </View>
              )}
            </>
          );
        }}></FlatList>
      {/* 连接状态 */}
      {/* <View
        style={{
          height: 30,
          backgroundColor: '#eeceff',
          padding: 5,
        }}>
        <Text>{serverState}</Text>
      </View> */}
      {/* 回复 */}
      {/* <View
        style={{
          backgroundColor: '#ffeece',
          padding: 5,
          flexGrow: 1,
        }}>
        <ScrollView>
          {serverMessages.map((item, ind) => {
            return <Text key={ind}>{item}</Text>;
          })}
        </ScrollView>
      </View> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={'发消息...'}
          onChangeText={text => {
            setMessageText(text);
            setInputFieldEmpty(text.length > 0 ? false : true);
          }}
          value={messageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={submitMessage}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
        {/* <Button
          onPress={submitMessage}
          title={'Submit'}
          disabled={disableButton || inputFieldEmpty}
        /> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    //backgroundColor: '#ecf0f1',
    paddingTop: 70,
    overflow: 'hidden',
    flex: 1,
  },
  // top
  Header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  left: {
    maxWidth: '80%',
    flexDirection: 'row',
    left: 10,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  right: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    maxWidth: '80%',
    right: 10,
    marginVertical: 10,
  },
  innerBox: {
    marginHorizontal: 10,
  },
  // messageContainer: {
  //   maxWidth: '80%',
  //   padding: 10,
  //   marginVertical: 5,
  //   borderRadius: 8,
  // },
  // messageMe: {
  //   alignSelf: 'flex-start',
  //   backgroundColor: '#b3e0ff', // Your color for messages sent by you
  // },
  // messageOther: {
  //   alignSelf: 'flex-end',
  //   backgroundColor: '#99ff99', // Your color for messages sent by others
  // },
  // messageText: {
  //   fontSize: 16,
  // },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default AIDialogue;