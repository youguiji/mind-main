/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-24 20:34:04
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-04 04:47:31
 */
import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import Search from '../../../components/Search';
import Icon from '../../../components/Icon';
import { ScrollView } from 'react-native-gesture-handler';

const Assessment = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
      <ScrollView>
        <Image
          source={{ uri: 'https://www.psy.com.cn/lb/picture/ais.png' }}
          style={styles.topImage}
        />

        <View style={styles.rowContainer}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentDetail');
            }}>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/sas.jpg' }}
              style={styles.image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              心理压力测试
            </Text>
          </Pressable>

          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              navigation.navigate('AssessmentTest');
            }}>
            <Image
              source={{ uri: 'https://www.psy.com.cn/lb/picture/sds1.jpg' }}
              style={styles.image}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              失恋时你有一颗什么心？
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderRadius: 20,
    margin: 10, // 添加外边距
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageContainer: {
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Assessment;
