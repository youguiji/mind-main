import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Pressable,
} from 'react-native';

const RelieveRoom = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('MUSIC');
        }}>
        <Text>心灵音乐盒</Text>
      </TouchableHighlight>
      <Pressable
        onPress={() => {
          navigation.navigate('AIDialogue');
        }}>
        <Text>智慧倾诉者</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('ConsultingRoom');
        }}>
        <Text>心灵引航</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('EmotionalMailbox');
        }}>
        <Text>心声港湾</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Assessment');
        }}>
        <Text>情绪晴雨表</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RelieveRoom;
