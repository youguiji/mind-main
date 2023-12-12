/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 22:16:06
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-08 17:23:46
 */

import { Avatar } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArticleSingle from './Components/ArticleSingle';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from '../../../components/Swiper';
import { getArticle } from '../../../network/modules/community';

const Article = ({ navigation }) => {
  images = [
    'https://w.wallhaven.cc/full/qz/wallhaven-qzoxzd.jpg',
    'https://w.wallhaven.cc/full/l8/wallhaven-l8dxe2.jpg',
    'https://w.wallhaven.cc/full/we/wallhaven-wex9dr.jpg',
  ];
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle(1,2,2,true)
      .then(res => {
        console.log(res);
        setArticle(res.data.list);
        //console.log('List:' + res.data.list[0]);
      })
      .catch(err => {
        console.error(err);
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
