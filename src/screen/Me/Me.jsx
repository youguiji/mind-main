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
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
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

const screenWidth = Dimensions.get('window').width;
const numColumns = 2; // 定义列数

const Me = ({ navigation }) => {
  const [trends, setTrends] = useState([]);
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
      getUserArticle('2',userInfo.userId,1,1,true).then(res => {
        console.log("获取用户动态"+res.form);
        setTrends(res.data.list);
      }).catch(err=>{
        console.log("获取用户动态"+err);
      });
    });
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
        {userInfo&& (
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
            }}
          >
            <Text>关注 {userInfo.attention}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MEATTENTIONFANS');
            }}>
            <Text style={{ marginHorizontal: 20 }}>粉丝 {userInfo.fans}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('MEDIARY');
            }}>
            <Text style={{ marginRight: 20 }}>日记 {userInfo.fans}</Text>
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
                  {transforTime(item.creatTime).day}
                </Text>
                <Text style={styles.month}>
                  {transforTime(item.creatTime).month}
                </Text>
              </View>
              <View style={styles.right}>
                <Text>{item.title}</Text>
                <Text style={styles.content} numberOfLines={2}>
                  {item.content}
                </Text>
                <View style={styles.imgBox}>
                  <FlatList
                    data={item.pictures}
                    renderItem={({ item }) => (
                      <View style={styles.imgBox}>
                        <Image
                          key={item.id}
                          style={styles.img}
                          source={{ uri: item.url }}
                        />
                      </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}></FlatList>
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
    marginVertical: 15,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    marginVertical: 10,
  },
  imgBox: {
    flex: 1,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
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
});
export default Me;
