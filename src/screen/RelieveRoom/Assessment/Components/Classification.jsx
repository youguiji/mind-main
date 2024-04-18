/*
 * @Description:分类导航
 * @Version:
 * @Autor: Austral
 * @Date: 2024-04-17 15:14:44
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-17 15:37:34
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../../../components/Icon';

const Classification = ({ navigation }) => {
  return (
    <View style={styles.naviBox}>
      {/* <View style={styles.itemBox}>
        <View style={styles.itemBox1}>
          <Icon icode={'\ue60d'} color={'#fff'} size={26} />
        </View>

        <Text>精选</Text>
      </View> */}
      <View style={styles.itemBox}>
        <View style={styles.itemBox2}>
          <Icon color={'#fff'} icode={'\ue640'} size={26} />
        </View>
        <Text styl={styles.text}>个性特征</Text>
      </View>
      <View style={styles.itemBox}>
        <View style={styles.itemBox3}>
          <Icon icode={'\ue655'} color={'#fff'} size={26} />
        </View>
        <Text>情绪健康</Text>
      </View>
      <View style={styles.itemBox}>
        <View style={styles.itemBox4}>
          <Icon color={'#fff'} icode={'\ue64e'} size={26} />
        </View>
        <Text>人际关系</Text>
      </View>
      <View style={styles.itemBox}>
        <View style={styles.itemBox5}>
          <Icon color={'#fff'} icode={'\ue75a'} size={26} />
        </View>
        <Text>职业测评</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  naviBox: {
    width: '90%',
    borderRadius: 16,
    // borderWidth: 1,
    // borderColor: 'rgb(148,117,255)',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
    // backgroundColor: 'rgb(255,204,128)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox2: {
    backgroundColor: 'rgb(182,208,195)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox3: {
    backgroundColor: 'rgb(166,136,226)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox4: {
    backgroundColor: 'rgb(129,144,232)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  itemBox5: {
    backgroundColor: 'rgb(146,197,247)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
  },
});

export default Classification;
