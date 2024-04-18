/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 22:16:06
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 21:40:13
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
import Icon from '../../../components/Icon';
import { color } from '../../../assets/color';

const Article = ({ navigation }) => {
  const dispatch = useDispatch();

  images = [
    'https://qiniu.flywe.xyz/MindInsight/2024/03/30/49f8674a43a0d2c1.jpg',
    'https://qiniu.flywe.xyz/MindInsight/2024/03/30/93e15a8af45b93f1.jpg',
    'https://qiniu.flywe.xyz/MindInsight/2024/03/30/7b05a9f1b4e03745.jpg',
    'https://qiniu.flywe.xyz/MindInsight/2024/03/30/f20b03052253a65c.jpg',
    'https://qiniu.flywe.xyz/MindInsight/2024/03/30/657fc1013c487316.jpg',
  ];
  const [article, setArticle] = useState([]);
  useEffect(() => {
    //dispatch(LoginOut());
    getArticle(1, 1, 30, true)
      .then(res => {
        console.log(res.data.list);
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
    <View style={{ backgroundColor: '#fff' }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={article}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={
          <View>
            <Swiper images={images} />
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* left */}
              <View style={styles.container}>
                <View style={{ flexDirection: 'row', borderRadius: 14 }}>
                  <Icon icode={'\ue60c'} size={24} color={'rgb(148,117,255)'} />
                  <Text style={styles.text}>心理咨询</Text>
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    marginLeft: 5,
                    color: color.purple.deep,
                    marginTop: 10,
                  }}>
                  45320人
                </Text>
                <Text style={styles.choice}>选择了这里</Text>
                <Text
                  style={{
                    marginTop: 25,
                    fontSize: 10,
                    color: color.purple.deep,
                  }}>
                  你不是一个人战斗
                </Text>
              </View>
              {/* right */}
              <View style={{ width: '50%' }}>
                {/* 右上 */}
                <View style={styles.contain}>
                  <View style={{ flexDirection: 'row', borderRadius: 14 }}>
                    <Icon icode={'\ue60c'} size={24} color={color.pink} />
                    <Text style={[styles.text]}>心理论坛</Text>
                  </View>
                  <Text style={[styles.choice, { color: color.pink }]}>
                    心灵交流平台
                  </Text>
                </View>
                {/* 右下 */}
                <View style={styles.contain}>
                  <View style={{ flexDirection: 'row', borderRadius: 14 }}>
                    <Icon icode={'\ue60c'} size={24} color={color.pink} />
                    <Text style={[styles.text]}>即时倾诉</Text>
                  </View>
                  <Text style={[styles.choice, { color: color.pink }]}>
                    倾诉解忧
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.naviBox}>
              <View style={styles.itemBox}>
                <View style={styles.itemBox1}>
                  <Icon icode={'\ue60d'} color={'#fff'} size={26} />
                </View>

                <Text>精选</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox2}>
                  <Icon color={'#fff'} icode={'\ue636'} size={26} />
                </View>
                <Text>婚恋情感</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox3}>
                  <Icon icode={'\ue606'} color={'#fff'} size={26} />
                </View>
                <Text>心理科普</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox4}>
                  <Icon color={'#fff'} icode={'\ue707'} size={26} />
                </View>
                <Text>人际社交</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox5}>
                  <Icon color={'#fff'} icode={'\ue679'} size={26} />
                </View>
                <Text>亲子教育</Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <ArticleSingle
              avatar={item.avatar}
              content={item.content}
              title={item.title}
              username={item.username}
              viewCount={item.viewCount}
              sun={item.likeCount}
              // url={imageUrl}
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

const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: 140,
    padding: 10,
    backgroundColor: 'rgb(244,241,255)',
    borderRadius: 14,
  },
  text: {
    fontSize: 15,
    color: '#000',
    marginLeft: 4,
  },
  choice: {
    fontSize: 10,
    // color: '#fff',
    // color: 'rgb(116,128,144)',
    color: color.purple.deep,
  },
  contain: {
    backgroundColor: 'rgb(255,241,248)',
    width: '100%',
    height: 65,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
  },
  naviBox: {
    width: '90%',
    borderRadius: 16,
    // borderWidth: 1,
    // borderColor: 'rgb(148,117,255)',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    // position: 'relative',
    // top: -25,
  },
  itemBox: {
    color: '#333',
    alignItems: 'center',
  },

  itemBox1: {
    backgroundColor: 'rgb(255,204,128)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox2: {
    backgroundColor: 'rgb(255,162,128)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox3: {
    backgroundColor: 'rgb(110,221,129)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox4: {
    backgroundColor: 'rgb(140,149,255)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox5: {
    backgroundColor: 'rgb(128,206,255)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
});
export default Article;
