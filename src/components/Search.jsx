import React from 'react';
import {View,Text, StyleSheet,Pressable} from 'react-native';
import Icon from './Icon';

const Search = ({title}) => {
  return (
    <Pressable
      style={styles.searchContainer}
      onPress={() => console.log('搜索框点击')}>
      <Icon size={16} icode={'\ue60e'} />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: 200,
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
    right: 16,
    paddingHorizontal: 14,
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: 'rgb(245,245,245)',
    borderRadius: 24,
  },
  text: {
    fontSize: 12,
    color: 'rgb(154,154,154)',
    paddingLeft: 4,
  },
});

export default Search;