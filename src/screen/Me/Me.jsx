// screens/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { LoginOut } from '../../store/modules/login';
import { Avatar } from '@rneui/base';
import Icon from '../../components/Icon';
import { Image } from 'react-native-svg';
import { getUserInfo } from '../../network/modules/user';
import { getUserArticle } from '../../network/modules/community';
import { transforTime } from '../../util';
import { color } from '../../assets/color';
import ModalComponent from '../../components/Model';
import { deleteArticle } from '../../network/modules/community';
import { setIsVisite ,selectIsVisite,clearIsVisite  } from '../../store/modules/user';
import { store } from '../../store/configureStore';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2; // 定义列数

const Me = ({ navigation }) => {
  const [visitedPage, setVisitedPage] = useState(false);
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const openModal = id => {
    setDeleteId(id);
    setIsModalVisible(true);
  };
  const handleConfirm = () => {
    console.log('确认操作，参数为:', deleteId);
    deleteArticle(deleteId)
      .then(res => {
        console.log(res);
        if (res.ok) {
          console.log('删除成功');
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 在这里处理确认操作
  };
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
    // dispatch(LoginOut());
    
    //获取用户信息
    getUserInfo().then(res => {
      console.log(res);
      setUserInfo(res.data);
      //获取用户动态
      getUserArticle('2', userInfo.userId, 1, 1, true)
        .then(res => {
          console.log('获取用户动态' + res.form);
          setTrends(res.data.list);
        })
        .catch(err => {
          console.log('获取用户动态' + err);
        });
    });
    const checkVisitedPage = async () => {
      try {
        const value = store.getState().user.isVisite;
        console.log("value:"+value);
        // console.log(typeof(value));
        if (value==1) {
          // dispatch(setIsVisite(2));
          dispatch(clearIsVisite())
          setTrends([
            {
              id: '17345909487572623393',
              userId: '19263416795418624',
              username: 'string',
              sex: 0,
              avatar: 'string',
              type: 1,
              title: '阳光明媚的清晨',
              content:
                '清晨的阳光透过窗户洒进房间，温暖而明媚。这样的天气让人心旷神怡，仿佛一切都变得清新起来。闭上眼睛，感受着轻风拂过脸庞的触感，心情也跟着变得宁静而愉悦。愿这美好的一天带给你无尽的喜悦和美好的回忆。',
              viewCount: 0,
              likeCount: 0,
              updateTime: '2024-04-28T12:00:00',
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
            ...trends
          ]);
          // setVisitedPage(true);
        } else {
          console.log(value);
          dispatch(setIsVisite(1));
        }
      } catch (error) {
        console.error('Error reading or setting AsyncStorage:', error);
      }
    };

    // useFocusEffect(
    //   React.useCallback(() => {
        checkVisitedPage();
      // }, [])
    // );
    //获取用户
  }, []);

  return (
    <View style={styles.container}>
      <ModalComponent
        visible={isModalVisible}
        title="确定要删除这条动态吗？"
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirm}
        parameter={deleteId}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          onPress={() => {
            navigation.navigate('MESETTING');
          }}
          style={{
            position: 'relative',
            right: '-45%',
            top: '-1%',
            fontSize: 20,
            fontFamily: 'iconfont',
          }}>
          {'\ue68f'}
        </Text>
        {userInfo && (
          <Avatar size={64} rounded source={{ uri: userInfo.avatar }}></Avatar>
        )}
        {/* <Avatar size={64} rounded source={{ uri: userInfo.avatar }}></Avatar> */}
        <Text style={styles.name}>{userInfo.username}</Text>
        <Text>ID:{userInfo.userId}</Text>
        <Text>{userInfo.personalLabel}</Text>
        <View style={styles.contain}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              navigation.navigate('MEATTENTIONFOLLOW', {
                id: 1,
              });
            }}>
            <Text>关注 </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MEATTENTIONFANS');
            }}>
            <Text style={{ marginHorizontal: 20 }}>粉丝</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MEDIARY');
            }}>
            <Text style={{ marginRight: 20 }}>随心记 </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MECERTIFICATIONHOME');
            }}>
            <Text>咨询主页 </Text>
          </Pressable>
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
                  {transforTime(item.updateTime).month}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={{ color: '#000', fontSize: 14 }}>
                  {item.title}
                </Text>
                <Text style={styles.content} numberOfLines={2}>
                  {item.content}
                </Text>
                {/* 三张图片 */}
                <View style={styles.imgContainer}>
                  {item.pictures.map(pic => (
                    <Image
                      key={pic.id}
                      style={styles.img}
                      source={{ uri: pic.url }}
                    />
                  ))}
                </View>

                <View style={styles.comment}>
                  <Icon
                    size={18}
                    icode={'\uec7b'}
                    iconPress={() => {
                      console.log('iconpress');
                      console.log(item.id);
                      openModal(item.id);
                    }}
                  />
                </View>
              </View>
            </Pressable>
          );
        })}

        <Button
          title="退出"
          style={{ padding: 10 }}
          onPress={() => {
            console.log('out');
            dispatch(LoginOut());
          }}></Button>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingIconContainer}
        onPress={() => {
          navigation.navigate('FORUMADD');
        }}>
        <Text
          style={{
            fontFamily: 'iconfont',
            fontSize: 32,
            color: '#9471E3',
          }}>
          {'\ue762'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginVertical: 10,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    // height: 200,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  left: {
    flex: 1.5,
    alignItems: 'center',
  },
  right: {
    flex: 8,
    paddingVertical: 15,
  },
  user: {
    width: 100,
    paddingVertical: 15,
    marginLeft: screenWidth / 30,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 5,
    height: 100,
    borderWidth: 1,
    borderColor: color.purple.deep, // 边框颜色
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
    marginVertical: 5,
    fontSize: 13,
  },
  imgContainer: {
    flexDirection: 'row', // 横向排列图片
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 100, // 图片宽度
    height: 100, // 图片高度
    marginRight: 10, // 图片之间的间距
    borderRadius: 10, // 图片圆角
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  comment: {
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'flex-end',
  },
});
export default Me;
