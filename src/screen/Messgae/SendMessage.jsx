import { Avatar } from '@rneui/base';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const SendMessage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, content: 'Hello!', sender: 'me' },
    { id: 2, content: 'Hi there!', sender: 'other' },
    // Add more messages as needed
  ]);

  const renderMessage = message => {
    const isMe = message.sender === 'me';
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isMe ? styles.messageMe : styles.messageOther,
        ]}>
        <Avatar rounded size={48} />
        <View>
          <Text>username</Text>
          <Text style={styles.messageText}>{message.content}</Text>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'me',
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={text => setInputMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  messageMe: {
    alignSelf: 'flex-start',
    backgroundColor: '#b3e0ff', // Your color for messages sent by you
  },
  messageOther: {
    alignSelf: 'flex-end',
    backgroundColor: '#99ff99', // Your color for messages sent by others
  },
  messageText: {
    fontSize: 16,
  },
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

export default SendMessage;
