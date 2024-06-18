/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-12 22:16:06
 * @LastEditors: Austral
<<<<<<< HEAD
 * @LastEditTime: 2024-06-18 15:33:35
=======
 * @LastEditTime: 2024-04-17 21:40:13
>>>>>>> 74dea70191ee3deea0c793a4b8d0e3047d453a66
 */

import { Avatar } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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
                padding: 5,
                // flexDirection: 'row',
                // justifyContent: 'space-between',
              }}>
              {/* left */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={[
                    styles.contain,
                    { backgroundColor: 'rgb(244,241,255)' },
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderRadius: 14,

                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 5,
                        color: color.purple.deep,
                        // marginTop: ,
                      }}>
                      45320人
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        padding: 5,
                        borderRadius: 50,
                      }}>
                      <Icon
                        icode={'\ue637'}
                        size={18}
                        color={'rgb(147,116,255)'}
                      />
                    </View>
                  </View>
                  <Text style={styles.choice}>选择了这里</Text>
                </View>
                <View
                  style={[
                    styles.contain,
                    { backgroundColor: 'rgb(255,241,248)' },
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderRadius: 14,
                      alignItems: 'center',
                    }}>
                    <View>
                      {/* <Icon
                        icode={'\ue60c'}
                        size={18}
                        color={'rgb(134,110,224)'}
                      /> */}
                    </View>
                    <Text style={[styles.text2]}>心理论坛</Text>
                  </View>
                  <Text
                    style={[
                      styles.choice,
                      { color: 'rgb(255,155,206)', paddingTop: 5 },
                    ]}>
                    心灵交流平台
                  </Text>
                </View>
              </View>
              {/* <View
                style={[
                  styles.container,
                  { backgroundColor: 'rgb(255,202,60)' },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 14,
                    alignItems: 'center',
                  }}>
                  <Icon icode={'\ue60c'} size={18} color={color.pink} />
                  <Text style={[styles.text, { color: '#000' }]}>即时倾诉</Text>
                </View>
                {/* <Text style={[styles.choice, { color: '#000' }]}>
                    倾诉解忧
                  </Text> 
              </View> */}
            </View>

            {/* 分类导航 */}
            <View style={styles.naviBox}>
              <Pressable
                style={styles.itemBox}
                onPress={() => {
                  navigation.navigate('ARTICLESELECT');
                }}>
                <View style={styles.itemBox1}>
                  <Icon icode={'\ue60d'} color={'rgb(167,213,238)'} size={20} />
                </View>

                <Text style={{ fontSize: 12, color: '#000' }}>精选</Text>
              </Pressable>
              <View style={styles.itemBox}>
                <View style={styles.itemBox2}>
                  <Icon color={'rgb(248,214,133)'} icode={'\ue636'} size={20} />
                </View>
                <Text style={{ fontSize: 12, color: '#000' }}>婚恋情感</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox3}>
                  <Icon icode={'\ue606'} color={'rgb(189,162,237)'} size={20} />
                </View>
                <Text style={{ fontSize: 12, color: '#000' }}>心理科普</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox4}>
                  <Icon color={'rgb(139,217,162)'} icode={'\ue707'} size={20} />
                </View>
                <Text style={{ fontSize: 12, color: '#000' }}>人际社交</Text>
              </View>
              <View style={styles.itemBox}>
                <View style={styles.itemBox5}>
                  <Icon color={'rgb(255,180,209)'} icode={'\ue679'} size={20} />
                </View>
                <Text style={{ fontSize: 12, color: '#000' }}>亲子教育</Text>
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
              // viewCount={item.viewCount}
              // sun={item.likeCount}
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
    width: '100%',
    height: 65,
    padding: 20,
    backgroundColor: 'rgb(244,241,255)',
    borderRadius: 14,
  },
  text2: {
    fontSize: 13,
    color: 'rgb(255,155,206)',
    marginLeft: 4,
  },
  choice: {
    fontSize: 10,
    color: 'rgb(153,123,255)',
    // color: 'rgb(116,128,144)',
    // color: color.purple.deep,
    paddingLeft: 4,
  },
  contain: {
    backgroundColor: 'rgb(134,110,224)',
    width: '48%',
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
    justifyContent: 'space-around',
    marginHorizontal: 20,
    // position: 'relative',
    // top: -25,
  },
  itemBox: {
    color: '#333',
    alignItems: 'center',
  },

  itemBox1: {
    backgroundColor: 'rgb(224,250,253)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox2: {
    backgroundColor: 'rgb(255,242,208)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox3: {
    backgroundColor: 'rgb(235,231,254)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox4: {
    backgroundColor: 'rgb(243,254,223)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox5: {
    backgroundColor: 'rgb(255,240,236)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
});
export default Article;
