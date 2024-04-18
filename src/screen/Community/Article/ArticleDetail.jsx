/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-21 19:21:27
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-05 00:42:18
 */
import React, { useState, useEffect, useRef } from 'react';
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
  replyComment,
  upArticle,
} from '../../../network/modules/community';
import Swiper from '../../../components/Swiper';
import { useNotification } from '../../../components/Notification';
import { getUserInfo } from '../../../network/modules/user';
import { currentTime } from '../../../util';
import Tag from '../../../components/Tag';

const ArticleDetail = ({ route, navigation }) => {
  //路径参数
  const { id } = route.params;
  //评论内容
  const [comment, setComment] = useState('');
  //评论列表
  const [commentList, setCommentList] = useState([]);
  //图片
  const [images, setImages] = useState([]);
  //详细内容
  const [articleDetail, setarticleDetail] = useState({});
  //当前回复的评论id
  const [replyCommentId, setReplyCommentId] = useState(null);
  //通知框
  const showNotification = useNotification();
  const [userInfo, setUserInfo] = useState({});

  const [up, setUp] = useState(false);

  const inputRef = useRef(null);
  // 点击评论触发的函数
  const commentPress = commentId => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    //setReplyCommentId(commentId);
  };

  // 发送评论触发的函数
  const handleSendComment = () => {
    // 在这里发送评论，使用 replyCommentId 标识回复的评论
    console.log(comment);
    console.log(commentList);

    const parentCommentIndex = commentList.findIndex(
      item => item.rootCommentVo.id === replyCommentId,
    );
    if (parentCommentIndex !== -1) {
      if (toCommentUserId != -1) {
        // 找到母评论后，在其 childComment 数组中添加新的子评论
        commentList[parentCommentIndex].childComment.unshift({
          // 新评论的数据对象
          createTime: currentTime,
          updateTIme: currentTime,
          deleteFlag: false,
          id: commentList[parentCommentIndex].childComment.length + 1, // 替换为实际的 ID 生成逻辑
          publicationId: 0,
          userId: 1, // 替换为实际的用户 ID
          username: 'newChild', // 替换为实际的用户名
          sex: 1,
          avatar:
            'https://tupian.qqw21.com/article/UploadPic/2019-1/201912022251641200.jpg', // 替换为实际的头像 URL
          content: comment, // 从输入框获取评论内容
          parentCommentId: replyCommentId, // 指定父评论 ID
          toCommentUserId: -1,
          toUsername: 'parent1', // 替换为实际的母评论用户名
          toSex: 1,
          toAvatar: 'http://dummyimage.com/200x300', // 替换为实际的母评论用户头像 URL
          toCommentId: replyCommentId, // 指定母评论 ID
          likeCount: 0,
          isFeatured: 12,
        });
        replyComment(articleDetail.id, comment, replyCommentId).then(res => {
          console.log(res);
        });
        setComment('');
      } else {
        commentList[parentCommentIndex].rootCommentVo.unshift({
          createTime: currentTime,
          updateTIme: currentTime,
          deleteFlag: false,
          id: commentList[parentCommentIndex].rootCommentVo.length + 1, // 替换为实际的 ID 生成逻辑
          publicationId: 0,
          userId: userInfo.userId,
          username: userInfo.username,
          sex: userInfo.sex,
          avatar: userInfo.avatar,
          content: comment,
          parentCommentId: replyCommentId,
          toCommentUserId: -1,
          toUsername: 'parent1',
          // toSex: 1,
          // toAvatar: 'http://dummyimage.com/200x300',
          // toCommentId: replyCommentId,
          likeCount: 0,
          isFeatured: 0,
        });
        console.log(commentList);
        postComment(articleDetail.id, comment, -1).then(res => {
          console.log(res);
        });
        setComment('');
        console.log(commentList);
      }
    }

    postComment(id, comment, replyCommentId).then(res => {
      console.log(res);
    });
    //清空
    setComment('');
    // 清除回复状态
    //setShowCommentInput(false);
    setReplyCommentId(null);
  };

  //数据加载
  useEffect(() => {
    console.log(id);
    getUserInfo().then(res => {
      setUserInfo(res.data);
      console.log(res.data);
    });
    getArticleDetail(id).then(res => {
      console.log(res.data);
      setarticleDetail(res.data);
      setImages(res.data.pictures.map(item => item.url));
      getComment(id, 1, 30, true).then(res => {
        //console.log(res);
        setCommentList(res.data.list);
        //console.log(commentList.rootCommentVo);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <TitleHeader
        title="文章详情"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.userBox}>
          <Pressable style={styles.userLeft}>
            <Pressable
              onPress={() => {
                navigation.navigate('MEUSERPAGE', {
                  userId: articleDetail.userId,
                });
                console.log(articleDetail.userId);
              }}>
              <Avatar
                size={64}
                source={{ uri: articleDetail.avatar }}
                rounded
              />
            </Pressable>
            <Text style={styles.name}>{articleDetail.username}</Text>
            <View style={styles.health}>
              <Text style={styles.healthText}>心理健康师</Text>
            </View>
          </Pressable>
          <Pressable style={styles.userRight}>
            <Text style={styles.btn}>关注</Text>
          </Pressable>
        </View>
        {/* 轮播图 */}
        {/* <View style={styles.swiper}>
          <Swiper images={images} />
        </View> */}

        {/* 内容 */}
        <View style={styles.contentBox}>
          <Text style={styles.title}>{articleDetail.title}</Text>
          <Text style={styles.content}>{articleDetail.content}</Text>

          {/* tag组 */}
          <View style={styles.tag}>
            {articleDetail.tags &&
              articleDetail.tags.map(item => {
                return <Tag key={item.id} text={item.tagName} />;
              })}

            <Tag text="1" />
            <Tag text="1" />
          </View>
          {/* 发布时间 */}
          <Text style={styles.time1}>发布于{articleDetail.updateTime}</Text>
        </View>

        {/* 评论区 */}
        <View style={styles.commentBox}>
          {commentList.map(item => {
            return (
              <Pressable style={styles.commentList}>
                <Avatar
                  size={48}
                  source={{ uri: item.rootCommentVo.avatar }}
                  rounded
                />
                <View style={styles.commentItem}>
                  <View style={styles.commentDetail}>
                    <View
                      style={styles.middleBox}
                      onPress={commentPress(item.id)}>
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
                  {item.childComment &&
                    item.childComment.map(child => {
                      return (
                        // 子评论
                        <Pressable style={styles.childListBox}>
                          <View style={styles.commentDetail}>
                            <Avatar
                              size={32}
                              source={{ uri: child.avatar }}
                              rounded
                            />
                            <View
                              style={styles.middleBox}
                              onPress={commentPress(child.id)}>
                              <Text style={styles.commentName}>
                                {child.username}
                                {child.toCommentUserId == -1 ? (
                                  ''
                                ) : (
                                  <Text> to {child.toUsername}</Text>
                                )}
                              </Text>
                              <Text style={styles.childContent}>
                                {child.content}
                              </Text>
                              <Text style={styles.time}>
                                {child.createTime}
                              </Text>
                              {/* <Text>回复</Text> */}
                            </View>
                            <View style={styles.sun}>
                              <Text
                                style={{
                                  fontFamily: 'iconfont',
                                  fontSize: 18,
                                }}>
                                {'\ue64a'}
                              </Text>
                              <Text>{child.likeCount}</Text>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })}
                </View>
              </Pressable>
            );
          })}
          <View>
            <Text style={styles.end}>THE-END</Text>
          </View>
        </View>
      </ScrollView>
      {/* 底部发送框 */}
      <Pressable style={styles.bottom}>
        <TextInput
          placeholder="请输入你想对他说的话吧！"
          style={styles.input}
          value={comment}
          ref={inputRef}
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
          {/* <Icon size={28} icode={'\ue74e'} />
          <Text>{articleDetail.likeCount}</Text> */}
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
  tag: {
    flexDirection: 'row',
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
    height: 75,
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
    // borderStyle: 'solid',
    // borderBottomColor: color.gray.line,
    // borderBottomWidth: 1,
  },
  commentItem: {
    width: '100%',
  },
  commentDetail: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    //
  },
  health: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'rgb(110,165,95)',
    borderRadius: 14,
    marginLeft: 5,
  },
  healthText: {
    color: '#fff',
    fontSize: 12,
  },
  childListBox: {
    marginTop: 15,
  },
  childBox: {
    width: '100%',
  },
  middleBox: {
    justifyContent: 'center',
    width: '100%',
    //marginVertical: 10,
    flex: 4,
  },
  commentName: {
    fontSize: 15,
    paddingLeft: 10,
  },
  commentContent: {
    color: '#000',
    fontSize: 14,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  childContent: {
    color: '#000',
    fontSize: 12,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  time: {
    marginLeft: 10,
    fontSize: 12,
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

export default ArticleDetail;
