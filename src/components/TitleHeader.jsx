import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Button from './Button';
//import { Left } from '@icon-park/svg';

/**
 * @description: 标题栏组件
 * @param {ReactNode | string} title 标题文字或者组件，接受string和组件
 * @param {ReactNode} headerLeft 标题栏左侧组件 `默认返回上一级按钮`
 * @param {ReactNode} headerRight 标题栏右侧组件 `默认完成按钮`
 * @param {function} headerLeftPress 标题栏左侧默认组件 点击回调
 * @param {function} headerRightPress 标题栏右侧默认组件 点击回调
 * @param {object} style 最外层样式
 * @return {ReactNode} 标题栏组件
 * @author: Austral
 */
const TitleHeader = ({
  title,
  headerLeft,
  headerRight,
  headerLeftPress = () => {},
  headerRightPress = () => {},
  navigation,
  style,
}) => {
  return (
    <View style={style}>
      <View style={styles.fill}></View>
      <View
        style={[
          styles.titleHeader,
          {
            // top: DEVICE_STATUS_BAR_HEIGHT,
          },
        ]}>
        <View style={styles.headerLeft}>
          {headerLeft == undefined ? (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Pressable
                style={{
                  marginLeft: 10,
                }}
                onPress={() => {
                  headerLeftPress();
                }}>
                <Text style={{ fontFamily: 'iconfont', fontSize: 24 }}>
                  {'\ueb05'}
                </Text>
                {/* <IconPark
                  iconPark={Left({ theme: 'outline',  })}
                  size={24}
                  style={{ height: '100%', justifyContent: 'center' }}
                /> */}
              </Pressable>
            </View>
          ) : (
            headerLeft(navigation)
          )}
        </View>
        <View style={styles.center}>
          {typeof title == 'string' ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            title
          )}
        </View>
        <View style={styles.headerRight}>
          {headerRight == undefined ? <></> : headerRight(navigation)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  title: {
    fontSize: 18,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
    height: '100%',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  fill: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default TitleHeader;
