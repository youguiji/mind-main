import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from '../../components/Icon';
import { getUserInfo, getUsersInfo } from '../../network/modules/user';
import { getChathistory } from '../../network/modules/message';
import { Avatar } from '@rneui/base';
import { Image } from '@rneui/themed';
import { store } from '../../store/configureStore';
import { currentTime } from '../../util';
import { color } from '../../assets/color';

const MessageDetail = ({ navigation, route }) => {
  const { receiverId, lastTime } = route.params;
  const [serverState, setServerState] = useState('Loading...');
  const [messageText, setMessageText] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [serverMessages, setServerMessages] = useState([]);
  const [receiverInfo, setReceiverInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  var ws = React.useRef(new WebSocket('http://110.42.236.60:8079/ws')).current;

  useEffect(() => {
    const serverMessagesList = [];
    console.log(lastTime)
    setChatHistory(prevChatHistory => prevChatHistory || []);
    //获取接收者信息
    getUsersInfo(receiverId)
      .then(res => {
        console.log(res);
        setReceiverInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    //获取用户的基本信息
    getUserInfo().then(res => {
      setUserInfo(res.data);
    });
    //获取聊天记录
    getChathistory(receiverId, lastTime)
      .then(res => {
        console.log('liaot')
        console.log(lastTime)
        console.log(res);
        setChatHistory(prevChatHistory => res.data || prevChatHistory);
      })
      .catch(err => {
        console.log(err);
      });
    ws.onopen = () => {
      console.log('WebSocket connected');
      setServerState('Connected to the server');
      ws.send(
        JSON.stringify({
          token: `mindinsight=${store.getState().user.token}`,
          type: 'login',
        }),
      );
      setDisableButton(false);
    };
    ws.onclose = e => {
      console.log('WebSocket closed');
      setServerState('Disconnected. Check internet or server.');
      setDisableButton(true);
    };
    ws.onerror = e => {
      console.log('WebSocket error:', e);
      setServerState(e.message);
    };
    ws.onmessage = e => {
      const receivedMessage = JSON.parse(e.data);
      console.log(receivedMessage);
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        {
          content: receivedMessage.data.content,
          sendId: receiverId,
          sendTime: receivedMessage.data.sendTime,
        },
      ]);
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);

  //发送消息
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
        data: { toUserId: receiverId, content: messageText,sendTime:currentTime(), },
      }),
    );
    setMessageText('');
    setInputFieldEmpty(true);
  };
  // const renderMessage = (item) => {
  //   const sendId = item;
  //   return (
  //     <View key={message.id} style={[styles.messageContainer, isMe ? styles.messageMe : styles.messageOther]}>
  //       <Avatar rounded size={48}/>
  //       <View>
  //       <Text>username</Text>
  //       <Text style={styles.messageText}>{message.content}</Text>
  //       </View>
  //     </View>
  //   );
  // };

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
        showsVerticalScrollIndicator={false}
        data={chatHistory}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <>
              {item.sendId == receiverId ? (
                <View style={styles.left}>
                  <Avatar
                    rounded
                    size={32}
                    source={{ uri: receiverInfo.avatar }}
                    onPress={() => {
                      navigation.navigate('MEUSERPAGE', { userId: receiverId });
                    }}
                  />
                  <View style={styles.innerBox}>
                    <Text>{receiverInfo.username}</Text>
                    <Text style={styles.leftContent}>{item.content}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.right}>
                  <View style={styles.innerBox}>
                    {/* <Text>{userInfo.username}</Text> */}
                    <Text  style={styles.rightContent}>{item.content}</Text>
                  </View>
                  <Avatar rounded size={32} source={{ uri: userInfo.avatar }} />
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
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgb(251,250,252)',
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
  leftContent: {
    backgroundColor: 'rgb(244,242,250)',
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 14,
    marginTop: 10, 
  },
  rightContent: {
    backgroundColor: color.pink,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10, 
  },
  innerBox: {
    marginHorizontal: 10,
  },
  username :{
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    backgroundColor: 'rgb(255,255,255)',
    borderTopColor: 'rgb(251,250,252)',
  },
  input: {
    flex: 1,
    height: 50,
    // borderWidth: 1,
    // borderColor: '#ccc',
    backgroundColor:"rgb(243,242,245)",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: color.purple.light,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default MessageDetail;
