/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-24 20:34:04
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 16:13:47
 */
import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import Search from '../../../components/Search';
import Icon from '../../../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';
import TopCard from './Components/TopCard';
import { color } from '../../../assets/color';
import Classification from './Components/Classification';

const Assessment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon
            iconPress={() => {
              navigation.goBack();
            }}
            icode={'\ueb05'}
            size={20}
          />
          <Text style={styles.title}> 情绪晴雨表 </Text>
        </View>
        <Search title="潜在性格" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopCard />
        <Classification />
        {/* <Image
          source={{ uri: 'https://www.psy.com.cn/lb/picture/ais.png' }}
          style={styles.topImage}
        /> */}
        {/* 卡片 */}
        <View style={styles.rowContainer}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontWeight: '600',
              paddingLeft: 15,
            }}>
            性格类型
          </Text>
          <Text style={{ fontSize: 14, color: '#fcfcfc', paddingLeft: 15 }}>
            性格决定命运？--揭开你的隐藏性格
          </Text>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentDetail');
            }}>
            <View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                心理压力测试
              </Text>
              <Text>测测你的心理压力</Text>
              <Pressable
                style={{
                  width: '55%',
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  // borderWidth: 1,
                  marginTop: 35,
                  borderRadius: 14,
                  backgroundColor: 'rgb(255,188,202)',
                  // borderColor: color.pink,
                }}>
                <Text style={{ color: '#fff' }}>去测试</Text>
              </Pressable>
            </View>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/sas.jpg' }}
              style={styles.image}
            />
          </Pressable>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable
              style={styles.imageContainer2}
              onPress={() => {
                navigation.navigate('AssessmentTest');
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                性格魅力测试
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>去测试</Text>
                </Pressable>
                <Image
                  source={{ uri: 'https://www.psy.com.cn/lb/picture/sds1.jpg' }}
                  style={styles.image2}
                />
              </View>
            </Pressable>
            <Pressable
              style={styles.imageContainer2}
              onPress={() => {
                navigation.navigate('AssessmentTest');
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                人格阴暗面测试
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>去测试</Text>
                </Pressable>
                <Image
                  source={{
                    uri: 'https://imgco.xinli001.com/weizhan/20170705/ec8fd29955e2f44724e7a03ee5665e9e.jpg?x-oss-process=image/resize,p_60/quality,Q_80',
                  }}
                  style={styles.image2}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.rowContainer,
            { backgroundColor: 'rgb(249,194,200)' },
          ]}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontWeight: '600',
              paddingLeft: 15,
            }}>
            能力类型
          </Text>
          <Text style={{ fontSize: 14, color: '#fcfcfc', paddingLeft: 15 }}>
            你是哪个方面的天才？--多元智力测试
          </Text>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentDetail');
            }}>
            <View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                第二性格隐藏测试
              </Text>
              <Text>你有惊人的潜能吗？</Text>
              <Pressable
                style={{
                  width: '55%',
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  // borderWidth: 1,
                  marginTop: 35,
                  borderRadius: 14,
                  backgroundColor: 'rgb(255,188,202)',
                  // borderColor: color.pink,
                }}>
                <Text style={{ color: '#fff' }}>去测试</Text>
              </Pressable>
            </View>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/aas.jpg' }}
              style={styles.image}
            />
          </Pressable>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable
              style={styles.imageContainer2}
              onPress={() => {
                navigation.navigate('AssessmentTest');
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                失恋时你有一颗什么心？
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>去测试</Text>
                </Pressable>
                <Image
                  source={{
                    uri: 'https://imgco.xinli001.com/ceping/lingxi/scalePool/8efe8511e40d4be3b3f485cb4e0a9732.jpg?x-oss-process=image/resize,p_60/quality,Q_80',
                  }}
                  style={styles.image2}
                />
              </View>
            </Pressable>
            <Pressable
              style={styles.imageContainer2}
              onPress={() => {
                navigation.navigate('AssessmentTest');
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                记忆力测试
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>去测试</Text>
                </Pressable>
                <Image
                  source={{
                    uri: 'https://imgco.xinli001.com/ceping/lingxi/scalePool/da165adb2d984c399eb4722c4649802d.png?x-oss-process=image/resize,p_60/quality,Q_80',
                  }}
                  style={styles.image2}
                />
              </View>
            </Pressable>
          </View>
        </View>
        {/* <View
          style={[
            styles.rowContainer,
            { backgroundColor: 'rgb(255,237,233)' },
          ]}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontWeight: '600',
              paddingLeft: 15,
            }}>
            性格类型
          </Text>
          <Text style={{ fontSize: 14, color: '#fcfcfc', paddingLeft: 15 }}>
            性格决定命运？--揭开你的隐藏性格
          </Text>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentDetail');
            }}>
            <View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                心理压力测试
              </Text>
              <Text>测测你的心理压力</Text>
              <Pressable
                style={{
                  width: '55%',
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  // borderWidth: 1,
                  marginTop: 35,
                  borderRadius: 14,
                  backgroundColor: 'rgb(255,188,202)',
                  // borderColor: color.pink,
                }}>
                <Text style={{ color: '#fff' }}>去测试</Text>
              </Pressable>
            </View>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/sas.jpg' }}
              style={styles.image}
            />
          </Pressable>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable
              style={styles.imageContainer2}
              onPress={() => {
                navigation.navigate('AssessmentTest');
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                失恋时你有一颗什么心？
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>去测试</Text>
                </Pressable>
                <Image
                  source={{ uri: 'https://www.psy.com.cn/lb/picture/16pf.png' }}
                  style={styles.image2}
                />
              </View>
            </Pressable>
            <Pressable
              style={styles.imageContainer2}
              onPress={() => {
                navigation.navigate('AssessmentTest');
              }}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                失恋时你有一颗什么心？
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnText}>去测试</Text>
                </Pressable>
                <Image
                  source={{
                    uri: 'https://www.psy.com.cn/lb/picture/scl90.jpg',
                  }}
                  style={styles.image2}
                />
              </View>
            </Pressable>
          </View>
        </View> */}

        {/* <View style={styles.rowContainer}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentDetail');
            }}>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/scl90.jpg' }}
              style={styles.image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              职业需求测评
            </Text>
          </Pressable>

          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentTest');
            }}>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/16pf.png' }}
              style={styles.image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              焦虑倾向测评
            </Text>
          </Pressable>
        </View>
        <View style={styles.rowContainer}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentDetail');
            }}>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/aas.jpg' }}
              style={styles.image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              你想了解自己的情绪特征吗？
            </Text>
          </Pressable>

          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentTest');
            }}>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/xljk.jpg' }}
              style={styles.image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              心理健康自我评价表
            </Text>
          </Pressable>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginLeft: 10,
  },
  topImage: {
    width: '95%',
    height: 200,
    borderRadius: 14,
    margin: 10, // 添加外边距
    marginTop: 5,
  },
  rowContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.purple.shallow,
    marginHorizontal: 10,
    borderRadius: 14,
    marginTop: 10,
  },
  imageContainer: {
    width: ' 100%',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  imageContainer2: {
    width: ' 47%',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 14,
    padding: 10,
    // flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    width: '45%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  image2: {
    width: '50%',
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    width: '80%',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  btn: {
    width: '40%',
    paddingHorizontal: 6,
    paddingVertical: 5,
    // borderWidth: 1,
    marginTop: 35,
    borderRadius: 14,
    backgroundColor: 'rgb(255,188,202)',
    // borderColor: color.pink,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
  },
});
export default Assessment;
