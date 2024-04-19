/*
 * @Description: 动态详情
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-14 21:11:38
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 21:13:36
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Tag from '../../../components/Tag';
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
import { currentTime } from '../../../util';
import { upArticle } from '../../../network/modules/community';

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
  const [up, setUp] = useState(false);
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
      getComment(id, 1, 20, false).then(res => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userBox}>
          <Pressable style={styles.userLeft}>
            {articleDetail.avatar && (
              <Pressable
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
              </Pressable>
            )}
            <Text style={styles.name}>{articleDetail.username}</Text>
          </Pressable>

          <Pressable style={styles.userRight}>
            <Text style={styles.btn}>关注</Text>
          </Pressable>
        </View>
        {/* 轮播图 */}
        <View style={styles.swiper}>
          {/* <Swiper images={images} /> */}
          {images[0] && (
            <Image source={{ uri: images[0] }} style={styles.topImage} />
          )}
        </View>

        {/* 内容 */}
        <View style={styles.contentBox}>
          <Text style={styles.title}>{articleDetail.title}</Text>
          <Text style={styles.content}>{articleDetail.content}</Text>
          {/* tag组 */}
          <View style={styles.tag}>
            {
              articleDetail.tags &&
                articleDetail.tags.map(item => {
                  return <Tag key={item.id} text={item.tagName} />;
                })
              // console.log()
            }
          </View>
          {/* 发布时间 */}
          <Text style={styles.time1}>发布于{articleDetail.updateTime}</Text>
        </View>

        {/* 评论区 */}
        <View style={styles.commentBox}>
          {commentList.map((item, index) => {
            return (
              <View style={styles.commentList} key={index}>
                <Avatar
                  size={32}
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
          <Icon
            iconPress={() => {
              if (up) {
                upArticle(id, 1, 2).then(res => {
                  console.log(res);
                  setarticleDetail(prevState => ({
                    ...prevState,
                    likeCount: res.data,
                  }));
                });
              } else {
                upArticle(id, 1, 1).then(res => {
                  console.log(res);
                  setarticleDetail(prevState => ({
                    ...prevState,
                    likeCount: res.data,
                  }));
                });
              }
              setUp(!up);
              console.log(up);
            }}
            size={28}
            icode={'\ue8c3'}
            color={up ? 'rgb(253,94,91)' : 'rgb(117,117,117)'}
          />
          <Text>{articleDetail.likeCount}</Text>
          <Icon size={32} icode={'\ue74e'} />
          <Text>{commentList.length}</Text>
        </View>
        <Pressable
          style={styles.userRight}
          onPress={() => {
            //更新评论数组
            commentList.unshift({
              rootCommentVo: {
                id: 1,
                content: comment,
                likeCount: 0,
                avatar: userInfo.avatar,
                parentCommentId: -1,
                username: userInfo.username,
                createTime: currentTime(),
              },
            });
            //清空
            postComment(articleDetail.id, comment, -1).then(res => {
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
    marginHorizontal: 10,
  },
  topImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    // margin: 10, // 添加外边距
    // marginTop: 5,
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
  tag: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  time1: {
    marginVertical: 10,
    fontSize: 12,
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
    width: '55%',
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
    // borderStyle: 'solid',
    // borderBottomColor: color.gray.line,
    // borderBottomWidth: 1,
  },
  commentDetail: {
    width: '85%',
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
    marginVertical: 10,
  },
  time: {
    fontSize: 10,
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
