/*
 * @Description: 账号与安全
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-22 16:41:40
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-23 21:35:46
 */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import TitleHeader from '../../../../components/TitleHeader';
import ClickItem from '../../Components/ClickItem';

const MeSettingSecrity = ({ navigation }) => {
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const codeRef = useRef(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Pressable
      style={{ height: '100%' }}
      onPress={event => {
        phoneRef.current.blur();
      }}>
      <TitleHeader
        title="账号安全"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>邮箱:</Text>
          <TextInput
            ref={phoneRef}
            style={styles.input}
            value="phone"
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>验证码:</Text>
          <TextInput
            ref={codeRef}
            style={styles.input}
            value="code"
            onChangeText={setCode}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>密码:</Text>
          <TextInput
            ref={passwordRef}
            style={styles.input}
            value="password"
            onChangeText={setPassword}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  container: {
    marginTop: 40,
  },
});

export default MeSettingSecrity;
