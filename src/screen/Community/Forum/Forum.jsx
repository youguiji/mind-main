/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 22:12:55
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-28 17:07:53
 */

import { Avatar } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { color } from '../../../assets/color';
import {
  View,
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { getArticle } from '../../../network/modules/community';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2; // 定义列数

// const userComponent = () => {
//   const [user, setUser] = useState([
//     {
//       id: 1,
//       name: '迷惑的猫',
//       avatar: 'https://w.wallhaven.cc/full/ex/wallhaven-ex2568.png',
//     },
//     {
//       id: 2,
//       name: 'Crazy sun',
//       avatar: 'https://w.wallhaven.cc/full/jx/wallhaven-jxdlvw.jpg',
//     },
//     {
//       id: 3,
//       name: 'on your best',
//       avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqeqop.png',
//     },
//     {
//       id: 4,
//       name: 'if you like',
//       avatar: 'https://w.wallhaven.cc/full/zy/wallhaven-zy9dly.jpg',
//     },
//     {
//       id: 5,
//       name: 'A dog',
//       avatar: 'https://w.wallhaven.cc/full/ex/wallhaven-ex2568.png',
//     },
//     {
//       id: 6,
//       name: 'Crazy sun23321234',
//       avatar: 'https://w.wallhaven.cc/full/ex/wallhaven-ex2568.png',
//     },
//     {
//       id: 7,
//       name: 'on your best',
//       avatar: 'https://w.wallhaven.cc/full/ex/wallhaven-ex2568.png',
//     },
//     {
//       id: 8,
//       name: 'if you like',
//       avatar: 'https://w.wallhaven.cc/full/ex/wallhaven-ex2568.png',
//     },
//   ]);
//   return (
//     <FlatList
//       data={user}
//       renderItem={({ item }) => (
//         <View style={styles.user}>
//           <Avatar rounded size={48} source={{ uri: item.avatar }} />
//           <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
//             {item.name}
//           </Text>
//         </View>
//       )}
//       keyExtractor={(item, index) => item.id}
//       horizontal={true}
//       showsHorizontalScrollIndicator={false}
//       pagingEnabled={true}
//       getItemLayout={(data, index) => ({
//         length: screenWidth / 3,
//         offset: (screenWidth / 3) * index,
//         index,
//       })}></FlatList>
//   );
// };

const Forum = ({ navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getArticle(1, 10)
      .then(res => {
        console.log(res);
        setList(res.data.list);
        console.log('form:' + res.data.list);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <View style={styles.Box}>
      <FlatList
        data={list}
        //ListHeaderComponent={userComponent}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => {
              navigation.navigate('FORUMDETAIL',{id:item.id});
            }}>
            <View style={styles.item}>
              <View style={styles.imgBox}>
                <Image
                  style={styles.img}
                  source={{
                    uri: item.pictures[
                      Math.floor(Math.random() * item.pictures.length)
                    ],
                  }}
                />
              </View>
              <Text numberOfLines={2} style={styles.content}>
                {item.content}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.nameBox}>
                  <Avatar
                    size={28}
                    rounded
                    source={{
                      uri: item.avatar,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.itemText}>
                    {item.username}
                  </Text>
                </View>
                {/* <View style={styles.commentBox}>
                  <Text style={{ fontFamily: 'iconfont', fontSize: 18 }}>
                    {'\ue64a'}
                  </Text>
                  <Text>12</Text>
                </View> */}
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    backgroundColor: '#fff',
  },
  userBox: {
    backgroundColor: color.purple.shallow,
  },
  user: {
    width: screenWidth / 5,
    paddingVertical: 15,
    marginLeft: screenWidth / 30,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 10,
    height: 100,
    borderWidth: 1, // 1或者其他大于0的数字
    borderColor: color.purple.deep, // 边框颜色
  },
  userName: {
    width: '80%',
    marginTop: 8,
  },
  container: {
    margin: 2,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    borderBlockColor: color.purple.deep,
    borderTopColor: color.purple.deep,
  },
  itemText: {
    fontSize: 14,
    marginLeft: 5,
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  imgBox: {
    flex: 1,
    height: 200,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 24,
  },
  content: {
    color: '#000',
    fontSize: 16,
    paddingTop: 8,
  },
  commentBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
});

export default Forum;
