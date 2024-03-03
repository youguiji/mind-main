/*
 * @Description: 消息-赞和关注
 * @Version:
 * @Autor: Austral
 * @Date: 2024-01-23 16:32:13
 * @LastEditors: Austral
 * @LastEditTime: 2024-01-29 12:35:44
 */
import { Avatar } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
      sourceContent: 'test',
      sourceId: 123,
      state: 0,
      url: 'test',
    },
  ]);

  return (
    <View>
      <TitleHeader
        title="赞和关注"
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
              <Avatar rounded source={{ uri: item.avatar }} />
              <View style={styles.mid}>
                <Text style={styles.text}>name</Text>

                <Text>赞了你 30分钟前</Text>
                <Text>{item.sourceContent}</Text>
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
    height: 80,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: color.gray.light,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  mid: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default MessageNoticeUp;
