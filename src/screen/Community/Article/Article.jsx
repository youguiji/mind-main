/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 22:16:06
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-12 21:56:51
 */

import { Avatar } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArticleSingle from './Components/ArticleSingle';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from '../../../components/Swiper';
import { useDispatch } from 'react-redux';
import { LoginOut } from '../../../store/modules/login';
import { getArticle } from '../../../network/modules/community';

const Article = ({ navigation }) => {
  const dispatch = useDispatch();

  images = [
    'https://w.wallhaven.cc/full/qz/wallhaven-qzoxzd.jpg',
    'https://w.wallhaven.cc/full/l8/wallhaven-l8dxe2.jpg',
    'https://w.wallhaven.cc/full/we/wallhaven-wex9dr.jpg',
  ];
  const [article, setArticle] = useState([]);
  useEffect(() => {
    //dispatch(LoginOut());
    getArticle(1, 1, 1, true)
      .then(res => {
        console.log(res);
        setArticle(res.data.list);
        //console.log('List:' + res.data.list[0]);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // 处理404错误，例如显示资源未找到的消息
          console.error('请求的资源不存在');
        } else {
          // 处理其他错误
          console.error('请求失败', error.message);
        }
      });
  }, []);
  return (
    <View>
      {/* <Swiper /> */}
      <FlatList
        data={article}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={<Swiper images={images} />}
        renderItem={({ item }) => {
          return (
            <ArticleSingle
              avatar={item.avatar}
              content={item.content}
              title={item.title}
              username={item.username}
              viewCount={item.viewCount}
              sun={item.likeCount}
              pictures={item.pictures[0]}
              onPress={() => {
                console.log('navigate');
                navigation.navigate('ARTICLEDETAIL', { id: item.id });
              }}
            />
          );
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Article;
