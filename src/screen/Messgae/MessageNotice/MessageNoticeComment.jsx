/*
 * @Description:消息-新增评论
 * @Version:
 * @Autor: Austral
 * @Date: 2024-01-23 17:05:55
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-15 14:45:29
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import Icon from '../../../components/Icon';
import { color } from '../../../assets/color';
import { Avatar } from '@rneui/base';

const MessageNoticeComment = ({ navigation }) => {
  const comment = [
    {
      id: 1234,
      recipientId: 1684747893205618690,
      remindTime: '2023-12-07T12:16:02.000+00:00',
      senderId: 23,
      sourceContent: '中学心理老师：有的孩子表面没啥，其实困在...',
      sourceId: 123,
      state: 0,
      url: 'test',
      username: '明天再见',
      number: 9,
      avatar:
        'https://img2.baidu.com/it/u=707724282,1128627083&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380',
    },
    {
      id: 123,
      recipientId: 168474789320561869,
      remindTime: '2023-12-07T12:16:02.000+00:00',
      senderId: 23,
      sourceContent: '中学心理老师：有的孩子表面没啥，其实困在...',
      sourceId: 123,
      state: 0,
      url: 'test',
      username: '小兔子乖乖',
      number: 10,
      avatar:
        'https://img1.baidu.com/it/u=4243707043,517558408&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    },
  ];

  return (
    <View>
      <TitleHeader
        title="收到的评论和@"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contain}>
        {comment.map(item => {
          return (
            <Pressable
              key={item.id}
              style={styles.listBox}
              onPress={() => {
                navigation.navigate('MEATTENTIONPERPAGE');
              }}>
              <Avatar rounded size={32} source={{ uri: item.avatar }} />

              <View style={styles.mid}>
                <Text style={styles.text}>{item.username}</Text>

                <Text style={{ fontSize: 12 }}>评论了你的笔记</Text>
                <Text style={styles.content}>{item.sourceContent}</Text>
                <View style={styles.selectBox}>
                  <Pressable style={styles.up}>
                    <Icon size={20} icode={'\ue8c3'} />
                    <Text style={styles.selectText}>点赞</Text>
                  </Pressable>
                  <Pressable style={styles.up}>
                    <Icon size={20} color={'#000'} icode={'\ue74e'} />
                    <Text style={styles.selectText}>回复</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    marginTop: 40,
    backgroundColor: '#fff',
  },
  listBox: {
    height: 180,
    width: '95%',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: color.gray.light,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // alignItems: 'center',
    paddingVertical: 20,
  },
  mid: {
    height: 120,
    marginLeft: 10,
    // justifyContent: 'space-evenly',
    // paddingVertical: 20,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  selectBox: {
    flexDirection: 'row',
  },
  content: {
    borderLeftWidth: 3,
    paddingLeft: 10,
    fontSize: 12,
    marginVertical: 10,
    borderLeftColor: 'rgb(229,229,229)',
  },
  up: {
    backgroundColor: 'rgb(245,245,245)',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#000',
  },
});

export default MessageNoticeComment;
