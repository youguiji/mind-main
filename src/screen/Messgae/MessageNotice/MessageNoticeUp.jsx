/*
 * @Description: 消息-赞和关注
 * @Version:
 * @Autor: Austral
 * @Date: 2024-01-23 16:32:13
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-30 11:54:37
 */
import { Avatar } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { color } from '../../../assets/color';
import { getChatEvent } from '../../../network/modules/message';

const MessageNoticeUp = ({ navigation }) => {
  useEffect(() => {
    getChatEvent('like', 1, 3).then(res => {
      console.log(res);
      // setUpList(res.data.list);
      // console.log(upList);
    });
  }, []);

  const [upList, setUpList] = useState([
    {
      id: 1234,
      recipientId: 1684747893205618690,
      remindTime: '2023-12-07T12:16:02.000+00:00',
      senderId: 23,
      sourceContent: '中学心理老师：有的孩子表面没啥，其实困在...',
      sourceId: 123,
      state: 0,
      url: 'test',
      username: '月亮不睡我不睡',
      number: 9,
      avatar:
        'https://img0.baidu.com/it/u=1355458119,1161929395&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
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
      username: '卡皮巴拉',
      number: 10,
      avatar:
        'https://img0.baidu.com/it/u=825934528,506475343&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    },
  ]);

  return (
    <View>
      <TitleHeader
        title="赞和收藏"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contain}>
        {upList.map(item => {
          return (
            <Pressable
              style={styles.listBox}
              onPress={() => {
                navigation.navigate('MEATTENTIONPERPAGE');
              }}>
              <Avatar rounded size={50} source={{ uri: item.avatar }} />
              <View style={styles.mid}>
                <Text style={styles.text}>{item.username}</Text>

                <Text>赞了你 {item.number}分钟前</Text>
                <Text style={styles.content}>{item.sourceContent}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contain: {
    marginTop: 40,
  },
  listBox: {
    height: 110,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: color.gray.light,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  mid: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
    // paddingVertical: 20,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  content: {},
});

export default MessageNoticeUp;
