import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-svg';

const ForumSingle = () => {
  return (
    <View style={styles.container}>
      <View>
        <Avatar />
        <Text>name</Text>
      </View>
      <Text>
        content
      </Text>
      <View>
        <Image/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default ForumSingle;