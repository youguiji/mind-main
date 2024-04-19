import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const MeDiaryCard = ({ title, content, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={{ fontSize: 15, fontWeight: '500',color: '#000' }}>{title}</Text>
      <Text style={{ fontSize: 14, fontWeight: '400' }}>{content}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#fff',
  },
});

export default MeDiaryCard;
