/*
 * @Description: 动态详情
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-14 21:11:38
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-02 15:26:20
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { Avatar } from '@rneui/base';
import { color } from '../../../assets/color';
import Icon from '../../../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getArticleDetail,
  getComment,
} from '../../../network/modules/community';
import Swiper from '../../../components/Swiper';

const ForumDetail = ({ route, navigation }) => {
  const { id } = route.params;

  const [images, setImages] = useState([]);
  const [articleDetail, setarticleDetail] = useState({});
  useEffect(() => {
    console.log(id);
    getArticleDetail(id).then(res => {
      console.log(res.data);
      setarticleDetail(res.data);
      setImages(res.data.pictures.map(item => item.url));
      getComment().then(res => {
        console.log(res);
      });
    });
  }, []);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([
    {
      id: 1,
      name: '杏仁',
      avatar: 'https://w.wallhaven.cc/full/85/wallhaven-85jlxy.png',
      comment: '呜呜呜，你说的好对',
    },
    {
      id: 2,
      avatar: 'https://w.wallhaven.cc/full/vq/wallhaven-vqekwp.jpg',
      comment: '呜呜呜，你说的好对',
    },
    {
      id: 3,
      name: '杏仁',
      comment: '呜呜呜，你说的好对',
    },
  ]);

  return (
    <View style={styles.container}>
      <TitleHeader
        title=" 动态详情"
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.userBox}>
          <Pressable style={styles.userLeft}>
            <Avatar source={{ uri: articleDetail.avatar }} rounded />
            <Text style={styles.name}>{articleDetail.username}</Text>
          </Pressable>
          <Pressable style={styles.userRight}>
            <Text style={styles.btn}>关注</Text>
          </Pressable>
        </View>
        {/* 轮播图 */}
        <View style={styles.swiper}>
          <Swiper images={images} />
        </View>

        {/* 内容 */}
        <View style={styles.contentBox}>
          <Text style={styles.title}>{articleDetail.title}</Text>
          <Text style={styles.content}>{articleDetail.content}</Text>
          {/* 发布时间 */}
          <Text>发布于{articleDetail.updateTime}</Text>
        </View>

        {/* 评论区 */}
        <View style={styles.commentBox}>
          {commentList.map(item => {
            return (
              <View style={styles.commentList}>
                <Avatar source={{ uri: item.avatar }} rounded />
                <View style={styles.commentDetail}>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Pressable style={styles.bottom}>
        <TextInput
          placeholder="请输入你想对他说的话吧！"
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />
        <View style={styles.iconBox}>
          <Icon size={32} icode={'\ue64a'} />
          <Text>{articleDetail.likeCount}</Text>
          <Icon size={32} icode={'\ue74e'} />
          <Text>{articleDetail.likeCount}</Text>
        </View>
        <Pressable style={styles.userRight}>
          <Text style={styles.btn}>发送</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 60,
    alignItems: 'center',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRight: {
    backgroundColor: color.purple.light,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  name: {
    paddingHorizontal: 15,
    // color: "#000",
  },
  swiper: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  btn: {
    color: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  contentBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
  },
  content: {
    marginBottom: 10,
  },
  iconBox: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: '#fff',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    width: '100%',
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  input: {
    width: '50%',
    backgroundColor: 'rgb(244,242,250)',
    borderRadius: 16,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  commentBox: {
    marginBottom: 80,
  },
  commentList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 0,
  },
  commentDetail: {
    marginLeft: 10,
  },
});

export default ForumDetail;
