import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import TitleHeader from '../../../../../components/TitleHeader';
import {
  changeUserInfo,
  getUserInfo,
} from '../../../../../network/modules/user';

const MeSettingChangeLabel = ({ navigation }) => {
  const labelRef = useRef(null);
  const [label, setLabel] = useState('');
  const [userInfo, setUserInfo] = useState({});


  useEffect(()=>{
    getUserInfo().then(res=>{
      const { username, birthdate, sex, personalLabel } = res.data;
      setLabel(res.data.personalLabel);
      setUserInfo({
        username,
        birthdate,
        sex,
        personalLabel
      });
    })
  },[])

  return (
    <Pressable
    style={{ height: '100%' }}
    onPress={event => {
      labelRef.current.blur();
    }}>
    <TitleHeader
      title="修改个性签名"
      navigator={navigation}
      headerLeftPress={() => {
        navigation.goBack();
      }}
    />
    <View style={styles.box}>
      <Text style={styles.title}>个性签名:</Text>
      <TextInput
        ref={labelRef}
        style={styles.input}
        value={userInfo.personalLabel}
        onChangeText={text =>
          setUserInfo(prevUserInfo => ({ ...prevUserInfo, personalLabel: text }))
        }
        onBlur={() => {
          console.log(userInfo);
          //console.log([...userInfo]);
          changeUserInfo(
            userInfo.username,
            userInfo.birthdate,
            userInfo.sex,
            userInfo.personalLabel,
          ).then(res => {
            console.log(res);
          });
        }}
      />
    </View>
  </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default MeSettingChangeLabel;