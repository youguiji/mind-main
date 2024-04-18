import React from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import ProfileCard from './Components/ProfileCard';
import { ScrollView } from 'react-native-gesture-handler';
const MessageNoticeAttention = ({ navigation }) => {

  const userList = [{
    id: 1,
    userName: '今日不定',
    lastSeen: '03-10',
    profileImageURL: 'https://img2.baidu.com/it/u=2563905782,171946313&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500', },
  {
    id: 2,
    userName: '乌鸦和麻雀',
    lastSeen: '03-22',
    profileImageURL: 'https://img1.baidu.com/it/u=4243707043,517558408&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', 
  },]
    const renderItem = ({ item }) => (
      <ProfileCard
        userName={item.userName}
        lastSeen={item.lastSeen}
        profileImageURL={item.profileImageURL}
        onPressButton={() => {
          // Handle button press action here
        }}
      />
    );
  
  return (
    <View>
      <TitleHeader
        title="新增关注"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
<View  style={styles.contain}>
  {userList.map(item=>{
    return(
      <ProfileCard
      key={item.id}
        userName={item.userName}
        lastSeen={item.lastSeen}
        profileImageURL={item.profileImageURL}
        onPressButton={() => {
          // Handle button press action here
        }}
      />
    )
  })}
</View>
      {/* <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      /> */}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contain: {
    marginTop: 40,
  },
});

export default MessageNoticeAttention;
