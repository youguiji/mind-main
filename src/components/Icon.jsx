import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

/**
 * @description: 图标组件
 * @param {number} size 图标大小
 * @param {String} color 图标颜色
 * @param {String} icode 图标的十六进制
 * @param {Object} style 样式
 * @return {ReactNode}
 * @author: Austral
 */
const Icon = ({size,color,icode,iconPress=()=>{}},style, ) => {
  return (
    <Text onPress={()=>iconPress()} style={[styles.icon,style,{fontSize: size , color:color}]}> 
      {icode}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontFamily:'iconfont',
    fontSize: 16,
    color: '#fff',
  },
});

export default Icon;