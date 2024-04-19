// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Avatar } from '@rneui/base';
import Icon from '../../../components/Icon';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native-svg';
import { getUserArticle } from '../../../network/modules/community';
import { getUsersInfo } from '../../../network/modules/user';
import { transforTime } from '../../../util';
import { color } from '../../../assets/color';
import { currentTime } from '../../../util';

const MeUserPage = ({ navigation, route }) => {
  //用户id
  const { userId } = route.params;

  const [trends, setTrends] = useState([
    {
      id: '1734590948757262339',
      userId: '19263416795418624',
      username: 'string',
      sex: 0,
      avatar: 'string',
      type: 1,
      title: '有的孩子表面没啥，其实困在无意义感里很久了',
      content:
        '2022版“心理健康蓝皮书”《中国国民心理健康发展报告(2021~2022)》显示，参加调查的三万余名青少年中有14.8%存在不同程度的抑郁风险。',
      viewCount: 0,
      likeCount: 0,
      updateTime: '2023-11-05T12:00:00',
      tags: [
        {
          id: 0,
          tagName: 'string',
          rank: 0,
        },
      ],
      pictures: [
        {
          id: 0,
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201911%2F04%2F20191104160224_aXyMk.thumb.700_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715594868&t=bcecc79496326d231c9dce0eb253a607',
          rank: 0,
        },
        {
          id: 1,
          url: 'https://img0.baidu.com/it/u=825934528,506475343&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
          rank: 0,
        },
        {
          id: 2,
          url: 'https://img0.baidu.com/it/u=825934528,506475343&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
          rank: 0,
        },
      ],
    },
    {
      id: '1734590948757262331',
      userId: '19263416795418624',
      username: 'string',
      sex: 0,
      avatar: 'string',
      type: 1,
      title: '你为什么明明身怀潜能，却总在“画地为牢”？',
      content:
        '多年以前，网约车还没流行起来，我正在外地，那座城市的一位出租车司机跟我说起，他想做一名房地产经纪人，他说，因为他很喜欢带人到处看房子。',
      viewCount: 0,
      likeCount: 0,
      updateTime: '2024-01-23T12:00:00',
      tags: [
        {
          id: 0,
          tagName: 'string',
          rank: 0,
        },
      ],
      pictures: [
        {
          id: 0,
          url: 'string',
          rank: 0,
        },
      ],
    },
    {
      id: '1734590948757262332',
      userId: '19263416795418624',
      username: 'string',
      sex: 0,
      avatar: 'string',
      type: 1,
      title: '“回避型依恋”在亲密关系中都会有哪些特质？',
      content:
        '一些人在恋爱时，会有这些令人抓狂的感受： 你不找对方，对方也不找你；',
      viewCount: 0,
      likeCount: 0,
      updateTime: '2024-01-23T12:00:00',
      tags: [
        {
          id: 0,
          tagName: 'string',
          rank: 0,
        },
      ],
      pictures: [
        {
          id: 0,
          url: 'string',
          rank: 0,
        },
      ],
    },

  ]);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    username: 'Austral',
    attention: 12,
    ID: '124jfs321',
    fans: 23,
    sex: 0,
    userId: '023384',
    avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqe87p.jpg',
    personnalLabel: '没什么想说的',
  });
  useEffect(() => {
    //获取用户信息
    console.log(userId);
    getUsersInfo(userId).then(res => {
      console.log('获取其他用户信息' + res);
      //获取用户动态
      setUserInfo(res.data);
      getUserArticle(userId, 2, 1, 10, true).then(res => {
        console.log('获取用户动态' + res.data.List);
        setTrends(res.data.list);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'relative',
            left: '-45%',
            top: '-1%',
            fontSize: 20,
            fontFamily: 'iconfont',
          }}>
          {'\ueb05'}
        </Text>
        <Avatar size={64} rounded source={{ uri: userInfo.avatar }}></Avatar>
        <Text style={styles.name}>{userInfo.username}</Text>
        <Text>ID:{userInfo.userId}</Text>
        <Text>{userInfo.personnalLabel}</Text>
        <View style={styles.contain}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              navigation.navigate('MEATTENTIONFOLLOW', {
                id: 1,
              });
            }}>
            <Text>关注 0 {userInfo.attention}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MEATTENTIONFANS');
            }}>
            <Text style={{ marginHorizontal: 20 }}>粉丝 2 {userInfo.fans}</Text>
          </Pressable>
          <Text>动态 {trends.length}</Text>
        </View>
        {trends.map(item => {
          return (
            <Pressable
              key={item.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate('FORUMDETAIL', { id: item.id });
              }}>
              <View style={styles.left}>
                <Text style={styles.day}>
                  {transforTime(item.updateTime).day}
                </Text>
                <Text style={styles.month}>
                  {transforTime(item.updateTime).month}{' '}
                </Text>
              </View>
              <View style={styles.right}>
                <Text>{item.title}</Text>
                <Text style={styles.content} numberOfLines={2}>
                  {item.content}
                </Text>
                {/* <View style={styles.imgBox}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: item.pictures && item.pictures[0] && item.pictures[0].url,
                    }}
                  />
                </View> */}
                {/* <View style={styles.comment}>
                  <Icon size={18} icode={'\ue64a'} />
                  <Text style={{ marginRight: 20 }}>{item.likeCount}</Text>

                </View> */}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={styles.bottomBox}>
        <Pressable style={styles.botnt}>
        <Icon
            size={18}
            color={'#fff'}
            icode={'\ue7d4'}
            iconPress={() => {
              console.log('iconpress');
              console.log(item.id);
              openModal(item.id);
            }}
          />
          <Text style={styles.boText}>关注</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('MESSAGEDETAIL', {
              receiverId: userId,
              lastTime: currentTime,
            });
            console.log(userId);
          }}
          style={styles.botn}>
          <Icon
            size={18}
            color={'#fff'}
            icode={'\ue60c'}
            iconPress={() => {
              console.log('iconpress');
              console.log(item.id);
              openModal(item.id);
            }}
          />
          <Text style={styles.boText}>私信</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  floatingIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  contain: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 7,
    paddingVertical: 15,
  },
  day: {
    fontSize: 26,
    fontWeight: '500',
    color: '#000',
  },
  month: {
    color: '#000',
  },
  content: {
    marginVertical: 10,
  },
  imgBox: {
    height: 100,
    flex: 1,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 24,
  },
  comment: {
    flexDirection: 'row',
    alignItem: 'center',
  },
  bottomBox: {
    width: '100%',
    position: 'absolute',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#ccc',
    bottom: 10,
  },
  botn: {
    flexDirection: 'row',
    alignItem: 'center',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.purple.deep,
    borderRadius: 16,
  },
  botnt: {
    flexDirection: 'row',
    alignItem: 'center',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,168,203)',
    borderRadius: 16,
  },
  boText: {
    color: '#fff',
    paddingHorizontal: 5,
    paddingBottom: 4,
  },
});
export default MeUserPage;
