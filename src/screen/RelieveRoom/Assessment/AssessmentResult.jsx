/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-04-19 14:58:41
 * @LastEditors: Austral
 * @LastEditTime: 2024-06-18 14:57:09
 */
import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from '../../../components/Icon';
const AssessmentResult = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/systemImage/9638DBA34F1D91F6C852E7571264B5AC.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <Icon
            iconPress={() => {
              navigation.goBack();
            }}
            style={styles.headerLeft}
            icode={'\ueb05'}
            size={20}
          />
          <Text style={styles.title}>测试结果</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.testTitle}>失恋时你有一颗什么心？</Text>
          <Text style={styles.testResult}>
            测试结果:B.越挫越勇的橡皮心 你很冷静理智，即使暗恋别人也不会让事情失
            去控制。你对恋爱的态度是随遇而安，明白任
            何事情都不可强求。若一段感情真的发展不下
            去，你绝不会勉强维持下去而赔上快乐和自
            信。一旦真的分手，你会伤心，但很快便会复
            元，就如一个橡皮球，掉在地上就会反弹，甚 至跳得比以前更高
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // flex: 1,
    // padding: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    // paddingTop: 20,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    // paddingTop: 20,

  },
  content: {
    marginTop: 20,
    margin: 20,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  testResult: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AssessmentResult;
