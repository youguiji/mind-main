/*
 * @Description: 动态详情
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-14 21:11:38
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-10 17:13:40
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import { Avatar } from '@rneui/base';
import { color } from '../../../assets/color';
import Icon from '../../../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getArticleDetail,
  getComment,
  postComment,
} from '../../../network/modules/community';
import Swiper from '../../../components/Swiper';
import { getUserInfo } from '../../../network/modules/user';

const ForumDetail = ({ route, navigation }) => {
  //路径参数
  const { id } = route.params;
  //评论内容
  const [comment, setComment] = useState('');
  const [userInfo, setUserInfo] = useState({});

  //评论列表
  const [commentList, setCommentList] = useState([]);
  //图片
  const [images, setImages] = useState([]);
  //详细内容
  const [articleDetail, setarticleDetail] = useState({});
  //数据加载
  useEffect(() => {
    console.log(id);
    getUserInfo().then(res => {
      setUserInfo(res.data);
      console.log(res.data);
    });
    getArticleDetail(id).then(res => {
      //console.log(res.data);
      setarticleDetail(res.data);
      setImages(res.data.pictures.map(item => item.url));
      getComment(id, 1, 1, false).then(res => {
        console.log(res);
        setCommentList(res.data.list);
        //console.log(commentList.rootCommentVo);
      });
    });
  }, []);

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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MEUSERPAGE', {
                  userId: articleDetail.userId,
                });
              }}>
              <Avatar
                size={64}
                source={{ uri: articleDetail.avatar }}
                rounded
              />
            </TouchableOpacity>
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
          <Text style={styles.time}>发布于{articleDetail.updateTime}</Text>
        </View>

        {/* 评论区 */}
        <View style={styles.commentBox}>
          {commentList.map(item => {
            return (
              <View style={styles.commentList}>
                <Avatar
                  size={48}
                  source={{ uri: item.rootCommentVo.avatar }}
                  rounded
                />
                <View style={styles.commentDetail}>
                  <View>
                    <Text style={styles.commentName}>
                      {item.rootCommentVo.username}
                    </Text>
                    <Text style={styles.commentContent}>
                      {item.rootCommentVo.content}
                    </Text>
                    <Text style={styles.time}>
                      {item.rootCommentVo.createTime}
                    </Text>
                  </View>
                  <View style={styles.sun}>
                    <Text style={{ fontFamily: 'iconfont', fontSize: 18 }}>
                      {'\ue64a'}
                    </Text>
                    <Text>{item.rootCommentVo.likeCount}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View>
            <Text style={styles.end}>THE-END</Text>
          </View>
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
        <Pressable
          style={styles.userRight}
          onPress={() => {
            console.log(comment);
            console.log(commentList);
            // 创建一个新的 Date 对象
            let currentDate = new Date();

            // 获取当前时间的各个部分
            let year = currentDate.getFullYear();
            let month = (currentDate.getMonth() + 1)
              .toString()
              .padStart(2, '0'); // 月份是从 0 开始计数的，需要加 1
            let day = currentDate.getDate().toString().padStart(2, '0');
            let hours = currentDate.getHours().toString().padStart(2, '0');
            let minutes = currentDate.getMinutes().toString().padStart(2, '0');
            let seconds = currentDate.getSeconds().toString().padStart(2, '0');

            // 构建时间字符串
            let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            // 输出当前时间
            console.log('当前时间是：' + formattedTime);

            //更新评论数组
            commentList.unshift({
              rootCommentVo: {
                id: 1,
                content: comment,
                likeCount: 0,
                avatar: userInfo.avatar,
                parentCommentId: -1,
                username: userInfo.username,
                createTime: formattedTime,
              },
            });
            //清空
            postComment(articleDetail.id,comment,-1).then(res => {
              console.log(res);
            });
            setComment('');
          }}>
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
    fontSize: 16,
    color: '#000',
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
    color: '#000',
  },

  contentBox: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderStyle: 'solid',
    borderBottomColor: color.gray.line,
    borderBottomWidth: 1,
  },
  time: {
    marginVertical: 10,
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
    marginHorizontal: 20,
    marginVertical: 10,
    borderStyle: 'solid',
    borderBottomColor: color.gray.line,
    borderBottomWidth: 1,
  },
  commentDetail: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  commentName: {
    fontSize: 15,
  },
  commentContent: {
    color: '#000',
    fontSize: 15,
  },
  sun: {
    marginLeft: 10,
    alignItems: 'center',
  },
  end: {
    marginVertical: 15,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ForumDetail;
